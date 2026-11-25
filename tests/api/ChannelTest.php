<?php
declare(strict_types=1);

function channel_fixture_metadata(): array
{
    return ['channelMetadataRenderer' => [
        'title' => 'Rick Astley',
        'description' => 'The official channel.',
        'externalId' => 'UCuAXFkgsw1L7xaCfnd5JJOw',
        'channelUrl' => 'https://www.youtube.com/channel/UCuAXFkgsw1L7xaCfnd5JJOw',
        'vanityChannelUrl' => 'http://www.youtube.com/@RickAstleyYT',
        'keywords' => 'rick astley music',
        'isFamilySafe' => true,
        'avatar' => ['thumbnails' => [['url' => 'https://yt3.googleusercontent.com/small=s900', 'width' => 900, 'height' => 900]]],
    ]];
}

test('reads a channel from the current page layout', function (): void {
    $data = [
        'metadata' => channel_fixture_metadata(),
        'header' => ['pageHeaderRenderer' => ['content' => ['pageHeaderViewModel' => [
            'image' => ['decoratedAvatarViewModel' => ['avatar' => ['avatarViewModel' => ['image' => ['sources' => [
                ['url' => 'https://yt3.googleusercontent.com/avatar=s72', 'width' => 72, 'height' => 72],
                ['url' => 'https://yt3.googleusercontent.com/avatar=s160', 'width' => 160, 'height' => 160],
            ]]]]]],
            'banner' => ['imageBannerViewModel' => ['image' => ['sources' => [
                ['url' => '//yt3.googleusercontent.com/banner=w1060', 'width' => 1060, 'height' => 175],
                ['url' => 'https://yt3.googleusercontent.com/banner=w2560', 'width' => 2560, 'height' => 424],
            ]]]],
            'metadata' => ['contentMetadataViewModel' => ['metadataRows' => [
                ['metadataParts' => [['text' => ['content' => '@RickAstleyYT']]]],
                ['metadataParts' => [['text' => ['content' => '4.56M subscribers']], ['text' => ['content' => '350 videos']]]],
            ]]],
        ]]]],
    ];
    $channel = channel_from_initial_data($data);
    assert_same('UCuAXFkgsw1L7xaCfnd5JJOw', $channel['channelId']);
    assert_same('Rick Astley', $channel['title']);
    assert_same('@RickAstleyYT', $channel['handle']);
    assert_same('https://www.youtube.com/@RickAstleyYT', $channel['url']);
    assert_same('4.56M subscribers', $channel['subscribers']);
    assert_same('350 videos', $channel['videos']);
    assert_same('https://yt3.googleusercontent.com/small=s900', $channel['avatar']);
    assert_same('https://yt3.googleusercontent.com/banner=w2560', $channel['banner']);
    assert_same(true, $channel['isFamilySafe']);
});

test('reads a channel from the older page layout', function (): void {
    $data = [
        'metadata' => channel_fixture_metadata(),
        'header' => ['c4TabbedHeaderRenderer' => [
            'banner' => ['thumbnails' => [['url' => 'https://yt3.googleusercontent.com/old-banner', 'width' => 1060]]],
            'subscriberCountText' => ['simpleText' => '4.5M subscribers'],
            'videosCountText' => ['runs' => [['text' => '350'], ['text' => ' videos']]],
            'channelHandleText' => ['runs' => [['text' => '@RickAstleyYT']]],
        ]],
    ];
    $channel = channel_from_initial_data($data);
    assert_same('https://yt3.googleusercontent.com/old-banner', $channel['banner']);
    assert_same('4.5M subscribers', $channel['subscribers']);
    assert_same('350 videos', $channel['videos']);
    assert_same('@RickAstleyYT', $channel['handle']);
});

test('a channel without banner or header still yields its basic details', function (): void {
    $channel = channel_from_initial_data(['metadata' => channel_fixture_metadata()]);
    assert_same(null, $channel['banner']);
    assert_same(null, $channel['subscribers']);
    assert_same('Rick Astley', $channel['title']);
});

test('extracts the page data object from a YouTube page', function (): void {
    $html = '<html><script>var x = 1;</script><script nonce="a">var ytInitialData = {"a":{"b":"c;</d>"}};</script></html>';
    assert_same(['a' => ['b' => 'c;</d>']], extract_initial_data($html));
    $windowStyle = '<script>window["ytInitialData"] = {"k":1};</script>';
    assert_same(['k' => 1], extract_initial_data($windowStyle));
    assert_same(null, extract_initial_data('<html>nothing here</html>'));
});

test('only YouTube image hosts are downloaded', function (): void {
    assert_true(is_allowed_image_url('https://yt3.googleusercontent.com/abc=s900'), 'avatar host');
    assert_true(is_allowed_image_url('https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg'), 'thumbnail host');
    assert_true(is_allowed_image_url('https://yt3.ggpht.com/abc'), 'ggpht host');
    assert_true(!is_allowed_image_url('http://i.ytimg.com/vi/x/hqdefault.jpg'), 'plain http');
    assert_true(!is_allowed_image_url('https://yt3.googleusercontent.com.evil.com/x'), 'look-alike host');
    assert_true(!is_allowed_image_url('https://yt3.googleusercontent.com@evil.com/x'), 'userinfo trick');
    assert_true(!is_allowed_image_url('https://169.254.169.254/latest/meta-data'), 'internal address');
});
