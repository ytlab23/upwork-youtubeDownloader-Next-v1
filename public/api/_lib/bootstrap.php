<?php
declare(strict_types=1);

// Shared plumbing for the API endpoints: errors, input, rate limiting, caching
// and outgoing HTTP. Must run on PHP 7.4 (the hosting's version).

const MAX_REQUEST_BYTES = 4096;
const MAX_URL_LENGTH = 300;
const RATE_LIMIT_PER_MINUTE = 30;
const CACHE_TTL_SECONDS = 600;
const HTTP_TIMEOUT_SECONDS = 15;
const MAX_DOWNLOAD_BYTES = 10485760; // 10 MB
const WEB_USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36';
const INVALID_LINK_MESSAGE = 'Please enter a valid YouTube video link, for example https://www.youtube.com/watch?v=dQw4w9WgXcQ';

/** An error whose message is safe and useful to show to the visitor. */
final class ApiError extends RuntimeException
{
    /** @var int */
    private $status;

    public function __construct(int $status, string $message)
    {
        parent::__construct($message);
        $this->status = $status;
    }

    public function status(): int
    {
        return $this->status;
    }
}

function storage_dir(string $name): string
{
    $override = getenv('YTD_STORAGE_DIR');
    $documentRoot = isset($_SERVER['DOCUMENT_ROOT']) ? (string) $_SERVER['DOCUMENT_ROOT'] : '';
    if ($override !== false && $override !== '') {
        $base = $override;
    } elseif ($documentRoot !== '') {
        $base = dirname($documentRoot) . '/tmp/youtubedownload-api'; // outside the web root
    } else {
        $base = sys_get_temp_dir() . '/youtubedownload-api';
    }
    $dir = $base . '/' . $name;
    if (!is_dir($dir) && !@mkdir($dir, 0700, true) && !is_dir($dir)) {
        throw new RuntimeException('Cannot create storage directory ' . $dir);
    }
    return $dir;
}

function prune_files(string $dir, int $maxAgeSeconds, int $now): void
{
    foreach (glob($dir . '/*') ?: [] as $file) {
        if (is_file($file) && $now - (int) filemtime($file) > $maxAgeSeconds) {
            @unlink($file);
        }
    }
}

function client_ip(): string
{
    // Behind Cloudflare the visitor's address arrives in CF-Connecting-IP.
    foreach ([$_SERVER['HTTP_CF_CONNECTING_IP'] ?? '', $_SERVER['REMOTE_ADDR'] ?? ''] as $ip) {
        if (filter_var($ip, FILTER_VALIDATE_IP) !== false) {
            return $ip;
        }
    }
    return 'unknown';
}

/** Allows $limit requests per client per minute and refuses the rest with 429. */
function enforce_rate_limit(string $client, int $limit = RATE_LIMIT_PER_MINUTE, ?int $now = null): void
{
    $now = $now ?? time();
    $dir = storage_dir('rate');
    $handle = @fopen($dir . '/' . sha1($client) . '-' . intdiv($now, 60), 'c+');
    if ($handle === false) {
        return; // never block visitors because of a storage problem
    }
    flock($handle, LOCK_EX);
    $count = (int) stream_get_contents($handle) + 1;
    ftruncate($handle, 0);
    rewind($handle);
    fwrite($handle, (string) $count);
    flock($handle, LOCK_UN);
    fclose($handle);
    if (mt_rand(1, 50) === 1) {
        prune_files($dir, 180, $now);
    }
    if ($count > $limit) {
        throw new ApiError(429, 'Too many requests. Please wait a minute and try again.');
    }
}

/** Returns the cached value for $key, or computes, stores and returns it. Errors are not cached. */
function cached(string $key, callable $compute): array
{
    $dir = storage_dir('cache');
    $file = $dir . '/' . sha1($key) . '.json';
    if (is_file($file) && time() - (int) filemtime($file) <= CACHE_TTL_SECONDS) {
        $hit = json_decode((string) file_get_contents($file), true);
        if (is_array($hit)) {
            return $hit;
        }
    }
    $value = $compute();
    @file_put_contents($file, json_encode($value), LOCK_EX);
    if (mt_rand(1, 50) === 1) {
        prune_files($dir, CACHE_TTL_SECONDS * 2, time());
    }
    return $value;
}

function read_json_request(): array
{
    if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
        throw new ApiError(405, 'Use POST.');
    }
    $raw = (string) file_get_contents('php://input', false, null, 0, MAX_REQUEST_BYTES + 1);
    if (strlen($raw) > MAX_REQUEST_BYTES) {
        throw new ApiError(413, 'Request too large.');
    }
    $data = json_decode($raw, true);
    if (!is_array($data)) {
        throw new ApiError(400, 'Invalid request.');
    }
    return $data;
}

function input_url(array $input): string
{
    $value = $input['url'] ?? null;
    if (!is_string($value) || trim($value) === '' || strlen($value) > MAX_URL_LENGTH) {
        throw new ApiError(400, INVALID_LINK_MESSAGE);
    }
    return trim($value);
}

function send_json(int $status, array $data): void
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store');
    echo json_encode($data, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
}

function send_file(string $body, string $contentType, string $fileName): void
{
    header('Content-Type: ' . $contentType);
    header('Content-Disposition: attachment; filename="' . $fileName . '"');
    header('Content-Length: ' . strlen($body));
    header('Cache-Control: no-store');
    echo $body;
}

/** Runs one endpoint: rate limit, read the JSON body, turn failures into JSON errors. */
function run_endpoint(callable $handler): void
{
    try {
        enforce_rate_limit(client_ip());
        $handler(read_json_request());
    } catch (ApiError $error) {
        send_json($error->status(), ['error' => $error->getMessage()]);
    } catch (Throwable $error) {
        error_log('[youtubedownload api] ' . get_class($error) . ': ' . $error->getMessage());
        send_json(502, ['error' => 'Could not get this from YouTube right now. Please try again in a minute.']);
    }
}

/**
 * HTTPS request with a timeout and a size cap.
 * Options: headers (string[]), userAgent, json (array, sent as POST body), head (bool).
 * @return array{0: int, 1: string, 2: string} status, body, content type
 */
function http_request(string $url, array $options = []): array
{
    $handle = curl_init($url);
    $headers = $options['headers'] ?? [];
    $settings = [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_MAXREDIRS => 3,
        CURLOPT_PROTOCOLS => CURLPROTO_HTTPS,
        CURLOPT_REDIR_PROTOCOLS => CURLPROTO_HTTPS,
        CURLOPT_CONNECTTIMEOUT => 8,
        CURLOPT_TIMEOUT => HTTP_TIMEOUT_SECONDS,
        CURLOPT_ENCODING => '',
        CURLOPT_USERAGENT => $options['userAgent'] ?? WEB_USER_AGENT,
        CURLOPT_NOPROGRESS => false,
        CURLOPT_PROGRESSFUNCTION => function ($resource, $expected, $downloaded): int {
            return $downloaded > MAX_DOWNLOAD_BYTES ? 1 : 0;
        },
    ];
    if (isset($options['json'])) {
        $headers[] = 'Content-Type: application/json';
        $settings[CURLOPT_POST] = true;
        $settings[CURLOPT_POSTFIELDS] = json_encode($options['json']);
    }
    if (!empty($options['head'])) {
        $settings[CURLOPT_NOBODY] = true;
    }
    $settings[CURLOPT_HTTPHEADER] = $headers;
    curl_setopt_array($handle, $settings);
    $body = curl_exec($handle);
    if ($body === false) {
        throw new RuntimeException('Request to ' . parse_url($url, PHP_URL_HOST) . ' failed: ' . curl_error($handle));
    }
    return [(int) curl_getinfo($handle, CURLINFO_RESPONSE_CODE), (string) $body, (string) curl_getinfo($handle, CURLINFO_CONTENT_TYPE)];
}
