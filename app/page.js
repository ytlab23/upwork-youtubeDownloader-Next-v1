import React from "react";
import Hero from "./components/Hero";
import Features1 from "./components/Features1";
import Services from "./components/Services";
import FAQ1 from "./components/FAQ1";
import CTA from "./components/CTA";
export default function Home() {
  const FeaturesHeader = [
    {
      title: (
        <h2 className="text-3xl font-bold sm:text-4xl">
          Why Choose <span className="text-red-600">Us</span>?
        </h2>
      ),
      desc: (
        <p className="mt-4 text-gray-600">
          Nowadays, a lot of platforms offer various types of YouTube-related
          services. Yet, millions of users prefer us, and thats not just a
          coincidence. Check out how we stand out from other platforms.
        </p>
      ),
      imgLink: "./Thumbnail.png",
    },
  ];
  const Featuress = [
    {
      header: "High-Quality",
      desc: "Quality matters a lot on YouTube. The algorithm usually does not promote low-resolution thumbnails or poorly formatted captions. Thats why we prioritize delivering high-quality outputs every time. Our system is designed to fetch you the highest resolution available.",
    },
    {
      header: "User-Friendly Interface",
      desc: "We have created the platforms specifically for beginners who are struggling to edit logos and thumbnails. Just paste a URL and click - that's literally it! The best part is that you do not need to struggle with annoying ads. You will have a straightforward experience that gets you the results you want, fast and hassle-free.",
    },
    {
      header: "Multilanguage Support",
      desc: "Our tools come with multilanguage support. So, you can access them anytime no matter where you're from. Just click and pick your local language!",
    },
    {
      header: "Fast Processing",
      desc: "As soon as you hit the download button, we will fetch the details from the channel and display them in the best quality- all within seconds. Our lightning-fast automated system processes your order within seconds. There will not be any video ads that will affect your loading speed. Paste, download, done - it's that quick!",
    },
    {
      header: "Reliable Results",
      desc: "We understand that you need accurate data at each stage of the content creation process, right from brainstorming to keyword inclusion. As a trusted platform with many years of experience, we only provide accurate results every single time. We regularly update our systems to avoid any issues like broken downloads, missing information, etc. ",
    },
    {
      header: "No Signups",
      desc: "Life's too short for another password! So, we have made our platform instantly accessible to anyone without wasting time on account creation. Just visit our site and start downloading - it's that easy. ",
    },
  ];
  const faqs = [
    {
      question: "How much does it cost to use your services?",
      answer:
        "All our tools are absolutely free. Also, we do not monetize the platform through any ads or data usage. ",
    },
    {
      question: "What's the highest quality I can download?",
      answer:
        "We always try to give you the best quality, depending on the available quality. For thumbnails, that's usually 1280x720 pixels. Channel banners come in at a crisp 2560x1440 pixels. Logos are typically 800x800 pixels. ",
    },
    {
      question:
        "Can I use the downloaded content for my own videos or projects? ",
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
      answer:
        "No. We comply with all data regulation policies and do not keep the downloaded assets on our devices.",
    },
    {
      question: "Where can I find  more free YouTube tools?",
      answer: (
        <>
          Our website specializes in tools designed specifically for downloading
          YouTube content. If you&apos;re interested in additional tools, such as
          those for YouTube SEO and analytics, we recommend exploring
          <a
            href="https://www.lenostube.com/en/all-tools/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-red-600 hover:text-red-800"
          >
            these free options.
          </a>
        </>
      ),
    },
  ];
  const CtaData = [
    {
      header: "  Break Free from YouTube Limitations!",
      desc: "  No more sign-ups or hassle. Start using our easy-to-use tools now to give a quick boost to your channel. Download high-quality thumbnails, banners, logos, and captions in seconds!",
    },
  ];
  return (
    <div>
      <Hero />
      <Services />
      <Features1 header={FeaturesHeader} data={Featuress} />
      <CTA data={CtaData} />
      <FAQ1 data={faqs} />
    </div>
  );
}
