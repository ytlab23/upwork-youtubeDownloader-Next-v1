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
        "https://upwork-youtube-downloader-nodejs-v1.vercel.app/api/get-assets",
        { url }
      );
      setAssets(response.data);
      setError("");
    } catch (err) {
      setError("Error fetching data. Please check the URL and try again.");
    }
  };

  const handleDownloadJSON = async () => {
    try {
      const response = await axios.post(
        "https://upwork-youtube-downloader-nodejs-v1.vercel.app/api/download-assets",
        { url, type: "json", content: "channelInfo" }, // Correct content type and type parameter
        {
          responseType: "blob", // Important for downloading files
        }
      );

      const blob = new Blob([response.data], { type: "application/json" }); // Correct MIME type for JSON
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = "channelInfo.json"; // Name of the JSON file
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      setError("Error downloading JSON. Please try again.");
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
          Get everything you need to know about any YouTube channel. Check out
          the main features that make our tool smarter than others.
        </p>
      ),
      imgLink: "./Thumbnail.png",
    },
  ];
  const Featuress = [
    {
      header: "Instant Channel Insights",
      desc: "Just paste the link of any YouTube channel and boom—you all get all the data in seconds! You need not go through any complicated set of steps like account creation.",
    },
    {
      header: "SEO Data",
      desc: "YouTube SEO is something thats not familiar to even the most established content creators. Our tool makes this easy by giving you access to the meta title and description of any channel. You can refer to the metadata of successful channels and analyze the patterns to create your own.",
    },
    {
      header: "Simple & User-Friendly Interface",
      desc: "There are no complicated charts or steps to confuse you. Our tool was created mainly for beginners who need to focus on insights quickly.",
    },
    {
      header: "Download as JSON",
      desc: "You can download the channel information data as simple, human-readable JSON files. As a result, the file will be smaller in size than other formats like CSV or XML.",
    },
    {
      header: "Real-Time Analysis",
      desc: "YouTube downloader always fetches the latest information from YouTube. Thus, you can always plan content based on current data stats and trends.",
    },
    {
      header: "Location Information",
      desc: "Our YouTube Channel Information downloaders let you see even the geographical location of the channel. You can use this information to see where your target audience is mainly located.",
    },
  ];
  const FAQ = [
    {
      question: "Can I use the extracted data for commercial purposes?",
      answer:
        "Yes, you can use the extracted data for marketing purposes on your own channel. Copyright policies only restrict the usage of content by another channel.",
    },
    {
      question: "Can I save my extracted data for future use?",
      answer:
        "Yes, you can download the data as a JSON file. This way, you can save it on your computer and refer back to it whenever you need.",
    },
    {
      question:
        "Will the channel owner get notified when I extract the information?",
      answer:
        "No. Our tool simply requests YouTube servers for publicly available data without alerting anyone.",
    },
    {
      question: "Can I extract data from multiple channels at once?",
      answer:
        "No. Our tool can process only one channel URL at a time. However, you can use the tool without any restrictions and collect data from multiple channels with several runs.",
    },
  ];
  const CtaData = [
    {
      header: "Get the Inside Scoop on Any Channel!",
      desc: "View the key details, like meta title, description, founding year, etc., of your role model YouTuber in just a split second. Then, use the data insights to fine-tune your SEO and content strategies. Start exploring now!",
    },
  ];
  const serviceHeader = [
    {
      header: (
        <h2 className="my-8 text-2xl font-bold text-gray-700 md:text-4xl">
          What is a <span className="text-red-600">You</span>Tube Information
          Downloader?
        </h2>
      ),
      desc: (
        <p className="text-gray-600">
          A YouTube Channel Information downloader is a specialized tool that
          gathers and extracts detailed information about a YouTube channel from
          a URL. It is mainly used by content creators to understand their
          competition and identify the trends.
        </p>
      ),
    },
  ];
  const serviceHeader2 = [
    {
      title: (
        <h2 className="text-3xl font-bold sm:text-4xl">
          Best Practices for Using Channel Information Data
        </h2>
      ),
      desc: (
        <p className="mt-4 text-gray-600">
          You might be thinking about how would random channel data help your
          content creation process. Well, heres how successful YouTubers use
          such data effectively:
        </p>
      ),
      imgLink: "./Thumbnail.png",
    },
  ];
  const serviceData = [
    {
      header: "Optimize For SEO",
      desc: "Use the meta description and title data to understand how successful YouTube channels rank in search results. Study their high-ranking keywords closely. Then, apply similar strategies to improve your own video for better visibility.",
    },
    {
      header: "Plan Your Channel Growth",
      desc: "With our tool, you can know the year in which a channel has started. This way, you can set realistic expectations at each content creation stage. You can also compare your channel’s age with others to evaluate your progress and when you can reach monetization.",
    },
    {
      header: "Analyze Channel Titles",
      desc: "Have a look at the titles of successful channels in your niche. Identify common keywords in the top channels and videos that attract viewers. Try to incorporate such words to create catchy titles for your own videos.",
    },
    {
      header: "Create Location-Specific Content",
      desc: "Our tool lets you view the country of a YouTube channel. That means you can sort out channels from your own country and learn how they engage your target audience.",
    },
  ];
  const UseHeader = [
    {
      title: (
        <h2 className="my-8 text-2xl font-bold text-blace md:text-4xl">
          How To Use The <span className="text-red-600">You</span>Tube Channel
          Information Downloader?
        </h2>
      ),
      desc: (
        <p className="text-black">
          Check out the steps to follow to extract a channel’s information from
          our tool:
        </p>
      ),
      imgLink: "./chinfo.png",
    },
  ];
  const UseData = [
    {
      header: "Copy Channel URL",
      data: "First of all, go through YouTube and pick a top channel in your niche that you can use as an inspiration. Copy the channel URL.",
    },
    {
      header: "Paste The URL",
      data: "Open the YT channel information downloader tool from our website and paste the link of the channel to the text box.",
    },
    {
      header: "View & Download",
      data: "Within seconds, crucial channel information, such as the meta description, title, year of starting, location, etc., will be displayed. You can download them as JSON files for future reference.",
    },
  ];
  const HeroText = [
    {
      title: (
        <h2 className="text-2xl font-semibold text-red-600">
          CHANNEL INFORMATION
        </h2>
      ),
      desc: (
        <p className="mt-4 text-gray-800">
          Ever noticed that shiny golden play button on YouTubers profiles?
          Well, its no coincidence. It took them years of competitor and niche
          research to get there. But what if you can do the same within a couple
          of seconds? Thats exactly what our Channel Information Extractor does:
          it gives you the data to grow smarter and faster!
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
              <span className="text-red-600">You</span>Tube Asset Downloader
            </h1>

            <p className="mt-6 text-gray-500">
              Enter the URL of a YouTube video to download
              <span className="text-black font-bold">
                {" "}
                Channel Information{" "}
              </span>
            </p>

            <div className="w-full max-w-sm mx-auto mt-6 bg-transparent border rounded-full focus-within:border-blue-400 focus-within:ring focus-within:ring-blue-300 focus-within:ring-opacity-40">
              <form className="flex flex-col md:flex-row items-center">
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
                  className="h-10 px-4 py-2 m-1 text-white transition-colors duration-300 transform bg-red-600 rounded-full hover:bg-red-400 focus:outline-none focus:bg-red-400 whitespace-nowrap"
                >
                  Channel Info
                </button>
              </form>
            </div>
            <TextinHero data={HeroText} />
            {error && <p className="mt-4 text-red-500">{error}</p>}

            {assets && (
              <div className="mt-8 text-left">
                <h2 className="text-2xl font-semibold text-gray-800 mt-6">
                  Channel Information
                </h2>
                <pre className="mt-2 bg-gray-100 p-4 rounded-lg text-sm text-gray-700 overflow-x-auto">
                  {JSON.stringify(assets.channelInfo, null, 2)}
                </pre>
                <button
                  onClick={handleDownloadJSON}
                  className="mt-4 px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-400 focus:outline-none"
                >
                  Download as Json
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
