import Link from "next/link";
import { TOOLS } from "./tools";
import { Mark, ToolIcon } from "./Icons";

export default function StatusBar() {
  return (
    <footer className="mt-24 border-t border-bay-line bg-bay-panel">
      <div className="mx-auto grid max-w-workspace gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.2fr_2fr] md:items-start">
        <div>
          <Link href="/" className="inline-flex items-center gap-2.5 rounded-sm">
            <Mark />
            <span className="semi-wide text-[17px] font-bold tracking-[-0.01em]">YouTubeDownload.org</span>
          </Link>
          <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-bay-muted">
            Download Thumbnails, Logos, Banners, Captions, and More in Seconds.
          </p>
        </div>

        <nav aria-label="All tools">
          <ul className="grid grid-cols-2 gap-x-6 gap-y-3 sm:flex sm:flex-wrap sm:gap-x-8 md:justify-end">
            {TOOLS.map((tool) => (
              <li key={tool.id}>
                <Link
                  href={tool.path}
                  className="group flex items-center gap-2 whitespace-nowrap rounded-sm text-[15px] text-bay-muted transition-colors duration-150 hover:text-bay-text"
                >
                  <ToolIcon toolId={tool.id} size={16} className="shrink-0" style={{ color: tool.label }} />
                  {tool.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-bay-line">
        <div className="mx-auto max-w-workspace px-4 py-4 text-[13px] text-bay-faint sm:px-6">
          <p>Copyright © {new Date().getFullYear()}.</p>
        </div>
      </div>
    </footer>
  );
}
