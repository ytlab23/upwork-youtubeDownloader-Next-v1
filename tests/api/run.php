<?php
declare(strict_types=1);

// Minimal test runner for the PHP back-end in public/api/_lib.
// Usage: php tests/api/run.php   (exit code 1 when a test fails)

putenv('YTD_STORAGE_DIR=' . sys_get_temp_dir() . '/ytd-api-tests-' . getmypid());

foreach (['bootstrap', 'youtube', 'assets', 'pdf'] as $module) {
    require __DIR__ . '/../../public/api/_lib/' . $module . '.php';
}

$GLOBALS['tests'] = [];

function test(string $name, callable $body): void
{
    $GLOBALS['tests'][] = [$name, $body];
}

function assert_same($expected, $actual, string $label = ''): void
{
    if ($expected !== $actual) {
        throw new RuntimeException(sprintf(
            '%sexpected %s, got %s',
            $label === '' ? '' : $label . ': ',
            var_export($expected, true),
            var_export($actual, true)
        ));
    }
}

function assert_true(bool $condition, string $label): void
{
    if (!$condition) {
        throw new RuntimeException('expected true: ' . $label);
    }
}

function assert_api_error(int $status, callable $body): void
{
    try {
        $body();
    } catch (ApiError $error) {
        assert_same($status, $error->status(), 'status of "' . $error->getMessage() . '"');
        return;
    }
    throw new RuntimeException("expected ApiError $status, nothing was thrown");
}

foreach (glob(__DIR__ . '/*Test.php') as $file) {
    require $file;
}

$failed = 0;
foreach ($GLOBALS['tests'] as [$name, $body]) {
    try {
        $body();
        echo "ok   $name\n";
    } catch (Throwable $error) {
        $failed++;
        echo "FAIL $name\n     " . $error->getMessage() . "\n";
    }
}
$total = count($GLOBALS['tests']);
echo "\n" . ($total - $failed) . "/$total passed\n";
exit($failed === 0 ? 0 : 1);
