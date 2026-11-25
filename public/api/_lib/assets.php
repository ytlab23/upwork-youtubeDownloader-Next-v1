<?php
declare(strict_types=1);

// What each tool asks for, built on youtube.php.

const ASSET_CONTENTS = ['thumbnail', 'transcript', 'logo', 'banner', 'channelInfo'];
const MIN_LATIN_COVERAGE = 0.6;

function requested_contents(array $input): array
{
    $content = $input['content'] ?? null;
    if ($content === null || $content === '') {
        return ASSET_CONTENTS;
    }
    if (!is_string($content) || !in_array($content, ASSET_CONTENTS, true)) {
        throw new ApiError(400, 'Unknown content requested.');
    }
    return [$content];
}

function require_video(array $ref): string
{
    if ($ref['type'] !== 'video') {
        throw new ApiError(400, 'This tool needs a video link, not a channel link.');
    }
    return $ref['id'];
}

function channel_avatar(array $ref): string
{
    $avatar = fetch_channel(channel_ref_for($ref))['avatar'];
    if ($avatar === null) {
        throw new ApiError(404, 'This channel has no profile picture.');
    }
    return $avatar;
}

function channel_banner(array $ref): string
{
    $banner = fetch_channel(channel_ref_for($ref))['banner'];
    if ($banner === null) {
        throw new ApiError(404, 'This channel has no banner.');
    }
    return $banner;
}

/** The response fields for one kind of content. */
function asset_fields(array $ref, string $content): array
{
    switch ($content) {
        case 'thumbnail':
            return ['thumbnail' => video_thumbnail(require_video($ref))];
        case 'transcript':
            $transcript = video_transcript(fetch_video(require_video($ref)));
            return ['transcript' => $transcript['text'], 'transcriptLanguage' => $transcript['language']];
        case 'logo':
            return ['logo' => channel_avatar($ref)];
        case 'banner':
            return ['banner' => channel_banner($ref)];
        case 'channelInfo':
            return ['channelInfo' => fetch_channel(channel_ref_for($ref))];
    }
    throw new ApiError(400, 'Unknown content requested.');
}

/** Everything that was asked for. With several contents, one that fails is returned as null. */
function collect_assets(array $ref, array $wanted): array
{
    $result = [];
    foreach ($wanted as $content) {
        try {
            $result = array_merge($result, asset_fields($ref, $content));
        } catch (ApiError $error) {
            if (count($wanted) === 1) {
                throw $error;
            }
            $result[$content] = null;
        }
    }
    return $result;
}

function send_image(string $url, string $fileName): void
{
    if (!is_allowed_image_url($url)) {
        throw new RuntimeException('Refused to fetch image from ' . parse_url($url, PHP_URL_HOST));
    }
    [$status, $body, $type] = http_request($url);
    if ($status !== 200 || strpos($type, 'image/') !== 0) {
        throw new RuntimeException("Image download returned $status ($type)");
    }
    send_file($body, $type, $fileName);
}

/** The transcript as a PDF; non-Latin transcripts are machine-translated to English so they stay readable. */
function transcript_pdf(array $video): string
{
    $transcript = video_transcript($video);
    $title = $video['title'] !== '' ? $video['title'] : 'YouTube video ' . $video['id'];
    if (latin_coverage($transcript['text']) < MIN_LATIN_COVERAGE) {
        try {
            $transcript = video_transcript($video, 'en');
            $title .= ' (machine-translated to English)';
        } catch (ApiError $error) {
            // keep the original; unsupported characters show as '?'
        }
    }
    return text_to_pdf($title, $transcript['text']);
}

function send_download(array $ref, string $content): void
{
    switch ($content) {
        case 'thumbnail':
            send_image(video_thumbnail(require_video($ref)), 'thumbnail.jpg');
            return;
        case 'logo':
            send_image(channel_avatar($ref), 'logo.jpg');
            return;
        case 'banner':
            send_image(channel_banner($ref), 'channel-banner.jpg');
            return;
        case 'transcript':
            send_file(transcript_pdf(fetch_video(require_video($ref))), 'application/pdf', 'transcript.pdf');
            return;
        case 'channelInfo':
            $json = json_encode(fetch_channel(channel_ref_for($ref)), JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
            send_file((string) $json, 'application/json', 'channelInfo.json');
            return;
    }
    throw new ApiError(400, 'Unknown content requested.');
}
