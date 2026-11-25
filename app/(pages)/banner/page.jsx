"use client";
import React from "react";
import ToolPage from "@/app/components/bay/ToolPage";

export default function Page() {
  const FeaturesHeader = [
    {
      title: (
        <h2>
          Main Features
        </h2>
      ),
      desc: (
        <p>
          Check out the main features that make our YouTube banner downloader
          easy and stress-free:
        </p>
      ),
      imgLink: "./Thumbnail.png",
    },
  ];
  const Featuress = [
    {
      header: "User-Friendly Interface",
      desc: "Our interface is made specifically for those who dont have a pretty good idea on designing a professional YouTube banner. Even if you are not tech-savvy, you all find it incredibly easy to use.",
    },
    {
      header: "Preview Feature",
      desc: "A simple glance at the small image in the YouTube channel might not give you a proper idea on how it looks. Thats why we have added a unique feature to check the image quality and size, before saving it to your own device.",
    },
    {
      header: "Completely Free",
      desc: "Why pay for something when you can get it for free? Our YouTube banner downloader doesnt charge you a penny. Enjoy unlimited downloads with zero costs.",
    },
    {
      header: "Cross-Platform Compatible",
      desc: "You can use our YouTube downloader from any device or browser. The interface is optimized for all platforms.",
    },
    {
      header: "No Sign-Up Required",
      desc: (
        <>
          Worried about any sort of data leaks? Well, you need not share any
          {"  "}
          <a
            href="https://support.google.com/youtube/answer/2801895?hl=en"
            target="_blank"
            rel="noopener noreferrer"
           
          >
            personal information
          </a>
          {"  "}
          to create an account on our tool. Simply paste the link and download
          your favorite banner instantly.
        </>
      ),
    },
  ];
  const FAQ = [
    {
      question: "Can I edit the banner after downloading it?",
      answer:
        "Yes. After downloading the file, you can simply use any editing software to change the text, style, color, etc., of the image to customize it.",
    },
    {
      question: "Is there a limit to how many banners I can download?",
      answer:
        "No. You can download as many banners as you want without any restrictions. There are no daily restriction quotas.",
    },
    {
      question: "How do I know if a banner is high quality?",
      answer:
        "Our system usually fetches banners from the server at the highest available quality. You can check the preview to confirm whether the image is clear and sharp.",
    },
    {
      question: "Is it legal to download YouTube channel banners?",
      answer: (
        <>
          Yes, it is
          {"  "}
          <a
            href="https://support.google.com/youtube/answer/9783148?hl=en"
            target="_blank"
            rel="noopener noreferrer"
           
          >
            legal to download
          </a>
          {"  "}
          YouTube channel banners for collection or personal projects. However,
          using someone elses banner without permission for your own channel is
          a copyright violation.
        </>
      ),
    },
  ];
  const CtaData = [
    {
      header: "Download Your Perfect YouTube Banner Now!",
      desc: "A YouTube banner is one of the first things your new visitors notice. Yet many beginners compromise it with low-resolution screenshots, missing out on a professional look. As a result, the chances of new visitors scrolling through the channel are reduced.",
    },
  ];
  const serviceHeader = [
    {
      header: (
        <h2>
          About Our YouTube Banner
          Downloader?
        </h2>
      ),
      desc: (
        <p>
          As the name suggests, YouTube banner downloader is a tool that lets
          you download the banner or cover image of any specific YouTube
          channel. It can save you valuable time and effort in editing manually
          captured, low-quality screenshots.
        </p>
      ),
    },
  ];
  const serviceHeader2 = [
    {
      title: (
        <h2>
          Why You Need a Good YouTube
          Banner Downloader?
        </h2>
      ),
      desc: (
        <p>
          Your YouTube banner is one of the first things people notice when they
          visit your channel. It sets the tone for your content and gives
          viewers an idea of what to expect. Heres why having a great banner is
          key for growing your channel:
        </p>
      ),
      imgLink: "./Thumbnail.png",
    },
  ];
  const serviceData = [
    {
      header: "Show Your Personality",
      desc: "Your banner is a chance to express who you are. You can use it to convey the mood of your YouTube channel like fun, informative, artistic, etc.",
    },
    {
      header: "Sets Expectations",
      desc: (
        <>
          Images like
          {"  "}
          <a
            href="https://youtubedownload.org/banner"
            target="_blank"
            rel="noopener noreferrer"
           
          >
            banners
          </a>
          {"  "}
          and logos tell visitors what your channel is about at a glance. As a
          result, they will get an idea of what to expect from your channel.
          This way, you can target and drive the right audience to your channel.
        </>
      ),
    },
    {
      header: "Professional Look",
      desc: "Having a high-quality banner gives your channel a professional edge. It shows that you are serious about your content, which helps build trust and credibility with viewers.",
    },
    {
      header: "Create a First Impression",
      desc: "A well-designed banner can catch your viewers; attention instantly. It helps your channel stand out and hooks in new visitors to explore your content.",
    },
    {
      header: "Promote Your Social Media Links",
      desc: "You can include icons on the banner to encourage the viewers to interact with your content on different social media platforms. This is one of the best ways to get cross-channel traffic to your social media posts.",
    },
  ];
  const UseHeader = [
    {
      title: (
        <h2>
          How To Use The YouTube Banner
          Downloader?
        </h2>
      ),
      desc: (
        <p>
          Follow these simple steps to get your favorite YouTube banner in no
          time:
        </p>
      ),
      imgLink: "./banner.png",
    },
  ];
  const UseData = [
    {
      header: "Find Inspiration",
      data: "Open YouTube and search for channels in your niche to find the perfect inspiration. Then, copy the channel link.",
    },
    {
      header: "Paste The URL",
      data: "Visit our website and choose the banner option. Now, paste the channel URL into the text box. Click the button next to it.",
    },
    {
      header: "Download",
      data: "Soon, you will see a preview of the banner. If you are satisfied with the quality, you can go ahead and click the download button.",
    },
  ];
  const HeroText = [
    {
      title: <h2>BANNER</h2>,
      desc: (
        <p>
          Let us guess. You&apos;ve found an awesome YouTube channel with a
          stunning banner that caught your eye. But you are wondering how to
          download it without losing quality. Well, thats where our brand-new
          free YouTuber banner downloader comes in. With it, you can grab
          stunning banners from your favorite channels of the best quality.
        </p>
      ),
    },
  ];
  return (
    <ToolPage
      toolId="banner"
      title="YouTube Banner Downloader"
      intro={HeroText}
      about={serviceHeader}
      why={serviceHeader2}
      whyItems={serviceData}
      featuresHeader={FeaturesHeader}
      features={Featuress}
      useHeader={UseHeader}
      steps={UseData}
      cta={CtaData}
      faq={FAQ}
    />
  );
}
