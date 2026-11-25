"use client";
import { useState } from "react";
import { getTool } from "./tools";
import { clipKey } from "./session";
import { formatTimecode } from "./useTimecode";
import { IconFilm } from "./Icons";

const RULER_SEGMENTS = 16;
const SECONDS_PER_SEGMENT = 5;

/** Timecode ruler: a labelled major tick every 8rem, minor ticks every 1rem. */
function Ruler() {
  return (
    <div className="flex h-6 border-b border-bay-line" aria-hidden="true">
      <div className="sticky left-0 z-10 w-12 shrink-0 border-r border-bay-line bg-bay-panel" />
      {Array.from({ length: RULER_SEGMENTS }, (_, index) => (
        <div key={index} className="bay-ruler-segment relative w-32 shrink-0 border-l border-bay-line-strong">
          <span className="tabular absolute left-1 top-[3px] font-mono text-[10px] leading-none text-bay-faint">
            {formatTimecode(index * SECONDS_PER_SEGMENT * 1000)}
          </span>
        </div>
      ))}
    </div>
  );
}

/** The picture on a clip: the pulled image, a text strip for captions, or plain label colour. */
function ClipPoster({ tool, poster }) {
  const [failed, setFailed] = useState(false);
  if (tool.kind === "transcript") {
    return <span className="bay-text-strip h-full w-12 shrink-0 border-r border-bay-ink/30" aria-hidden="true" />;
  }
  if (!poster || failed) return null;
  return (
    // eslint-disable-next-line @next/next/no-img-element -- static export, remote YouTube image
    <img
      src={poster}
      alt=""
      referrerPolicy="no-referrer"
      loading="lazy"
      onError={() => setFailed(true)}
      className="h-full w-16 shrink-0 border-r border-bay-ink/30 object-cover"
    />
  );
}

export default function Timeline({ clips, activeKey, onSelect }) {
  return (
    <section aria-label="Session timeline" className="border-t border-bay-line">
      <div className="relative overflow-x-auto">
        <div className="min-w-max">
          <Ruler />
          <div className="flex min-h-[4.25rem] items-stretch">
            <div className="sticky left-0 z-10 flex w-12 shrink-0 items-center justify-center border-r border-bay-line bg-bay-panel text-bay-faint" aria-hidden="true">
              <IconFilm />
            </div>
            <ol className="flex items-center gap-1.5 px-2 py-2.5">
              {clips.length === 0 && (
                <li className="h-11 w-52 rounded-[3px] border border-dashed border-bay-line-strong" aria-hidden="true" />
              )}
              {clips.map((clip, index) => {
                const tool = getTool(clip.tool);
                const key = clipKey(clip);
                const active = key === activeKey;
                const newest = index === clips.length - 1;
                return (
                  <li key={key} className="relative">
                    {active && (
                      <span className="pointer-events-none absolute -top-[1.15rem] bottom-[-0.65rem] left-0 z-10 w-[2px] bg-bay-playhead" aria-hidden="true">
                        <span className="absolute -left-[5px] -top-[1px] h-2.5 w-3 bg-bay-playhead [clip-path:polygon(0_0,100%_0,100%_55%,50%_100%,0_55%)]" />
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => onSelect(clip)}
                      aria-current={active ? "true" : undefined}
                      aria-label={`${tool.button} ${clip.name}`}
                      className={`${newest ? "bay-clip-in" : ""} flex h-11 w-52 items-stretch overflow-hidden rounded-[3px] text-left text-bay-ink transition-[filter] duration-150 hover:brightness-110 ${
                        active ? "outline outline-2 outline-offset-1 outline-bay-text" : ""
                      }`}
                      style={{ background: tool.label }}
                    >
                      <ClipPoster tool={tool} poster={clip.poster} />
                      <span className="flex min-w-0 flex-col justify-center px-2.5">
                        <span className="truncate text-[12px] font-bold uppercase tracking-[0.04em]">{tool.button}</span>
                        <span className="truncate font-mono text-[12px]">{clip.name}</span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
