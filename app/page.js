import Link from "next/link";
import HomeLauncher from "./components/bay/HomeLauncher";
import ToolPreview from "./components/bay/ToolPreview";
import { Closing, Faq, ItemList, Section } from "./components/bay/Article";
import { TOOLS } from "./components/bay/tools";
import { IconArrowRight, ToolIcon } from "./components/bay/Icons";
import { TakeOutArt, ToolkitArt } from "./components/bay/illustrations";

const TOOL_DESCRIPTIONS = {
  thumbnail:
    "First impressions matter! With our thumbnail download tool, you can instantly grab attention with the perfect visual for your video through a simple click. No more screenshot hassles or low-quality images. Get exactly what you need to showcase your content in the best light.",
  logo:
    "Your logo is the face of the brand. So, creating it from scratch is not advisable for beginners. With our logo downloader, you can easily save any YouTube channel's logo. Edit it with a random tool to create your own logo.",
  banner:
    "Need a stunning banner to represent your YouTube channel? Simply paste the URL to your inspiring source channel. Our easy-to-use tool will fetch full-resolution banners instantly. Keep your website visitors hooked with eye-catching visuals!",
  channelinformation:
    "An in-depth competitor research is the first step to your YouTube channel's success. Our channel information extractor will give you all the juicy info in one place. Use this data to analyze trends and improve your own content strategy.",
  captions:
    "Feeling trapped within language barriers? Well, our platform lets you download subtitles of any video easily. You can paste them to a translator to view the content in your local language.",
};

const FEATURES = [
  {
    header: "High-Quality",
    desc: "Quality matters a lot on YouTube. The algorithm usually does not promote low-resolution thumbnails or poorly formatted captions. Thats why we prioritize delivering high-quality outputs every time. Our system is designed to fetch you the highest resolution available.",
  },
  {
    header: "User-Friendly Interface",
    desc: "We have created the platforms specifically for beginners who are struggling to edit logos and thumbnails. Just paste a URL and click - that's literally it! You will have a straightforward experience that gets you the results you want, fast and hassle-free.",
  },
  {
    header: "Fast Processing",
    desc: "As soon as you hit the download button, we will fetch the details from the channel and display them in the best quality- all within seconds. Our lightning-fast automated system processes your order within seconds. Paste, download, done - it's that quick!",
  },
  {
    header: "Reliable Results",
    desc: "We understand that you need accurate data at each stage of the content creation process, right from brainstorming to keyword inclusion. As a trusted platform, we only provide accurate results every single time. We regularly update our systems to avoid any issues like broken downloads, missing information, etc.",
  },
  {
    header: "No Signups",
    desc: "Life's too short for another password! So, we have made our platform instantly accessible to anyone without wasting time on account creation. Just visit our site and start downloading - it's that easy.",
  },
];

const FAQS = [
  {
    question: "How much does it cost to use your services?",
    answer: "All our tools are absolutely free.",
  },
  {
    question: "What's the highest quality I can download?",
    answer:
      "We always try to give you the best quality, depending on the available quality. For thumbnails, that's usually 1280x720 pixels.",
  },
  {
    question: "Can I use the downloaded content for my own videos or projects? ",
    answer:
      "Even though it is possible to download the assets from other channels, you are required to abide by YouTube copyright policies. The downloaded content should be just an inspiration. Proper editing must be done to use it for commercial purposes.",
  },
  {
    question: "Can I use your service on my phone or tablet?",
    answer:
      "Yes, of course. Our interface is mobile-optimized. It works like a charm on most devices, so you can manage your YouTube content on the go without any issues.",
  },
  {
    question: "Do you store or keep any of the downloaded content?",
    answer: "No. We do not keep the downloaded assets on our devices.",
  },
  {
    question: "Where can I find more free YouTube tools?",
    answer: (
      <>
        Our website specializes in tools designed specifically for downloading YouTube content. If you&apos;re interested in
        additional tools, such as those for YouTube SEO and analytics, we recommend exploring{" "}
        <a href="https://www.lenostube.com/en/all-tools/" target="_blank" rel="noopener noreferrer">
          these free options.
        </a>
      </>
    ),
  },
];

export default function Home() {
  return (
    <>
      <section id="workspace" className="mx-auto max-w-workspace scroll-mt-20 px-4 pt-10 sm:px-6 sm:pt-16">
        <div className="grid items-end gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          <div>
            <h1 className="wide text-balance text-[clamp(2.4rem,1.5rem+3.6vw,4.5rem)] font-bold leading-[0.98] tracking-[-0.03em]">
              YouTube Content Success Made Easy
            </h1>
            <p className="mt-6 max-w-[46ch] text-[clamp(1.05rem,0.98rem+0.3vw,1.2rem)] leading-relaxed text-bay-muted">
              Get quick and easy access to all important YouTube resources like thumbnails, logos, banners, and captions.
              Download everything you need in seconds!
            </p>
          </div>
          <HomeLauncher />
        </div>
      </section>

      <section className="mx-auto max-w-workspace px-4 pt-20 sm:px-6 sm:pt-24">
        <div className="bay-prose border-t border-bay-line pt-10">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
            <h2>All-in-One YouTube Toolkit</h2>
            <p>Stop switching between tabs on multiple websites. Download all YouTube assets from one place—free and user-friendly!</p>
          </div>
        </div>
        <ul className="mt-10 grid gap-px overflow-hidden rounded-[6px] border border-bay-line bg-bay-line sm:grid-cols-2 lg:grid-cols-5">
          {TOOLS.map((tool) => (
            <li key={tool.id} className="bg-bay-panel">
              <Link
                href={tool.path}
                className="group flex h-full flex-col gap-4 p-4 transition-colors duration-150 hover:bg-bay-raised focus-visible:outline-offset-[-2px]"
              >
                <ToolPreview tool={tool} />
                <div>
                  <h3 className="flex items-center gap-2 text-[17px] font-semibold text-bay-text">
                    <ToolIcon toolId={tool.id} size={20} className="shrink-0" style={{ color: tool.label }} />
                    {tool.tileTitle}
                  </h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-bay-muted">{TOOL_DESCRIPTIONS[tool.id]}</p>
                </div>
                <span className="mt-auto inline-flex items-center gap-2 text-[14px] font-semibold text-bay-text">
                  Read more
                  <IconArrowRight className="transition-transform duration-200 group-hover:translate-x-1" style={{ color: tool.label }} />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <Section
        art={<ToolkitArt />}
        title={
          <>
            <h2>Why Choose Us?</h2>
            <p className="mt-4">
              Nowadays, a lot of platforms offer various types of YouTube-related services. Check out how we stand out from
              other platforms.
            </p>
          </>
        }
      >
        <ItemList items={FEATURES} />
      </Section>

      <Faq items={FAQS} />

      <Closing
        heading="Break Free from YouTube Limitations!"
        text="No more sign-ups or hassle. Start using our easy-to-use tools now to give a quick boost to your channel. Download high-quality thumbnails, banners, logos, and captions in seconds!"
        art={<TakeOutArt />}
      />
    </>
  );
}
