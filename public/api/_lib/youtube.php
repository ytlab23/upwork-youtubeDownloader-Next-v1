<?php
declare(strict_types=1);

// Reading data from YouTube. Every URL fetched here is built from a validated
// video or channel ID, or is checked against an allow-list first, so visitors
// cannot make the server fetch arbitrary addresses.

const VIDEO_ID_PATTERN = '/^[A-Za-z0-9_-]{11}$/';
const YOUTUBE_HOSTS = ['youtube.com', 'www.youtube.com', 'm.youtube.com', 'music.youtube.com', 'youtu.be', 'www.youtu.be', 'youtube-nocookie.com', 'www.youtube-nocookie.com'];
const IMAGE_HOSTS = ['i.ytimg.com', 'yt3.googleusercontent.com', 'yt3.ggpht.com'];
const PAGE_HEADERS = ['Accept-Language: en-US,en;q=0.9', 'Cookie: CONSENT=YES+1; SOCS=CAI'];
// YouTube's app interface still hands out caption files to servers; its web page no longer does.
const PLAYER_CLIENTS = [
    ['context' => ['clientName' => 'ANDROID', 'clientVersion' => '20.10.38', 'androidSdkVersion' => 30], 'userAgent' => 'com.google.android.youtube/20.10.38 (Linux; U; Android 11) gzip'],
    ['context' => ['clientName' => 'IOS', 'clientVersion' => '20.10.4', 'deviceModel' => 'iPhone16,2'], 'userAgent' => 'com.google.ios.youtube/20.10.4 (iPhone16,2; U; CPU iOS 18_3_2 like Mac OS X;)'],
];

function video_ref(string $id): array
{
    if (!preg_match(VIDEO_ID_PATTERN, $id)) {
        throw new ApiError(400, INVALID_LINK_MESSAGE);
    }
    return ['type' => 'video', 'id' => $id];
}

/** Turns a pasted link (or bare video ID) into ['type' => video|channel|handle, 'id' => ...]. */
function parse_youtube_input(string $input): array
{
    $input = trim($input);
    if (preg_match(VIDEO_ID_PATTERN, $input)) {
        return video_ref($input);
    }
    if (strpos($input, '://') === false && preg_match('/^[a-z0-9.-]+\//i', $input)) {
        $input = 'https://' . $input;
    }
    $parts = parse_url($input);
    $scheme = strtolower((string) ($parts['scheme'] ?? ''));
    $host = strtolower((string) ($parts['host'] ?? ''));
    if (!is_array($parts) || isset($parts['user']) || isset($parts['pass']) || !in_array($scheme, ['http', 'https'], true) || !in_array($host, YOUTUBE_HOSTS, true)) {
        throw new ApiError(400, INVALID_LINK_MESSAGE);
    }
    $path = (string) ($parts['path'] ?? '/');
    if ($host === 'youtu.be' || $host === 'www.youtu.be') {
        return video_ref(explode('/', trim($path, '/'))[0]);
    }
    if (preg_match('#^/(?:shorts|embed|live|v)/([A-Za-z0-9_-]{11})(?:/|$)#', $path, $match)) {
        return video_ref($match[1]);
    }
    if (preg_match('#^/watch/?$#', $path)) {
        parse_str((string) ($parts['query'] ?? ''), $query);
        return video_ref(isset($query['v']) && is_string($query['v']) ? $query['v'] : '');
    }
    if (preg_match('#^/channel/(UC[A-Za-z0-9_-]{22})(?:/|$)#', $path, $match)) {
        return ['type' => 'channel', 'id' => $match[1]];
    }
    if (preg_match('#^/@([A-Za-z0-9._-]{3,30})(?:/|$)#', $path, $match)) {
        return ['type' => 'handle', 'id' => $match[1]];
    }
    throw new ApiError(400, INVALID_LINK_MESSAGE);
}

function is_allowed_image_url(string $url): bool
{
    $parts = parse_url($url);
    return is_array($parts)
        && ($parts['scheme'] ?? '') === 'https'
        && !isset($parts['user']) && !isset($parts['pass']) && !isset($parts['port'])
        && in_array(strtolower((string) ($parts['host'] ?? '')), IMAGE_HOSTS, true);
}

function is_youtube_timedtext_url(string $url): bool
{
    $parts = parse_url($url);
    return is_array($parts)
        && ($parts['scheme'] ?? '') === 'https'
        && ($parts['host'] ?? '') === 'www.youtube.com'
        && ($parts['path'] ?? '') === '/api/timedtext'
        && !isset($parts['user']);
}

function player_request(string $videoId, array $client): array
{
    $context = ['client' => array_merge($client['context'], ['hl' => 'en', 'gl' => 'US'])];
    [$status, $body] = http_request('https://www.youtube.com/youtubei/v1/player?prettyPrint=false', [
        'json' => ['context' => $context, 'videoId' => $videoId],
        'userAgent' => $client['userAgent'],
    ]);
    $data = $status === 200 ? json_decode($body, true) : null;
    return is_array($data) ? $data : [];
}

function caption_tracks_from_player(array $player): array
{
    $tracks = $player['captions']['playerCaptionsTracklistRenderer']['captionTracks'] ?? [];
    $result = [];
    foreach (is_array($tracks) ? $tracks : [] as $track) {
        if (!isset($track['baseUrl'], $track['languageCode'])) {
            continue;
        }
        $result[] = [
            'url' => (string) $track['baseUrl'],
            'language' => (string) $track['languageCode'],
            'name' => (string) ($track['name']['runs'][0]['text'] ?? $track['name']['simpleText'] ?? $track['languageCode']),
            'auto' => ($track['kind'] ?? '') === 'asr',
        ];
    }
    return $result;
}

/** Title, channel and caption tracks of a video. */
function fetch_video(string $videoId): array
{
    return cached('video:' . $videoId, function () use ($videoId): array {
        $fallback = null;
        foreach (PLAYER_CLIENTS as $client) {
            $player = player_request($videoId, $client);
            $details = $player['videoDetails'] ?? null;
            if (!is_array($details) || ($details['videoId'] ?? '') !== $videoId) {
                continue;
            }
            $video = [
                'id' => $videoId,
                'title' => (string) ($details['title'] ?? ''),
                'channelId' => (string) ($details['channelId'] ?? ''),
                'author' => (string) ($details['author'] ?? ''),
                'captionTracks' => caption_tracks_from_player($player),
                'userAgent' => $client['userAgent'],
            ];
            if ($video['captionTracks'] !== []) {
                return $video;
            }
            $fallback = $fallback ?? $video;
        }
        if ($fallback === null) {
            throw new ApiError(404, 'This video could not be found. Check the link and try again.');
        }
        return $fallback;
    });
}

function language_matches(string $language, string $wanted): bool
{
    return strtolower(explode('-', $language)[0]) === strtolower($wanted);
}

/** English written by a person, then automatic English, then any human captions, then anything. */
function pick_caption_track(array $tracks, string $preferred = 'en'): ?array
{
    $rules = [
        function (array $t) use ($preferred): bool { return !$t['auto'] && language_matches($t['language'], $preferred); },
        function (array $t) use ($preferred): bool { return $t['auto'] && language_matches($t['language'], $preferred); },
        function (array $t): bool { return !$t['auto']; },
        function (array $t): bool { return true; },
    ];
    foreach ($rules as $rule) {
        foreach ($tracks as $track) {
            if ($rule($track)) {
                return $track;
            }
        }
    }
    return null;
}

/** Caption lines from either timedtext format (<text> or format 3 <p>). */
function parse_timedtext(string $xml): array
{
    if (!preg_match_all('#<(?:text|p)\b[^>]*>(.*?)</(?:text|p)>#s', $xml, $matches)) {
        return [];
    }
    $lines = [];
    foreach ($matches[1] as $raw) {
        // Caption text is XML-escaped, and the classic format escapes entities twice (&amp;#39;).
        $text = html_entity_decode(strip_tags($raw), ENT_QUOTES | ENT_HTML5, 'UTF-8');
        $text = html_entity_decode($text, ENT_QUOTES | ENT_HTML5, 'UTF-8');
        $text = trim((string) preg_replace('/\s+/u', ' ', $text));
        if ($text !== '') {
            $lines[] = $text;
        }
    }
    return $lines;
}

/** The transcript of a video; $translateTo asks YouTube for a machine translation. */
function video_transcript(array $video, ?string $translateTo = null): array
{
    $track = pick_caption_track($video['captionTracks']);
    if ($track === null) {
        throw new ApiError(404, 'This video has no captions, so there is no transcript to show.');
    }
    $url = $track['url'] . ($translateTo === null ? '' : '&tlang=' . rawurlencode($translateTo));
    if (!is_youtube_timedtext_url($url)) {
        throw new RuntimeException('Unexpected caption address');
    }
    return cached('transcript:' . $video['id'] . ':' . $track['language'] . ':' . ($translateTo ?? ''), function () use ($url, $video, $track, $translateTo): array {
        [$status, $body] = http_request($url, ['userAgent' => $video['userAgent']]);
        $lines = $status === 200 ? parse_timedtext($body) : [];
        if ($lines === []) {
            throw new ApiError(502, 'YouTube did not return the captions for this video. Please try again in a minute.');
        }
        return ['language' => $translateTo ?? $track['language'], 'auto' => $track['auto'], 'text' => implode("\n", $lines)];
    });
}

function video_thumbnail(string $videoId): string
{
    $found = cached('thumbnail:' . $videoId, function () use ($videoId): array {
        foreach (['maxresdefault', 'sddefault', 'hqdefault'] as $size) {
            $url = "https://i.ytimg.com/vi/$videoId/$size.jpg";
            [$status] = http_request($url, ['head' => true]);
            if ($status === 200) {
                return ['url' => $url];
            }
        }
        throw new ApiError(404, 'This video could not be found. Check the link and try again.');
    });
    return $found['url'];
}

/** The page data object YouTube embeds in its pages, or null. */
function extract_initial_data(string $html): ?array
{
    foreach (['var ytInitialData = ', 'window["ytInitialData"] = '] as $marker) {
        $start = strpos($html, $marker);
        if ($start === false) {
            continue;
        }
        $start += strlen($marker);
        $end = strpos($html, ';</script>', $start);
        $data = $end === false ? null : json_decode(substr($html, $start, $end - $start), true);
        if (is_array($data)) {
            return $data;
        }
    }
    return null;
}

/** URL of the widest image in a list of {url, width} entries. */
function largest_image_url($images): ?string
{
    $best = null;
    foreach (is_array($images) ? $images : [] as $image) {
        if (isset($image['url']) && ($best === null || (int) ($image['width'] ?? 0) >= (int) ($best['width'] ?? 0))) {
            $best = $image;
        }
    }
    if ($best === null) {
        return null;
    }
    $url = (string) $best['url'];
    return strpos($url, '//') === 0 ? 'https:' . $url : $url;
}

function header_texts(array $data): array
{
    $model = $data['header']['pageHeaderRenderer']['content']['pageHeaderViewModel'] ?? null;
    if (is_array($model)) {
        $texts = [];
        foreach ($model['metadata']['contentMetadataViewModel']['metadataRows'] ?? [] as $row) {
            foreach ($row['metadataParts'] ?? [] as $part) {
                if (isset($part['text']['content'])) {
                    $texts[] = (string) $part['text']['content'];
                }
            }
        }
        return ['texts' => $texts, 'banner' => largest_image_url($model['banner']['imageBannerViewModel']['image']['sources'] ?? null)];
    }
    $legacy = $data['header']['c4TabbedHeaderRenderer'] ?? [];
    $runs = function ($node): string {
        return implode('', array_map(function ($run) { return (string) ($run['text'] ?? ''); }, $node['runs'] ?? []));
    };
    return [
        'texts' => array_values(array_filter([
            $runs($legacy['channelHandleText'] ?? []),
            (string) ($legacy['subscriberCountText']['simpleText'] ?? ''),
            $runs($legacy['videosCountText'] ?? []),
        ])),
        'banner' => largest_image_url($legacy['banner']['thumbnails'] ?? null),
    ];
}

function first_text_matching(array $texts, string $pattern): ?string
{
    foreach ($texts as $text) {
        if (preg_match($pattern, $text)) {
            return $text;
        }
    }
    return null;
}

/** Channel details from a channel page's data object (current and older layouts). */
function channel_from_initial_data(array $data): array
{
    $meta = $data['metadata']['channelMetadataRenderer'] ?? [];
    $header = header_texts($data);
    $url = (string) ($meta['vanityChannelUrl'] ?? $meta['channelUrl'] ?? '');
    return [
        'channelId' => (string) ($meta['externalId'] ?? ''),
        'title' => (string) ($meta['title'] ?? ''),
        'handle' => first_text_matching($header['texts'], '/^@/'),
        'url' => preg_replace('#^http://#', 'https://', $url),
        'description' => (string) ($meta['description'] ?? ''),
        'subscribers' => first_text_matching($header['texts'], '/subscriber/i'),
        'videos' => first_text_matching($header['texts'], '/video/i'),
        'keywords' => (string) ($meta['keywords'] ?? ''),
        'isFamilySafe' => (bool) ($meta['isFamilySafe'] ?? false),
        'avatar' => largest_image_url($meta['avatar']['thumbnails'] ?? null),
        'banner' => $header['banner'],
    ];
}

/** Channel reference for a video, channel or handle reference. */
function channel_ref_for(array $ref): array
{
    if ($ref['type'] !== 'video') {
        return $ref;
    }
    $video = fetch_video($ref['id']);
    if ($video['channelId'] === '') {
        throw new ApiError(404, "Could not find this video's channel.");
    }
    return ['type' => 'channel', 'id' => $video['channelId']];
}

function fetch_channel(array $ref): array
{
    $path = $ref['type'] === 'channel' ? '/channel/' . $ref['id'] : '/@' . $ref['id'];
    return cached('channel:' . $path, function () use ($path): array {
        [$status, $html] = http_request('https://www.youtube.com' . $path . '?hl=en', ['headers' => PAGE_HEADERS]);
        if ($status === 404) {
            throw new ApiError(404, 'This YouTube channel could not be found.');
        }
        $data = extract_initial_data($html);
        if ($status !== 200 || $data === null) {
            throw new RuntimeException("Channel page returned $status without page data");
        }
        $channel = channel_from_initial_data($data);
        if ($channel['avatar'] === null && preg_match('/<meta property="og:image" content="([^"]+)"/', $html, $match)) {
            $channel['avatar'] = html_entity_decode($match[1]);
        }
        return $channel;
    });
}
