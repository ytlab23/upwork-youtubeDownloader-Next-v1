// Long-form sections shared by the home page and the five tool pages.
// Headings and paragraphs come from each page's data as plain elements.
import { IconChevron } from "./Icons";

const sectionShell = "mx-auto max-w-workspace px-4 sm:px-6";

/**
 * A section with its heading on the left and its body on the right (stacked on phones).
 * An optional illustration sits under the heading and stays in view while the body scrolls.
 */
export function Section({ title, children, id, art }) {
  return (
    <section id={id} className={`${sectionShell} pt-20 sm:pt-24`}>
      <div className="bay-prose grid gap-8 border-t border-bay-line pt-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <div>
          {title}
          {art && <div className="mt-8 max-w-[34rem] lg:sticky lg:top-24 lg:mt-10">{art}</div>}
        </div>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  );
}

export function Lead({ children }) {
  return (
    <div className={`${sectionShell} pt-12 sm:pt-16`}>
      <div className="max-w-[60ch] text-[clamp(1.125rem,1rem+0.45vw,1.375rem)] leading-[1.6] text-bay-text [&_a]:underline [&_a]:decoration-bay-playhead [&_a]:underline-offset-4">
        {children}
      </div>
    </div>
  );
}

/** Rows separated by hairlines, each marked with the tool's label colour. */
export function ItemList({ items, label = "var(--bay-playhead)" }) {
  return (
    <ul className="mt-8 grid gap-x-10 sm:grid-cols-2">
      {items.map((item, index) => (
        <li key={index} className="border-t border-bay-line py-5">
          <h3 className="flex items-center gap-2.5 text-[17px] font-semibold text-bay-text">
            <span className="size-2.5 shrink-0 rounded-[2px]" style={{ background: label }} aria-hidden="true" />
            {item.header}
          </h3>
          <div className="mt-2 text-[15.5px] leading-relaxed text-bay-muted [&_a]:text-bay-text [&_a]:underline [&_a]:decoration-bay-playhead [&_a]:underline-offset-4">
            {item.desc}
          </div>
        </li>
      ))}
    </ul>
  );
}

/** Numbered steps pinned along a ruler, like markers on a timeline. */
export function Steps({ steps }) {
  return (
    <ol className="mt-10 grid gap-10 md:grid-cols-3 md:gap-8">
      {steps.map((step, index) => (
        <li key={index} className="relative md:border-t md:border-bay-line-strong md:pt-8">
          <span
            className="mb-4 flex h-7 w-6 items-start justify-center bg-bay-playhead pt-0.5 font-mono text-[13px] font-bold text-bay-ink [clip-path:polygon(0_0,100%_0,100%_68%,50%_100%,0_68%)] md:absolute md:-top-[0.9rem] md:left-0 md:mb-0"
            aria-hidden="true"
          >
            {index + 1}
          </span>
          <h3 className="text-[17px] font-semibold text-bay-text">{String(step.header).replace(/:\s*$/, "")}</h3>
          <p className="mt-2 text-[15.5px] leading-relaxed text-bay-muted">{step.data}</p>
        </li>
      ))}
    </ol>
  );
}

export function Faq({ items }) {
  return (
    <Section
      id="faq"
      title={
        <>
          <h2>Frequently Asked Questions (FAQs)</h2>
          <p className="mt-4">
            Curious about how we can enhance your YouTube experience? Explore the most common questions from our community and
            discover the answers that can unlock new possibilities for your content creation journey!
          </p>
        </>
      }
    >
      <div className="border-t border-bay-line">
        {items.map((item, index) => (
          <details key={index} className="group border-b border-bay-line">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-[17px] font-semibold text-bay-text [&::-webkit-details-marker]:hidden">
              <span>{item.question}</span>
              <IconChevron className="mt-0.5 size-5 shrink-0 text-bay-faint transition-[transform,color] duration-200 group-hover:text-bay-text group-open:rotate-180" />
            </summary>
            <div className="pb-6 pr-10 text-[15.5px] leading-relaxed text-bay-muted [&_a]:text-bay-text [&_a]:underline [&_a]:decoration-bay-playhead [&_a]:underline-offset-4">
              {item.answer}
            </div>
          </details>
        ))}
      </div>
    </Section>
  );
}

/** The closing panel: the page's closing heading and text, with an optional illustration beside it. */
export function Closing({ heading, text, art }) {
  return (
    <section className={`${sectionShell} pt-20 sm:pt-24`}>
      <div className="flex flex-col gap-6 rounded-[6px] border border-bay-line bg-bay-panel p-6 sm:p-10 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <h2 className="wide text-balance text-[clamp(1.5rem,1.1rem+1.5vw,2.25rem)] font-bold leading-[1.1] tracking-[-0.02em]">
            {String(heading).trim()}
          </h2>
          <p className="mt-3 max-w-[62ch] text-[16px] leading-relaxed text-bay-muted">{String(text).trim()}</p>
        </div>
        {art && <div className="w-full max-w-[26rem] shrink-0 md:w-[42%]">{art}</div>}
      </div>
    </section>
  );
}
