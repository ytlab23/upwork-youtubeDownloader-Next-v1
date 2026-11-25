<?php
declare(strict_types=1);

function track(string $language, bool $auto): array
{
    return ['url' => "https://www.youtube.com/api/timedtext?lang=$language", 'language' => $language, 'name' => $language, 'auto' => $auto];
}

test('prefers English captions written by a person', function (): void {
    $tracks = [track('ar', false), track('en', true), track('en-GB', false)];
    assert_same('en-GB', pick_caption_track($tracks)['language']);
});

test('falls back to automatic English, then any human captions, then anything', function (): void {
    assert_same('en', pick_caption_track([track('fr', false), track('en', true)])['language']);
    assert_same('fr', pick_caption_track([track('de', true), track('fr', false)])['language']);
    assert_same('de', pick_caption_track([track('de', true)])['language']);
    assert_same(null, pick_caption_track([]));
});

test('reads caption tracks out of a player response', function (): void {
    $player = ['captions' => ['playerCaptionsTracklistRenderer' => ['captionTracks' => [
        ['baseUrl' => 'https://www.youtube.com/api/timedtext?v=x&lang=en', 'languageCode' => 'en', 'name' => ['runs' => [['text' => 'English']]], 'kind' => 'asr'],
        ['baseUrl' => 'https://www.youtube.com/api/timedtext?v=x&lang=fr', 'languageCode' => 'fr', 'name' => ['simpleText' => 'French']],
    ]]]];
    $tracks = caption_tracks_from_player($player);
    assert_same(2, count($tracks));
    assert_same(['url' => 'https://www.youtube.com/api/timedtext?v=x&lang=en', 'language' => 'en', 'name' => 'English', 'auto' => true], $tracks[0]);
    assert_same('French', $tracks[1]['name']);
    assert_same([], caption_tracks_from_player([]));
});

test('parses both timedtext formats and decodes entities', function (): void {
    $classic = '<?xml version="1.0"?><transcript><text start="0" dur="1">We&amp;#39;re no strangers</text>'
        . '<text start="1" dur="1">to love &amp;amp; you</text><text start="2" dur="1">  </text></transcript>';
    assert_same(["We're no strangers", 'to love & you'], parse_timedtext($classic));

    $format3 = '<timedtext format="3"><body><p t="0" d="1"><s ac="0">Never</s><s t="200"> gonna</s></p>'
        . '<p t="1" d="1">give &lt;you&gt; up</p><p t="2" d="1"></p></body></timedtext>';
    assert_same(['Never gonna', 'give <you> up'], parse_timedtext($format3));
    assert_same([], parse_timedtext(''));
});

test('only YouTube timedtext addresses are fetched for captions', function (): void {
    assert_true(is_youtube_timedtext_url('https://www.youtube.com/api/timedtext?v=x&lang=en'), 'timedtext url');
    assert_true(!is_youtube_timedtext_url('http://www.youtube.com/api/timedtext?v=x'), 'plain http');
    assert_true(!is_youtube_timedtext_url('https://evil.com/api/timedtext?v=x'), 'other host');
    assert_true(!is_youtube_timedtext_url('https://www.youtube.com/watch?v=x'), 'other path');
});
