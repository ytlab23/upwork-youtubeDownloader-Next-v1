// The five tools: what each asks the back-end for and how its result is shown.
// Every visible string here is the old site's own wording.

export const TOOLS = [
  {
    id: "thumbnail",
    path: "/thumbnail",
    name: "Thumbnail",
    button: "Thumbnail",
    tileTitle: "Thumbnail Downloader",
    resultLabel: "Thumbnail",
    content: "thumbnail",
    kind: "image",
    ratio: 16 / 9,
    label: "var(--label-thumbnail)",
    prompt: "Enter the URL of a YouTube video to download Thumbnail",
    download: { type: "image", content: "thumbnail", file: "thumbnail.jpg", label: "Download Thumbnail", error: "Error downloading image" },
  },
  {
    id: "captions",
    path: "/captions",
    name: "Captions",
    button: "Captions",
    tileTitle: "Captions Download",
    resultLabel: "Transcript",
    content: "transcript",
    kind: "transcript",
    label: "var(--label-captions)",
    prompt: "Enter the URL of a YouTube video to download Captions",
    download: { type: "pdf", content: "transcript", file: "transcript.pdf", label: "Download PDF", error: "Error downloading PDF. Please try again." },
  },
  {
    id: "logo",
    path: "/logo",
    name: "Logo",
    button: "Logo",
    tileTitle: "Logo Downloader",
    resultLabel: "Logo",
    content: "logo",
    kind: "image",
    ratio: 1,
    round: true,
    label: "var(--label-logo)",
    prompt: "Enter the URL of a YouTube video to download the Logo.",
    download: { type: "image", content: "logo", file: "logo.jpg", label: "Download Logo", error: "Error downloading the logo. Please try again." },
  },
  {
    id: "banner",
    path: "/banner",
    name: "Banner",
    button: "Banner",
    tileTitle: "Banner Downloader",
    resultLabel: "Banner",
    content: "banner",
    kind: "image",
    ratio: 2560 / 424,
    label: "var(--label-banner)",
    prompt: "Enter the URL of a YouTube video to download Banner",
    download: { type: "image", content: "banner", file: "channel-banner.jpg", label: "Download Banner", error: "Error downloading image" },
  },
  {
    id: "channelinformation",
    path: "/channelinformation",
    name: "Channel Information",
    button: "Channel Info",
    tileTitle: "Channel Information",
    resultLabel: "Channel Information",
    content: "channelInfo",
    kind: "info",
    label: "var(--label-info)",
    prompt: "Enter the URL of a YouTube video to download Channel Information",
    download: { type: "json", content: "channelInfo", file: "channelInfo.json", label: "Download as Json", error: "Error downloading JSON. Please try again." },
  },
];

/** The old site's own messages for a request that fails before the back-end answers. */
export const FETCH_ERRORS = {
  noResponse: "Error fetching data. No response received from the server. Please check your internet connection and try again.",
  other: "Error fetching data. Please check the URL and try again.",
};

export const getTool = (id) => TOOLS.find((tool) => tool.id === id) ?? TOOLS[0];

const VIDEO_ID = /(?:[?&]v=|youtu\.be\/|\/shorts\/|\/embed\/|\/live\/)([A-Za-z0-9_-]{11})/;
const HANDLE = /\/@([A-Za-z0-9._-]{3,30})/;
const CHANNEL_ID = /\/channel\/(UC[A-Za-z0-9_-]{22})/;

/** A short name for a pasted link: the video ID, @handle or channel ID. */
export function clipName(link) {
  const text = String(link ?? "").trim();
  if (/^[A-Za-z0-9_-]{11}$/.test(text)) return text;
  const match = text.match(VIDEO_ID) ?? text.match(HANDLE) ?? text.match(CHANNEL_ID);
  if (!match) return text.slice(0, 18);
  return match === text.match(HANDLE) ? `@${match[1]}` : match[1];
}
