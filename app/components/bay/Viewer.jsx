"use client";
import { useState } from "react";
import { IconAlert, ToolIcon } from "./Icons";

/** Viewfinder corner marks, drawn as 1px hairlines. `outside` sets them just beyond a picture's edge. */
export function FrameMarks({ color = "var(--bay-line-strong)", outside = false }) {
  const corner = "pointer-events-none absolute size-4";
  const at = outside
    ? ["-left-2 -top-2", "-right-2 -top-2", "-bottom-2 -left-2", "-bottom-2 -right-2"]
    : ["left-3 top-3", "right-3 top-3", "bottom-3 left-3", "bottom-3 right-3"];
  const style = { borderColor: color };
  return (
    <>
      <span className={`${corner} ${at[0]} border-l border-t`} style={style} aria-hidden="true" />
      <span className={`${corner} ${at[1]} border-r border-t`} style={style} aria-hidden="true" />
      <span className={`${corner} ${at[2]} border-b border-l`} style={style} aria-hidden="true" />
      <span className={`${corner} ${at[3]} border-b border-r`} style={style} aria-hidden="true" />
    </>
  );
}

/** What the monitor shows with no picture: nothing while loading, the error, or an empty-reel icon. */
function Message({ tool, status, error }) {
  if (status === "loading") return null;
  if (status === "error") {
    return (
      <div className="flex flex-col items-center gap-2 text-center" role="alert">
        <span className="text-bay-danger">
          <IconAlert className="size-6" />
        </span>
        <p className="max-w-sm text-[15px] font-semibold text-bay-text [overflow-wrap:anywhere]">{error}</p>
      </div>
    );
  }
  return (
    <span className="flex size-12 items-center justify-center rounded-[4px] border border-bay-line-strong" style={{ color: tool.label }} aria-hidden="true">
      <ToolIcon toolId={tool.id} size={26} />
    </span>
  );
}

function Scan() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="bay-scan absolute inset-y-0 left-0 w-full">
        <span className="absolute inset-y-0 left-0 w-px bg-bay-playhead" />
      </div>
    </div>
  );
}

function TranscriptResult({ text }) {
  const lines = String(text ?? "").split("\n").filter(Boolean);
  return (
    <ol className="bay-cut h-full overflow-y-auto py-3" aria-label="Transcript">
      {lines.map((line, index) => (
        <li key={index} className="grid grid-cols-[3.5rem_1fr] gap-3 px-4 py-1.5 text-[15px] leading-relaxed hover:bg-bay-raised sm:px-6">
          <span className="tabular pt-[3px] text-right font-mono text-[12px] text-bay-faint">{String(index + 1).padStart(3, "0")}</span>
          <span className="text-bay-text">{line}</span>
        </li>
      ))}
    </ol>
  );
}

// The fields the old site showed as raw JSON, listed under their own JSON keys.
const INFO_KEYS = ["channelId", "title", "handle", "url", "subscribers", "videos", "keywords", "isFamilySafe", "description"];

function InfoValue({ field, raw }) {
  if (raw === null || raw === undefined || raw === "") return "—";
  if (field === "url" && typeof raw === "string" && /^https:\/\//.test(raw)) {
    return (
      <a href={raw} target="_blank" rel="noopener noreferrer" className="break-all underline decoration-bay-playhead underline-offset-4 hover:text-bay-playhead-hover">
        {raw}
      </a>
    );
  }
  return String(raw);
}

function InfoResult({ info }) {
  if (!info) return null;
  return (
    <div className="bay-cut h-full overflow-y-auto">
      <div className="flex items-center gap-4 border-b border-bay-line px-4 py-4 sm:px-6">
        {info.avatar && (
          // eslint-disable-next-line @next/next/no-img-element -- static export, remote YouTube image
          <img src={info.avatar} alt="" referrerPolicy="no-referrer" className="size-12 rounded-full bg-bay-raised" />
        )}
        <div className="min-w-0">
          {info.title && <p className="truncate text-[17px] font-semibold">{info.title}</p>}
          <p className="truncate text-[14px] text-bay-muted">{[info.handle, info.subscribers].filter(Boolean).join(" · ")}</p>
        </div>
      </div>
      <dl className="divide-y divide-bay-line" aria-label="Channel Information">
        {INFO_KEYS.map((field) => (
          <div key={field} className="grid grid-cols-[7.5rem_1fr] gap-4 px-4 py-2.5 text-[14px] sm:px-6">
            <dt className="font-mono text-[13px] text-bay-faint">{field}</dt>
            <dd className={`min-w-0 break-words ${field === "description" ? "whitespace-pre-line leading-relaxed text-bay-muted" : ""} ${field === "channelId" ? "font-mono text-[13px]" : ""}`}>
              <InfoValue field={field} raw={info[field]} />
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

/** Text tools: a fixed monitor with a scrolling readout. */
function TextStage({ tool, status, result, error }) {
  const done = status === "done" && result;
  return (
    <div className="relative h-[22rem] bg-bay-well sm:h-[26rem] lg:h-[29rem]">
      {!done && <FrameMarks />}
      {status === "loading" && <Scan />}
      {done ? (
        tool.kind === "transcript" ? <TranscriptResult text={result.data.transcript} /> : <InfoResult info={result.data.channelInfo} />
      ) : (
        <div className="flex h-full items-center justify-center px-8">
          <Message tool={tool} status={status} error={error} />
        </div>
      )}
    </div>
  );
}

/** Image tools: a picture frame in the asset's own shape, letterboxed inside the monitor. */
function ImageStage({ tool, status, src, error, onMeasure }) {
  const [ratio, setRatio] = useState(tool.ratio);
  const [failed, setFailed] = useState(false);

  const showPicture = Boolean(src) && !failed;
  // A very wide frame (banner) has no room for a message inside it.
  const messageBelow = tool.ratio > 3;
  const markColor = showPicture ? tool.label : "var(--bay-line-strong)";
  const message = showPicture ? null : failed ? (
    <span className="text-bay-faint" aria-hidden="true">
      <IconAlert className="size-6" />
    </span>
  ) : (
    <Message tool={tool} status={status} error={error} />
  );

  // Phones: until a picture arrives, the whole monitor is the frame and the message sits inside it.
  // Larger screens: an empty frame in the asset's own shape, with the message inside or under it.
  return (
    <div
      className={`relative bg-bay-well sm:h-[24rem] sm:px-10 sm:py-9 lg:h-[29rem] ${
        showPicture ? "px-6 py-7" : "flex min-h-[17rem] items-center justify-center px-8 py-10 sm:block sm:min-h-0"
      }`}
    >
      {!showPicture && (
        <div className="sm:hidden">
          <FrameMarks />
          {status === "loading" && <Scan />}
          {message}
        </div>
      )}
      <div className={`h-full flex-col items-center justify-center gap-6 sm:[container-type:size] ${showPicture ? "flex" : "hidden sm:flex"}`}>
        <div className="bay-frame relative shrink-0" style={{ "--ratio": ratio }}>
          <FrameMarks color={markColor} outside />
          <div className={`absolute inset-0 overflow-hidden bg-bay-panel ${tool.round && showPicture ? "rounded-full" : "rounded-[2px]"}`}>
            {status === "loading" && <Scan />}
            {showPicture && (
              // eslint-disable-next-line @next/next/no-img-element -- static export, remote YouTube image
              <img
                src={src}
                alt={tool.resultLabel}
                referrerPolicy="no-referrer"
                onLoad={(event) => {
                  const { naturalWidth, naturalHeight } = event.currentTarget;
                  if (naturalWidth && naturalHeight) setRatio(naturalWidth / naturalHeight);
                  onMeasure?.(`${naturalWidth} × ${naturalHeight}`);
                }}
                onError={() => {
                  setFailed(true);
                  onMeasure?.("");
                }}
                className="bay-cut size-full object-cover"
              />
            )}
            {message && !messageBelow && <div className="flex h-full items-center justify-center p-4">{message}</div>}
          </div>
        </div>
        {message && messageBelow && <div>{message}</div>}
      </div>
    </div>
  );
}

/** The program monitor: the picture area for every state and every kind of tool. */
export default function ViewerStage({ tool, status, result, error, onMeasure }) {
  if (tool.kind !== "image") return <TextStage tool={tool} status={status} result={result} error={error} />;
  const src = status === "done" && result ? result.data[tool.content] : null;
  // Keyed on the picture so its measured shape and load state start fresh for every new asset.
  return <ImageStage key={src || "none"} tool={tool} status={status} src={src} error={error} onMeasure={onMeasure} />;
}
