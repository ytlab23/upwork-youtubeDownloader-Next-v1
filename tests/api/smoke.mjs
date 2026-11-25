// Calls the deployed back-end the way the tool pages do.
//   node tests/api/smoke.mjs https://youtubedownload.org
// Exits with 1 when any check fails.

const base = (process.argv[2] ?? 'https://youtubedownload.org').replace(/\/$/, '');
const VIDEO = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
const NON_ENGLISH_VIDEO = 'https://youtu.be/arj7oStGLkU';
let failures = 0;

const check = (ok, label, detail = '') => {
  console.log(`${ok ? 'ok  ' : 'FAIL'} ${label}${detail ? ` — ${detail}` : ''}`);
  if (!ok) failures += 1;
};

const post = (endpoint, body) =>
  fetch(`${base}/api/${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

const getAssets = async (content, url = VIDEO) => {
  const response = await post('get-assets', { url, content });
  return { status: response.status, data: await response.json() };
};

const download = async (content, type, url = VIDEO) => {
  const response = await post('download-assets', { url, type, content });
  const bytes = Buffer.from(await response.arrayBuffer());
  return { status: response.status, type: response.headers.get('content-type') ?? '', bytes };
};

const thumbnail = await getAssets('thumbnail');
check(thumbnail.status === 200 && /^https:\/\/i\.ytimg\.com\/vi\//.test(thumbnail.data.thumbnail), 'thumbnail address', thumbnail.data.thumbnail ?? thumbnail.data.error);

const transcript = await getAssets('transcript');
check(transcript.status === 200 && transcript.data.transcript?.length > 200, 'transcript text', `${transcript.data.transcript?.length ?? 0} characters, language ${transcript.data.transcriptLanguage ?? transcript.data.error}`);

for (const content of ['logo', 'banner']) {
  const result = await getAssets(content);
  check(result.status === 200 && /^https:\/\/yt3\./.test(result.data[content]), `${content} address`, result.data[content] ?? result.data.error);
}

const info = await getAssets('channelInfo');
check(info.status === 200 && info.data.channelInfo?.title && info.data.channelInfo?.subscribers, 'channel info', `${info.data.channelInfo?.title} · ${info.data.channelInfo?.subscribers} · ${info.data.channelInfo?.videos}`);

for (const [content, type, kind, minBytes] of [['thumbnail', 'image', 'image/', 5000], ['logo', 'image', 'image/', 2000], ['transcript', 'pdf', 'application/pdf', 1000], ['channelInfo', 'json', 'application/json', 100]]) {
  const file = await download(content, type);
  const looksRight = kind === 'application/pdf' ? file.bytes.subarray(0, 5).toString() === '%PDF-' : kind === 'application/json' ? Boolean(JSON.parse(file.bytes.toString()).title) : true;
  check(file.status === 200 && file.type.startsWith(kind) && file.bytes.length >= minBytes && looksRight, `download ${content}`, `${file.status}, ${file.type}, ${file.bytes.length} bytes`);
}

const foreign = await download('transcript', 'pdf', NON_ENGLISH_VIDEO);
check(foreign.status === 200 && foreign.bytes.subarray(0, 5).toString() === '%PDF-', 'transcript PDF of a video whose first captions are not English', `${foreign.bytes.length} bytes`);

const bad = await getAssets('thumbnail', 'https://example.com/watch?v=dQw4w9WgXcQ');
check(bad.status === 400 && /valid YouTube video link/.test(bad.data.error ?? ''), 'a non-YouTube link is refused with a clear message', bad.data.error);

const missing = await getAssets('thumbnail', 'https://www.youtube.com/watch?v=aaaaaaaaaaa');
check(missing.status === 404, 'a video that does not exist gives a clear 404', missing.data.error);

const wrongMethod = await fetch(`${base}/api/get-assets`);
check(wrongMethod.status === 405, 'GET is refused', String(wrongMethod.status));

const helper = await fetch(`${base}/api/_lib/youtube.php`);
check(helper.status === 403, 'helper code is not reachable', String(helper.status));

console.log(failures === 0 ? '\nALL API CHECKS PASSED' : `\n${failures} API CHECK(S) FAILED`);
process.exit(failures === 0 ? 0 : 1);
