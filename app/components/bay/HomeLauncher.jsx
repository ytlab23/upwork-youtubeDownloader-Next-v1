"use client";
import { useState } from "react";
import { TOOLS } from "./tools";
import { FrameMarks } from "./Viewer";
import { ToolIcon } from "./Icons";

/** Paste a link once, then open it in whichever tool you need. */
export default function HomeLauncher() {
  const [link, setLink] = useState("");

  const open = (tool) => {
    const url = link.trim();
    window.location.href = url ? `${tool.path}?url=${encodeURIComponent(url)}` : tool.path;
  };

  return (
    <div className="relative rounded-[6px] border border-bay-line bg-bay-well p-5 sm:p-7">
      <FrameMarks />
      <form
        onSubmit={(event) => {
          event.preventDefault();
          open(TOOLS[0]);
        }}
      >
        <label htmlFor="home-link" className="sr-only">
          Enter YouTube video URL
        </label>
        <input
          id="home-link"
          type="url"
          inputMode="url"
          autoComplete="off"
          spellCheck="false"
          value={link}
          onChange={(event) => setLink(event.target.value)}
          placeholder="Enter YouTube video URL"
          className="h-12 w-full rounded-[4px] border border-bay-line-strong bg-bay-panel px-3.5 text-[15px] text-bay-text placeholder:text-bay-faint transition-colors duration-150 hover:border-bay-faint focus:border-bay-playhead focus:outline-none"
        />
      </form>
      <ul className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
        {TOOLS.map((tool) => (
          <li key={tool.id} className="last:col-span-2 sm:last:col-span-1">
            <button
              type="button"
              onClick={() => open(tool)}
              className="flex h-11 w-full items-center gap-2.5 rounded-[4px] border border-bay-line-strong bg-bay-panel px-3 text-left text-[14px] font-semibold text-bay-text transition-colors duration-150 hover:border-bay-faint hover:bg-bay-raised"
            >
              <ToolIcon toolId={tool.id} size={19} className="shrink-0" style={{ color: tool.label }} />
              {tool.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
