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
          Our YouTube logo downloader is packed with a set of cool features to
          make it easy for you to access your favorite logos. Here a quick look
          at what makes our tool stand out:
        </p>
      ),
      imgLink: "./logo.png",
    },
  ];
  const Featuress = [
    {
      header: "Instant Downloads",
      desc: "Our tool works quickly right from the moment when you hit the download button. It requests the YouTube server and fetches the logo within a flash.",
    },
    {
      header: "High-Quality Logos",
      desc: (
        <>
          High-Quality Logos A logo is the face of your channel, so quality
          obviously matters. That&apos;s why we have designed the system to
          extract logos at the best available quality as per
          {"  "}
          <a
            href="https://support.google.com/youtube/answer/1722171"
            target="_blank"
            rel="noopener noreferrer"
           
          >
            YouTube guidelines.
          </a>
          {"  "}
          You don&apos;t need to run behind any third-party tools to refine the
          image quality.
        </>
      ),
    },
    {
      header: "Guaranteed Safety",
      desc: "All your downloads are safe and protected. No worries about viruses or unwanted files—just the logo you need.",
    },
    {
      header: "Completely Free To Use",
      desc: "Our YouTube logo downloader is completely free to use. You can download as many logos as you like without any restrictions. You need not even enter your details to get started.",
    },
    {
      header: "Supports All Public Channels",
      desc: (
        <>
          No matter what type of logo you need, you can use our tool. We can
          extract resources like
          {"  "}
          <a
            href="https://youtubedownload.org/banner"
            target="_blank"
            rel="noopener noreferrer"
           
          >
            Banner
          </a>
          {"  "}
          and {"  "}
          <a
            href="https://youtubedownload.org/logo"
            target="_blank"
            rel="noopener noreferrer"
           
          >
            logos
          </a>
          {"  "}
          from any public channel with just a link.
        </>
      ),
    },
  ];
  const FAQ = [
    {
      question: "Can I use downloaded logos for my own projects?",
      answer: (
        <>
          You can use downloaded logos for personal projects. However, it is
          better to ask for permission if you plan to use them for commercial
          purposes or in any way that results in
          {"  "}
          <a
            href="https://www.youtube.com/creators/how-things-work/policies-guidelines/"
            target="_blank"
            rel="noopener noreferrer"
           
          >
            copyright infringement.
          </a>
          {"  "}
        </>
      ),
    },
    {
      question: "What if I didnt get the logo I wanted?",
      answer:
        "In that case, make sure you have entered the correct channel URL. If its still not available, it may be because the channel has not made its logo public.",
    },
    {
      question: "How often is the tool updated to reflect changes on YouTube?",
      answer:
        "We regularly update our system to ensure compatibility with YouTubes improvements. That means you can rely on it to work smoothly whenever you need it.",
    },
    {
      question: "What is the quality of the logos from your tool?",
      answer:
        "You can obtain logos in high quality from the YouTube Logo Downloader. The tool is designed to fetch the highest resolution logo available for each channel.",
    },
  ];
  const CtaData = [
    {
      header: "Get Your YouTube Channel Logo Today—It’s Free!",
      desc: "Stop wasting time searching for the perfect YouTube logo. With our free downloader, you can get the official logo in seconds—high-quality, safe, and ready to use. Never delay your logo branding for tomorrow. Do it now for free with us!",
    },
  ];
  const serviceHeader = [
    {
      header: (
        <h2>
          About OurYouTube Logo
          Downloader?
        </h2>
      ),
      desc: (
        <p>
          A YouTube Logo Downloader is an online tool that lets you easily
          download the logo of any YouTube channel. You can customize them to
          create your own channel logo without breaking any copyright laws.
        </p>
      ),
    },
  ];
  const serviceHeader2 = [
    {
      title: (
        <h2>
          Who Can Use a YouTube Logo
          Downloader?
        </h2>
      ),
      desc: (
        <p>
          Our YouTube Logo Downloader is perfect for anyone who needs YouTube
          logos in no time! Lets take a look at who can benefit from it:
        </p>
      ),
      imgLink: "./Thumbnail.png",
    },
  ];
  const serviceData = [
    {
      header: "Beginners",
      desc: "The beginning phase of YouTube content creation is really challenging. You need to do everything, from competitor research to branding. Luckily, our tool will simplify the logo creation process. You can find inspiration by downloading logos from successful channels. Use these logos to understand branding and create your own unique style!",
    },
    {
      header: "Fans",
      desc: "Are you a fan of a particular YouTuber? Our downloader tool lets you grab their logo for personal use, like creating fan art or even making your profile picture.",
    },
    {
      header: "Graphic Designers",
      desc: "Our tools are not just for beginners. Even expert designers working on branding projects can download resources from our tool to use them as an inspiration or even incorporate them into your designs.",
    },
    {
      header: "Social Media Managers",
      desc: "Social media managers handling multiple clients may have several confusions. For them, access to all client logos is a must. Thats where our YouTube Logo Downloader tool comes in.",
    },
  ];
  const UseHeader = [
    {
      title: (
        <h2>
          How To Use The YouTube Logo
          Downloader?
        </h2>
      ),
      desc: (
        <p>
          Check out the steps to use our YouTube Logo Downloader tool:
        </p>
      ),
      imgLink: "./logo.png",
    },
  ];
  const UseData = [
    {
      header: "Find Your Favourite Channel",
      data: "Start by going to YouTube and searching for the channel whose logo you want to download. Click the channel and copy its link.",
    },
    {
      header: "Visit The Website",
      data: "Visit our official website and click on the Logo option.",
    },
    {
      header: "Paste The URL",
      data: "In the downloader tool, you all see a text box waiting for your input. Click inside it and paste the channel URL you copied earlier.",
    },
    {
      header: "Download",
      data: "Click on the Logo button to extract it. Within seconds, you will see the logo that you have requested. Now, just download it!",
    },
  ];
  const HeroText = [
    {
      title: <h2>LOGO</h2>,
      desc: (
        <p>
          Looking for a professional logo for your YouTube channel? Our YouTube
          Logo Downloader makes it super easy to grab high-quality logos with
          just a click. Just surf through YouTube to find the perfect
          inspiration and paste its link to our tool. Thats all! You will get
          the logo right into your device for customization.
        </p>
      ),
    },
  ];
  return (
    <ToolPage
      toolId="logo"
      title="YouTube Logo Downloader"
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
