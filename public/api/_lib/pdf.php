<?php
declare(strict_types=1);

// A small, dependency-free PDF writer for plain text (A4, Helvetica).
// The built-in PDF fonts only cover Western European characters (Windows-1252).

const PDF_PAGE_WIDTH = 595;
const PDF_PAGE_HEIGHT = 842;
const PDF_MARGIN = 50;
const PDF_FONT_SIZE = 10;
const PDF_LEADING = 14;
const PDF_BODY_WRAP = 95;
const PDF_TITLE_WRAP = 85;

/** UTF-8 to Windows-1252; characters the font cannot show become '?'. */
function pdf_encode_text(string $utf8): string
{
    $out = '';
    foreach (preg_split('//u', $utf8, -1, PREG_SPLIT_NO_EMPTY) ?: [] as $char) {
        $converted = @iconv('UTF-8', 'Windows-1252', $char);
        $out .= ($converted === false || $converted === '') ? '?' : $converted;
    }
    return $out;
}

/** Share of characters (ignoring spaces) the PDF font can show. */
function latin_coverage(string $utf8): float
{
    $chars = preg_split('//u', (string) preg_replace('/\s+/u', '', $utf8), -1, PREG_SPLIT_NO_EMPTY) ?: [];
    if ($chars === []) {
        return 1.0;
    }
    $shown = 0;
    foreach ($chars as $char) {
        $converted = @iconv('UTF-8', 'Windows-1252', $char);
        $shown += ($converted !== false && $converted !== '') ? 1 : 0;
    }
    return $shown / count($chars);
}

/** Caption symbols the PDF font lacks: music notes are dropped, a line of only notes reads [Music]. */
function pdf_clean_symbols(string $text): string
{
    $text = (string) preg_replace('/\[[\s♪♫♬♩]*[♪♫♬♩][\s♪♫♬♩]*\]/u', '[Music]', $text);
    $text = (string) preg_replace('/[♪♫♬♩]/u', '', $text);
    $lines = array_map(function (string $line): string {
        return trim((string) preg_replace('/[ \t]+/', ' ', $line));
    }, explode("\n", $text));
    return implode("\n", $lines);
}

function pdf_escape(string $text): string
{
    return strtr($text, ['\\' => '\\\\', '(' => '\\(', ')' => '\\)', "\r" => '']);
}

function pdf_wrap(string $text, int $width): array
{
    $lines = [];
    foreach (explode("\n", $text) as $paragraph) {
        foreach (explode("\n", wordwrap($paragraph, $width, "\n", true)) as $line) {
            $lines[] = $line;
        }
    }
    return $lines;
}

/** A PDF document with $title in bold followed by $body. */
function text_to_pdf(string $title, string $body): string
{
    $entries = [];
    foreach (pdf_wrap(pdf_encode_text(pdf_clean_symbols($title)), PDF_TITLE_WRAP) as $line) {
        $entries[] = ['F2', $line];
    }
    $entries[] = ['F1', ''];
    foreach (pdf_wrap(pdf_encode_text(pdf_clean_symbols($body)), PDF_BODY_WRAP) as $line) {
        $entries[] = ['F1', $line];
    }
    $linesPerPage = intdiv(PDF_PAGE_HEIGHT - 2 * PDF_MARGIN, PDF_LEADING);
    $streams = [];
    foreach (array_chunk($entries, $linesPerPage) as $page) {
        $content = "BT\n" . PDF_LEADING . " TL\n" . PDF_MARGIN . ' ' . (PDF_PAGE_HEIGHT - PDF_MARGIN) . " Td\n";
        $font = '';
        foreach ($page as [$entryFont, $line]) {
            if ($entryFont !== $font) {
                $content .= "/$entryFont " . PDF_FONT_SIZE . " Tf\n";
                $font = $entryFont;
            }
            $content .= '(' . pdf_escape($line) . ") Tj T*\n";
        }
        $streams[] = $content . "ET\n";
    }
    return pdf_document($streams);
}

/** Assembles page content streams into a complete PDF file. */
function pdf_document(array $streams): string
{
    $objects = [];
    $pageIds = [];
    $nextId = 5;
    foreach ($streams as $stream) {
        $pageId = $nextId;
        $contentId = $nextId + 1;
        $nextId += 2;
        $pageIds[] = "$pageId 0 R";
        $objects[$pageId] = '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ' . PDF_PAGE_WIDTH . ' ' . PDF_PAGE_HEIGHT . ']'
            . " /Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /Contents $contentId 0 R >>";
        $objects[$contentId] = '<< /Length ' . strlen($stream) . " >>\nstream\n" . $stream . "\nendstream";
    }
    $objects[1] = '<< /Type /Catalog /Pages 2 0 R >>';
    $objects[2] = '<< /Type /Pages /Kids [' . implode(' ', $pageIds) . '] /Count ' . count($pageIds) . ' >>';
    $objects[3] = '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>';
    $objects[4] = '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>';
    ksort($objects);

    $pdf = "%PDF-1.4\n%\xE2\xE3\xCF\xD3\n";
    $offsets = [];
    foreach ($objects as $id => $object) {
        $offsets[$id] = strlen($pdf);
        $pdf .= "$id 0 obj\n$object\nendobj\n";
    }
    $xref = strlen($pdf);
    $size = count($objects) + 1;
    $pdf .= "xref\n0 $size\n0000000000 65535 f \n";
    foreach ($offsets as $offset) {
        $pdf .= sprintf("%010d 00000 n \n", $offset);
    }
    return $pdf . "trailer\n<< /Size $size /Root 1 0 R >>\nstartxref\n$xref\n%%EOF\n";
}
