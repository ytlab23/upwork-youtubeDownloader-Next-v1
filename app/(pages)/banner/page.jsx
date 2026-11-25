"use client";
import { useState } from "react";
import axios from "axios";
import React from "react";
import Features1 from "@/app/components/Features1";
import FAQ1 from "@/app/components/FAQ1";
import CTA from "@/app/components/CTA";
import Services from "@/app/components/Services1";
import Use from "@/app/components/Use";
import TextinHero from "@/app/components/TextinHero";

export default function Page() {
  const [url, setUrl] = useState("");
  const [assets, setAssets] = useState(null);
  const [error, setError] = useState("");

  const handleFetchAssets = async () => {
    try {
      const response = await axios.post(
        "/api/get-assets",
        { url, content: "banner" }
      );
      setAssets(response.data);
      setError("");
    } catch (err) {
      console.error("Error fetching assets:", err);

      if (err.response) {
        // Server responded with an error status
        setError(
          err.response.data.error ||
            "A server error occurred. Please try again later."
        );
      } else if (err.request) {
        // Request was made but no response received
        setError(
          "No response received from the server. Please check your internet connection and try again."
        );
      } else {
        // Other unexpected errors
        setError(
          "An unexpected error occurred. Please ensure the URL is correct and try again."
        );
      }
    }
  };

  const handleDownloadImage = async (imageUrl, fileName) => {
    try {
      const response = await axios.get(imageUrl, {
        responseType: "blob",
      });

      const blob = new Blob([response.data], { type: response.data.type });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = fileName;
      link.style.display = "none";
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      setError("Error downloading image");
    }
  };

  const FeaturesHeader = [
    {
      title: (
        <h2 className="text-3xl font-bold sm:text-4xl">
          Main <span className="text-red-600">Features</span>
        </h2>
      ),
      desc: (
        <p className="mt-4 text-gray-600">
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
            className="underline text-red-600 hover:text-red-800"
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
            className="underline text-red-600 hover:text-red-800"
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
        <h2 className="mt-0 mb-8 text-2xl font-bold text-gray-700 text-left md:text-4xl md:mb-6">
          About Our <span className="text-red-600">You</span>Tube Banner
          Downloader?
        </h2>
      ),
      desc: (
        <p className="text-gray-600 text-sm md:text-base md:pl-5">
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
        <h2 className="text-3xl font-bold sm:text-4xl">
          Why You Need a Good <span className="text-red-600">You</span>Tube
          Banner Downloader?
        </h2>
      ),
      desc: (
        <p className="mt-4 text-gray-600">
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
            className="underline text-red-600 hover:text-red-800"
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
        <h2 className="my-8 text-2xl font-bold text-blace md:text-4xl">
          How To Use The <span className="text-red-600">You</span>Tube Banner
          Downloader?
        </h2>
      ),
      desc: (
        <p className="text-black">
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
      title: <h2 className="text-2xl font-semibold text-red-600">BANNER</h2>,
      desc: (
        <p className="mt-4 text-gray-800">
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
    <div className="flex flex-col items-center min-h-screen bg-white">
      <section className="bg-white rounded-2xl shadow-2xl w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto mt-44 mb-44">
        <div className="px-6 py-10 sm:py-12 md:py-16 text-center">
          <div className="max-w-lg mx-auto">
            <h1 className="text-3xl font-semibold text-gray-800 lg:text-4xl">
              <span className="text-red-600">You</span>Tube Banner Downloader
            </h1>

            <p className="mt-6 text-gray-500">
              Enter the URL of a YouTube video to download{" "}
              <span className="text-black font-bold">Banner</span>
            </p>

            <div className="w-full max-w-sm mx-auto mt-6 bg-transparent border rounded-full focus-within:border-blue-400 focus-within:ring focus-within:ring-blue-300 focus-within:ring-opacity-40">
              <form className="flex flex-col md:flex-row">
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Enter YouTube video URL"
                  className="flex-1 h-10 px-4 py-2 m-1 text-gray-700 placeholder-gray-400 bg-transparent border-none appearance-none focus:outline-none focus:placeholder-transparent focus:ring-0"
                />
                <button
                  type="button"
                  onClick={handleFetchAssets}
                  className="h-10 px-4 py-2 m-1 text-white transition-colors duration-300 transform bg-red-600 rounded-full hover:bg-red-400 focus:outline-none focus:bg-red-400"
                >
                  Banner
                </button>
              </form>
            </div>
            {error && <p className="mt-4 text-red-500">{error}</p>}
            <TextinHero data={HeroText} />

            {assets && (
              <div className="mt-8 text-left">
                <h2 className="text-2xl font-semibold text-gray-800 mt-6">
                  Banner
                </h2>
                <div className="relative">
                  <img
                    src={assets.banner}
                    alt="Channel Art"
                    className="mt-2 rounded-lg"
                  />
                  <button
                    onClick={() =>
                      handleDownloadImage(assets.banner, "channel-banner.jpg")
                    }
                    className="absolute bottom-2 right-2 px-4 py-2 text-white bg-purple-500 rounded-lg hover:bg-purple-400 focus:outline-none"
                  >
                    Download Banner
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      <div className="container mx-auto px-4 mt-10">
        {/* Services Section */}
        <Services
          header={serviceHeader}
          data={serviceData}
          header2={serviceHeader2}
        />
        {/* Features Section */}
        <Features1 header={FeaturesHeader} data={Featuress} />
        {/* How to Use Section */}
        <Use header={UseHeader} data={UseData} />
        {/* CTA Section */}
        <CTA data={CtaData} />
        {/* FAQs Section */}
        <FAQ1 data={FAQ} />
      </div>
    </div>
  );
}
