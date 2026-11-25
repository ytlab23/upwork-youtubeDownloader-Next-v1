"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { TOOLS } from "./tools";
import { Mark, ToolIcon } from "./Icons";

const normalise = (path) => (path || "/").replace(/\/$/, "") || "/";

export default function AppBar() {
  const current = normalise(usePathname());

  return (
    <header className="sticky top-0 z-30 border-b border-bay-line bg-bay-bg">
      <div className="mx-auto flex max-w-workspace flex-col gap-0 px-4 sm:px-6 md:h-14 md:flex-row md:items-center md:gap-10">
        <Link
          href="/"
          className="flex h-14 shrink-0 items-center gap-2.5 rounded-sm md:h-auto"
          aria-label="YouTubeDownload home"
        >
          <Mark />
          <span className="semi-wide text-[17px] font-bold tracking-[-0.01em] text-bay-text">
            YouTubeDownload.org
          </span>
        </Link>

        <nav aria-label="Tools" className="-mx-4 overflow-x-auto px-4 sm:-mx-6 sm:px-6 md:mx-0 md:px-0">
          <ul className="flex min-w-max items-stretch gap-1 md:gap-2">
            {TOOLS.map((tool) => {
              const active = current === tool.path;
              return (
                <li key={tool.id}>
                  <Link
                    href={tool.path}
                    aria-current={active ? "page" : undefined}
                    className={`relative flex h-11 items-center gap-2 rounded-sm px-2.5 text-[14px] md:px-3 font-medium transition-colors duration-150 md:h-14 ${
                      active ? "text-bay-text" : "text-bay-muted hover:text-bay-text"
                    }`}
                  >
                    <ToolIcon toolId={tool.id} size={17} className="shrink-0" style={{ color: tool.label }} />
                    {tool.name}
                    {active && (
                      <span
                        className="absolute inset-x-2.5 bottom-0 h-[2px] md:inset-x-3"
                        style={{ background: tool.label }}
                        aria-hidden="true"
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
