import Link from "next/link";
import { FrameMarks } from "./components/bay/Viewer";
import { IconArrowLeft } from "./components/bay/Icons";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-workspace px-4 pt-10 sm:px-6 sm:pt-16">
      <div className="relative flex min-h-[26rem] flex-col items-center justify-center rounded-[6px] border border-bay-line bg-bay-well px-6 py-16 text-center">
        <FrameMarks color="var(--bay-playhead)" />
        <h1 className="wide text-[clamp(2.25rem,1.6rem+3vw,4rem)] font-bold leading-none tracking-[-0.03em] text-bay-playhead">
          Uh-oh! 404
        </h1>
        <p className="mt-5 text-[17px] text-bay-muted">We can&apos;t find that page.</p>
        <Link
          href="/"
          className="mt-8 inline-flex h-12 items-center gap-2 rounded-[4px] bg-bay-playhead px-5 text-[15px] font-bold text-bay-ink transition-colors duration-150 hover:bg-bay-playhead-hover"
        >
          <IconArrowLeft />
          Go back to home
        </Link>
      </div>
    </section>
  );
}
