<?php
declare(strict_types=1);

// POST {"url": "<YouTube link>", "content": "thumbnail|logo|banner|transcript|channelInfo"}
// -> the file (image, PDF or JSON) as a download, or {"error": "..."}.

foreach (['bootstrap', 'youtube', 'pdf', 'assets'] as $module) {
    require __DIR__ . '/_lib/' . $module . '.php';
}

run_endpoint(function (array $input): void {
    $content = $input['content'] ?? '';
    send_download(parse_youtube_input(input_url($input)), is_string($content) ? $content : '');
});
