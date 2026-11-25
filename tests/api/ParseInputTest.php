<?php
declare(strict_types=1);

test('accepts the usual video link shapes', function (): void {
    $id = 'dQw4w9WgXcQ';
    $links = [
        "https://www.youtube.com/watch?v=$id",
        "https://youtube.com/watch?v=$id&list=PL123&t=42s",
        "https://m.youtube.com/watch?app=desktop&v=$id",
        "https://music.youtube.com/watch?v=$id",
        "https://youtu.be/$id?si=abc",
        "https://www.youtube.com/shorts/$id?feature=share",
        "https://www.youtube.com/embed/$id",
        "https://www.youtube.com/live/$id",
        "www.youtube.com/watch?v=$id",
        "  https://www.youtube.com/watch?v=$id  ",
        $id,
    ];
    foreach ($links as $link) {
        assert_same(['type' => 'video', 'id' => $id], parse_youtube_input($link), $link);
    }
});

test('accepts channel and handle links', function (): void {
    assert_same(
        ['type' => 'channel', 'id' => 'UCuAXFkgsw1L7xaCfnd5JJOw'],
        parse_youtube_input('https://www.youtube.com/channel/UCuAXFkgsw1L7xaCfnd5JJOw/videos')
    );
    assert_same(['type' => 'handle', 'id' => 'RickAstleyYT'], parse_youtube_input('https://www.youtube.com/@RickAstleyYT'));
});

test('rejects links that are not YouTube videos or channels', function (): void {
    $bad = [
        '',
        'hello',
        'https://evil.com/watch?v=dQw4w9WgXcQ',
        'https://www.youtube.com.evil.com/watch?v=dQw4w9WgXcQ',
        'https://user@www.youtube.com/watch?v=dQw4w9WgXcQ',
        'javascript:alert(1)',
        'ftp://www.youtube.com/watch?v=dQw4w9WgXcQ',
        'https://www.youtube.com/watch?v=short',
        'https://www.youtube.com/watch?v[]=dQw4w9WgXcQ',
        'https://www.youtube.com/feed/trending',
        'https://youtu.be/',
    ];
    foreach ($bad as $link) {
        assert_api_error(400, function () use ($link): void {
            parse_youtube_input($link);
        });
    }
});

test('the url field must be a short non-empty string', function (): void {
    assert_same('https://youtu.be/dQw4w9WgXcQ', input_url(['url' => ' https://youtu.be/dQw4w9WgXcQ ']));
    foreach ([[], ['url' => ''], ['url' => 42], ['url' => ['x']], ['url' => str_repeat('a', 301)]] as $input) {
        assert_api_error(400, function () use ($input): void {
            input_url($input);
        });
    }
});

test('only known contents can be requested', function (): void {
    assert_same(['thumbnail', 'transcript', 'logo', 'banner', 'channelInfo'], requested_contents([]));
    assert_same(['logo'], requested_contents(['content' => 'logo']));
    assert_api_error(400, function (): void {
        requested_contents(['content' => '../../etc/passwd']);
    });
});

test('channel tools accept video links but video tools reject channel links', function (): void {
    assert_same('dQw4w9WgXcQ', require_video(['type' => 'video', 'id' => 'dQw4w9WgXcQ']));
    assert_api_error(400, function (): void {
        require_video(['type' => 'handle', 'id' => 'RickAstleyYT']);
    });
});
