<?php
declare(strict_types=1);

/** Checks that every offset in the PDF's cross-reference table points at its object. */
function assert_valid_pdf(string $pdf): int
{
    assert_true(strpos($pdf, '%PDF-1.4') === 0, 'starts with a PDF header');
    assert_true(substr($pdf, -6) === "%%EOF\n", 'ends with %%EOF');
    preg_match('/startxref\n(\d+)\n%%EOF\n$/', $pdf, $m);
    $xref = (int) $m[1];
    assert_same('xref', substr($pdf, $xref, 4), 'startxref points at the xref table');
    preg_match_all('/^(\d{10}) 00000 n $/m', substr($pdf, $xref), $offsets);
    foreach ($offsets[1] as $index => $offset) {
        $id = $index + 1;
        assert_same("$id 0 obj", substr($pdf, (int) $offset, strlen("$id 0 obj")), "offset of object $id");
    }
    preg_match_all('/<< \/Length (\d+) >>\nstream\n/', $pdf, $lengths, PREG_OFFSET_CAPTURE);
    foreach ($lengths[0] as $i => $match) {
        $start = $match[1] + strlen($match[0]);
        $length = (int) $lengths[1][$i][0];
        assert_same("\nendstream", substr($pdf, $start + $length, 10), "stream $i length");
    }
    return preg_match_all('/\/Type \/Page /', $pdf);
}

test('a short transcript becomes a valid one-page PDF', function (): void {
    $pdf = text_to_pdf('Rick Astley - Never Gonna Give You Up (Official Video)', "We're no strangers to love\nYou know the rules (and so do I)");
    assert_same(1, assert_valid_pdf($pdf));
    assert_true(strpos($pdf, '(You know the rules \\(and so do I\\)) Tj') !== false, 'parentheses escaped');
});

test('a long transcript spreads over several pages', function (): void {
    $lines = array_fill(0, 200, 'A line of transcript text that is reasonably long but fits on one row');
    assert_same(4, assert_valid_pdf(text_to_pdf('Long video', implode("\n", $lines))));
});

test('characters the PDF font cannot show become question marks, accents survive', function (): void {
    assert_same("caf\xE9 ??", pdf_encode_text('café 日本'));
    assert_true(latin_coverage('Hello world') === 1.0, 'English is fully covered');
    assert_true(latin_coverage('مرحبا بالعالم') < 0.5, 'Arabic is not');
});

test('requests beyond the per-minute limit are refused', function (): void {
    $client = 'test-client-' . mt_rand();
    $now = 1800000000;
    for ($i = 0; $i < 3; $i++) {
        enforce_rate_limit($client, 3, $now);
    }
    assert_api_error(429, function () use ($client, $now): void {
        enforce_rate_limit($client, 3, $now);
    });
    enforce_rate_limit($client, 3, $now + 60); // next minute starts fresh
});

test('cached values are returned until they expire', function (): void {
    $calls = 0;
    $compute = function () use (&$calls): array {
        $calls++;
        return ['value' => $calls];
    };
    $key = 'test-key-' . mt_rand();
    assert_same(['value' => 1], cached($key, $compute));
    assert_same(['value' => 1], cached($key, $compute));
    assert_same(1, $calls);
});

test('music notes in captions do not turn into question marks in the PDF', function (): void {
    $pdf = text_to_pdf('Song', "♪ We're no strangers to love ♪\n[♪♪♪]\n♫ ♫");
    assert_true(strpos($pdf, "(We're no strangers to love) Tj") !== false, 'notes around a line are dropped');
    assert_true(strpos($pdf, '([Music]) Tj') !== false, 'a line of only notes reads [Music]');
    assert_true(strpos($pdf, '?') === false, 'no question marks left');
});
