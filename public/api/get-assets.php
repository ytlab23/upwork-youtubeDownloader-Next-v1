<?php
declare(strict_types=1);

// POST {"url": "<YouTube link>", "content": "thumbnail|transcript|logo|banner|channelInfo" (optional)}
// -> JSON with the requested fields, or {"error": "..."}.

foreach (['bootstrap', 'youtube', 'pdf', 'assets'] as $module) {
    require __DIR__ . '/_lib/' . $module . '.php';
}

run_endpoint(function (array $input): void {
    send_json(200, collect_assets(parse_youtube_input(input_url($input)), requested_contents($input)));
});
