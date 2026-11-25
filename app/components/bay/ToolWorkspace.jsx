"use client";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { FETCH_ERRORS, clipName, getTool } from "./tools";
import { clipKey, readClips, rememberClip } from "./session";
import { useTimecode } from "./useTimecode";
import ViewerStage from "./Viewer";
import Timeline from "./Timeline";
import { IconDownload, ToolIcon } from "./Icons";

const responseError = (error) =>
  error?.response?.data?.error || (error?.request ? FETCH_ERRORS.noResponse : FETCH_ERRORS.other);

async function downloadError(error, fallback) {
  const data = error?.response?.data;
  if (data instanceof Blob) {
    try {
      return JSON.parse(await data.text()).error || fallback;
    } catch {
      return fallback;
    }
  }
  return error?.response?.data?.error || fallback;
}

function saveBlob(blob, fileName) {
  const href = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = href;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(href);
}

const HTTPS_URL = /^https:\/\/[^\s"'<>]+$/;

/** The small picture a clip shows on the timeline: the pulled image, or the channel avatar. */
function posterFor(tool, data) {
  const candidate = tool.kind === "image" ? data?.[tool.content] : tool.kind === "info" ? data?.channelInfo?.avatar : null;
  return typeof candidate === "string" && HTTPS_URL.test(candidate) ? candidate : undefined;
}

export default function ToolWorkspace({ toolId, title }) {
  const tool = getTool(toolId);
  const [link, setLink] = useState("");
  const [status, setStatus] = useState("idle");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [elapsed, setElapsed] = useState(0);
  const [measured, setMeasured] = useState("");
  const [download, setDownload] = useState({ busy: false, error: "" });
  const [clips, setClips] = useState([]);
  const timecode = useTimecode(status === "loading", elapsed);

  const run = useCallback(
    async (target) => {
      const url = String(target ?? "").trim();
      setStatus("loading");
      setError("");
      setMeasured("");
      setDownload({ busy: false, error: "" });
      const started = performance.now();
      try {
        const response = await axios.post("/api/get-assets", { url, content: tool.content });
        setResult({ url, data: response.data });
        setElapsed(performance.now() - started);
        setStatus("done");
        setClips((current) => rememberClip(current, { tool: tool.id, url, name: clipName(url), poster: posterFor(tool, response.data) }));
      } catch (failure) {
        setElapsed(performance.now() - started);
        setError(responseError(failure));
        setStatus("error");
      }
    },
    [tool]
  );

  useEffect(() => {
    setClips(readClips());
    const shared = new URLSearchParams(window.location.search).get("url");
    if (shared) {
      setLink(shared);
      run(shared);
    }
  }, [run]);

  const handleDownload = async () => {
    if (!result) return;
    setDownload({ busy: true, error: "" });
    try {
      const response = await axios.post(
        "/api/download-assets",
        { url: result.url, type: tool.download.type, content: tool.download.content },
        { responseType: "blob" }
      );
      saveBlob(response.data, tool.download.file);
      setDownload({ busy: false, error: "" });
    } catch (failure) {
      setDownload({ busy: false, error: await downloadError(failure, tool.download.error) });
    }
  };

  const openClip = (clip) => {
    if (clip.tool === tool.id) {
      setLink(clip.url);
      run(clip.url);
      return;
    }
    window.location.href = `${getTool(clip.tool).path}?url=${encodeURIComponent(clip.url)}`;
  };

  const hasResult = status === "done" && Boolean(result);

  return (
    <section id="workspace" className="mx-auto max-w-workspace scroll-mt-20 px-4 pt-6 sm:px-6 sm:pt-10">
      <div className="overflow-hidden rounded-[6px] border border-bay-line bg-bay-panel">
        <div className="grid lg:grid-cols-[minmax(20rem,0.82fr)_1.6fr]">
          <div className="flex flex-col border-b border-bay-line p-5 sm:p-7 lg:border-b-0 lg:border-r">
            <h1 className="wide text-balance text-[clamp(2rem,1.35rem+2.4vw,3.1rem)] font-bold leading-[1.02] tracking-[-0.025em]">
              {title}
            </h1>
            <p className="mt-4 max-w-md text-[16px] leading-relaxed text-bay-muted">{tool.prompt}</p>

            <form
              className="mt-7 flex flex-col gap-2 sm:flex-row lg:flex-col xl:flex-row"
              aria-busy={status === "loading"}
              onSubmit={(event) => {
                event.preventDefault();
                run(link);
              }}
            >
              <label htmlFor="tool-link" className="sr-only">
                Enter YouTube video URL
              </label>
              <input
                id="tool-link"
                type="url"
                inputMode="url"
                autoComplete="off"
                spellCheck="false"
                value={link}
                onChange={(event) => setLink(event.target.value)}
                placeholder="Enter YouTube video URL"
                className="h-12 w-full min-w-0 flex-none rounded-[4px] border border-bay-line-strong bg-bay-well px-3.5 text-[15px] text-bay-text transition-colors duration-150 placeholder:text-bay-faint hover:border-bay-faint focus:border-bay-playhead focus:outline-none sm:w-auto sm:flex-1 lg:w-full lg:flex-none xl:w-auto xl:flex-1"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className={`inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-[4px] border px-5 text-[15px] font-bold transition-colors duration-150 disabled:cursor-progress disabled:opacity-70 ${
                  hasResult
                    ? "border-bay-line-strong bg-transparent text-bay-text hover:border-bay-faint hover:bg-bay-raised"
                    : "border-bay-playhead bg-bay-playhead text-bay-ink hover:border-bay-playhead-hover hover:bg-bay-playhead-hover"
                }`}
              >
                <ToolIcon toolId={tool.id} weight="bold" />
                {tool.button}
              </button>
            </form>
          </div>

          <div className="flex min-w-0 flex-col">
            <div className="flex h-11 items-center justify-between gap-4 border-b border-bay-line px-4 sm:px-5">
              <span className="flex min-w-0 items-center gap-2 text-[13px]">
                <ToolIcon toolId={tool.id} size={16} className="shrink-0" style={{ color: tool.label }} />
                <span className="font-semibold">{tool.resultLabel}</span>
                {hasResult && <span className="truncate font-mono text-bay-muted">{clipName(result.url)}</span>}
              </span>
              {hasResult && tool.kind === "image" && measured && <span className="tabular shrink-0 text-[13px] text-bay-muted">{measured}</span>}
            </div>

            <ViewerStage tool={tool} status={status} result={result} error={error} onMeasure={setMeasured} />

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-bay-line px-4 py-2.5 sm:px-5">
              <span className="flex items-center gap-2.5">
                <span
                  className={`size-2 rounded-full ${status === "loading" ? "bg-bay-playhead" : hasResult ? "" : "bg-bay-line-strong"}`}
                  style={hasResult ? { background: tool.label } : undefined}
                  aria-hidden="true"
                />
                <span className="tabular font-mono text-[15px] text-bay-text" aria-hidden="true">
                  {timecode}
                </span>
              </span>
              <button
                type="button"
                onClick={handleDownload}
                disabled={!hasResult || download.busy}
                className={`inline-flex h-10 items-center gap-2 rounded-[4px] border px-4 text-[14px] font-bold transition-colors duration-150 ${
                  hasResult
                    ? "border-bay-playhead bg-bay-playhead text-bay-ink hover:border-bay-playhead-hover hover:bg-bay-playhead-hover disabled:cursor-progress disabled:opacity-70"
                    : "cursor-not-allowed border-bay-line-strong bg-transparent text-bay-faint"
                }`}
              >
                <IconDownload />
                {tool.download.label}
              </button>
              {download.error && (
                <p className="w-full text-right text-[13px] text-bay-danger" role="alert">
                  {download.error}
                </p>
              )}
            </div>
          </div>
        </div>

        <Timeline clips={clips} activeKey={hasResult ? clipKey({ tool: tool.id, url: result.url }) : ""} onSelect={openClip} />
      </div>
    </section>
  );
}
