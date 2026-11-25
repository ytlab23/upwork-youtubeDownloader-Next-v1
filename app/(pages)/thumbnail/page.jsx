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
          Check out the amazing features that make our YouTube thumbnail
          downloader easy to use:
        </p>
      ),
      imgLink: "./Thumbnail.png",
    },
  ];
  const Featuress = [
    {
      header: "Quick and Easy Download",
      desc: "Just paste the YouTube video link, and within seconds, you’ll have the thumbnail ready to download. No complicated steps are involved.",
    },

    {
      header: "High-Quality Thumbnails",
      desc: (
        <>
          {" "}
          <a
            href="https://support.google.com/youtube/answer/72431?hl=en"
            target="_blank"
            rel="noopener noreferrer"
           
          >
            Thumbnail
          </a>{" "}
          quality is obviously one of the main ranking factors of a YouTube
          video. Thats why we have designed our system to deliver original
          thumbnails from any video in the highest quality available.
        </>
      ),
    },
    {
      header: "No Software Installation",
      desc: "Our thumbnail downloader is straightforward. Access everything directly from your browser without any software or plug-in installation. You need not even sign up to the tool.",
    },
    {
      header: "Compatible With All Devices",
      desc: (
        <>
          Our platform runs like a charm across all devices. The interface is
          specifically optimized for both desktops and smartphones so that you
          can download resources like{" "}
          <a
            href="https://youtubedownload.org/logo"
            target="_blank"
            rel="noopener noreferrer"
           
          >
            YT channel logos
          </a>{" "}
          banners, thumbnails, etc., from anywhere.
        </>
      ),
    },
    {
      header: "100% Free",
      desc: "The best part about our YouTube Thumbnail downloader is that you need not wait for any daily quotas to get filled up. You can download unlimited thumbnails without even spending a single penny.",
    },
    {
      header: "Safe And Secure",
      desc: "As there is no need for account creation or installations, you need not worry about any safety issues. Plus, we won’t store your input data or the extracted thumbnails in our servers. They are automatically deleted regularly.",
    },
  ];
  const FAQ = [
    {
      question: "Can I download thumbnails from private videos?",
      answer:
        "No, you cannot download thumbnails from private videos. The downloader only works with public videos that everyone can see.",
    },
    {
      question: "Is it safe to use a YouTube Thumbnail Downloader?",
      answer:
        "It depends on how you use the downloaded thumbnails. If you use them responsibly just as an inspiration to create your own thumbnails, it is safe. But if you are trying to copy thumbnails from others, you may face strict penalties for breaking copyright policies.",
    },
    {
      question: "How does your YouTube Thumbnail Downloader work?",
      answer:
        "As soon as you paste the YouTube video link into our tool, it sends a request to YouTubes servers to access the video data. It then extracts the thumbnail images associated with that video and displays them on your screen. You can simply download it from the tool now. Don't worry; the entire process takes only seconds to finish.",
    },
    {
      question:
        "Does the channel owner get notified when I download the thumbnail?",
      answer:
        "No. No one can see who downloaded their thumbnails using our tool. We keep all our user data safe and delete them automatically to prevent leaks.",
    },
  ];
  const CtaData = [
    {
      header: " Download Your Favorite Thumbnails with Just One Click",
      desc: "Struggling to create eye-catching thumbnails for your videos? With just one click, you can download high-quality thumbnails from any video.",
    },
  ];
  const serviceHeader = [
    {
      header: (
        <h2>
          About Our YouTube Thumbnail
          Downloader?
        </h2>
      ),
      desc: (
        <p>
          YouTube Thumbnail Downloader is a free online tool designed to help
          users download thumbnail images from YouTube videos. Just paste the
          link, and you&apos;re good to go!
        </p>
      ),
    },
  ];

  const serviceHeader2 = [
    {
      title: (
        <h2>
          Why You Need Our YouTube
          Thumbnail Downloader?
        </h2>
      ),
      desc: (
        <p>
          Designing a YouTube thumbnail from scratch is challenging, especially
          if you are new to it. You need some professional inspiration to get
          started. Thats where our tool comes in. You can download as many
          professional-looking YT thumbnails as you like. Check out how it helps
          YouTubers like you:
        </p>
      ),
      imgLink: "./Thumbnail.png",
    },
  ];
  const serviceData = [
    {
      header: "Saves Time",
      desc: "In case you are not familiar with design tools, the thumbnail creation process can take up hours. With our downloader, you can skip the hassle. Simply download the thumbnail from any video and customize it as you like from any software tool you like—no need to start over!",
    },
    {
      header: "Inspires Creative Ideas",
      desc: "Not sure how to design your thumbnail? Our tool helps you collect thumbnails from popular videos of your niche. You can use them as inspiration for your own work.",
    },
    {
      header: "Improves Video Performance",
      desc: "An eye-catching thumbnail captures the attention of users and results in more clicks. Our tool lets you use professional-looking thumbnails from your competitors to improve your videos performance.",
    },
    {
      header: "Trend Analysis",
      desc: (
        <>
          You can collect YouTube thumbnails from all your competitors to
          analyze what works for your audience.{" "}
          <a
            href="https://support.google.com/youtube/answer/13861714?hl=en&ref_topic=9257785&sjid=3568816026513773970-AP"
            target="_blank"
            rel="noopener noreferrer"
           
          >
            Compare the thumbnails
          </a>{" "}
          of the top-performing videos. Do they have any recurring patterns like
          color or layout? Use these insights to create your own engaging
          thumbnails that draw viewers in.
        </>
      ),
    },
  ];
  const UseHeader = [
    {
      title: (
        <h2>
          How To Use The YouTube Thumbnail
          Downloader?
        </h2>
      ),
      desc: (
        <p>
          Our YouTube Thumbnail downloader is a simple and straightforward tool
          so that even a beginner can get used to it without any learning
          curves. Here are some steps to follow:
        </p>
      ),
      imgLink: "./Thumbnail.png",
    },
  ];
  const UseData = [
    {
      header: "Copy the Video Link:",
      data: "First of all, scroll through the YouTube feed to find the perfect inspiration for your thumbnail. Once you have found one, copy its video URL.",
    },
    {
      header: "Paste the Link:",
      data: " Go to our YouTube Downloader website and select the thumbnail option. There will be a text box where you can paste the copied video link.",
    },
    {
      header: "Click The Download:",
      data: "After pasting the link, the thumbnail will be displayed. Check whether it's the correct one and click on the Download button. The file gets downloaded within seconds!",
    },
  ];
  const HeroText = [
    {
      title: <h2>THUMBNAIL</h2>,
      desc: (
        <p>
          Want a perfect thumbnail for your YouTube channel? Our YouTube
          thumbnail downloader makes it easy for you. With just a few clicks,
          you can grab high-quality thumbnails from any video in seconds. Simply
          paste the link and edit the downloaded asset to create your own custom
          thumbnail quickly. So, why settle with low-resolution or screenshot
          images?
        </p>
      ),
    },
  ];
  return (
    <ToolPage
      toolId="thumbnail"
      title="YouTube Thumbnail Downloader"
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
