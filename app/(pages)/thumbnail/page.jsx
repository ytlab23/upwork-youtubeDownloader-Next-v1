"use client";
import { useState } from "react";
import Link from "next/link";
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
        { url, content: "thumbnail" }
      );
      setAssets(response.data);
      setError("");
    } catch (err) {
      console.error("Error fetching assets:", err);

      // Handle errors based on the type
      if (err.response) {
        // Server responded with an error status
        setError(
          err.response.data.error ||
            "Error fetching data. The server returned an unexpected response. Please try again later."
        );
      } else if (err.request) {
        // Request was made but no response received
        setError(
          "Error fetching data. No response received from the server. Please check your internet connection and try again."
        );
      } else {
        // Other unexpected errors
        setError("Error fetching data. Please check the URL and try again.");
      }
    }
  };

  const handleDownload = async (type) => {
    try {
      const response = await axios.post(
        "/api/download-assets",
        { url, type: "image", content: "thumbnail" },
        { responseType: "blob" }
      );

      const blob = new Blob([response.data], {
        type: response.headers["content-type"],
      });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = type === "pdf" ? "transcript.pdf" : "thumbnail.jpg";
      link.click();
    } catch (err) {
      console.error(`Error downloading ${type}:`, err.message);
      setError(`Error downloading ${type}`);
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
            className="underline text-red-600 hover:text-red-800"
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
            className="underline text-red-600 hover:text-red-800"
          >
            YT channel logos
          </a>{" "}
          banners, thumbnails, etc., from anywhere.
        </>
      ),
    },
    {
      header: "100% Free",
      desc: "The best part about our YouTube Thumbnail downloader is that you need not wait for any daily quotas to get filled up. You can download unlimited thumbnails without even spending a single penny. And we don’t monetize the platform in any ways like data acquiring, ads, etc.",
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
        <h2 className="mt-0 mb-8 text-2xl font-bold text-gray-700 text-left md:text-4xl md:mb-6">
          About Our <span className="text-red-600">You</span>Tube Thumbnail
          Downloader?
        </h2>
      ),
      desc: (
        <p className="text-gray-600 text-sm md:text-base md:pl-5">
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
        <h2 className="text-3xl font-bold sm:text-4xl">
          Why You Need Our <span className="text-red-600">You</span>Tube
          Thumbnail Downloader?
        </h2>
      ),
      desc: (
        <p className="mt-4 text-gray-600">
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
            className="underline text-red-600 hover:text-red-800"
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
        <h2 className="my-8 text-2xl font-bold text-blace md:text-4xl">
          How To Use The <span className="text-red-600">You</span>Tube Thumbnail
          Downloader?
        </h2>
      ),
      desc: (
        <p className="text-black">
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
      title: <h2 className="text-2xl font-semibold text-red-600">THUMBNAIL</h2>,
      desc: (
        <p className="mt-4 text-gray-800">
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
    <div className="flex flex-col items-center min-h-screen bg-white">
      <section className="bg-white rounded-2xl shadow-2xl w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto mt-44 mb-44">
        <div className="px-6 py-10 sm:py-12 md:py-16 text-center">
          <div className="max-w-lg mx-auto">
            <h1 className="text-3xl font-semibold text-gray-800 lg:text-4xl">
              <span className="text-red-600">You</span>Tube Thumbnail Downloader
            </h1>

            <p className="mt-6 text-gray-500">
              Enter the URL of a YouTube video to download{" "}
              <span className="text-black font-bold">Thumbnail</span>
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
                  Thumbnail
                </button>
              </form>
            </div>
            {error && <p className="mt-4 text-red-500">{error}</p>}
            <TextinHero data={HeroText} />

            {assets && (
              <div className="mt-8 text-left">
                <h2 className="text-2xl font-semibold text-gray-800">
                  Thumbnail
                </h2>
                <img
                  src={assets.thumbnail}
                  alt="Thumbnail"
                  className="mt-2 rounded-lg"
                />
                <button
                  onClick={() => handleDownload("image")}
                  className="mt-4 px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-400"
                >
                  Download Thumbnail
                </button>
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
