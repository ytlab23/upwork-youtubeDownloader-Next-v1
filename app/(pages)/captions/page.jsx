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
  const [language, setLanguage] = useState("en");
  const [translatedTranscript, setTranslatedTranscript] = useState(null);

  const handleFetchAssets = async () => {
    try {
      const response = await axios.post(
        "https://upwork-yoububee-downolader-nodejs-v1.vercel.app/api/get-assets",
        { url }
      );
      setAssets(response.data);
      setError("");
      setTranslatedTranscript(null); // Reset translated transcript when fetching new data
    } catch (err) {
      console.error("Error fetching assets:", err);
      setError("Error fetching data. Please check the URL and try again.");
    }
  };

  const handleTranslate = async () => {
    try {
      const response = await axios.post(
        "https://upwork-youtube-downloader-nodejs-v1.vercel.app/api/translate",
        {
          transcript: assets.transcript,
          language,
        }
      );
      setTranslatedTranscript(response.data.translatedText);
      setError("");
    } catch (err) {
      console.error("Error translating transcript:", err);
      setError("Error translating transcript.");
    }
  };

  const handleDownloadPDF = async () => {
    try {
      const response = await axios.post(
        "https://upwork-yoububee-downolader-nodejs-v1.vercel.app/api/download-assets",
        {
          url,
          type: "pdf",
          content: "transcript" || assets.transcript,
        },
        { responseType: "blob" } // Important for downloading files
      );

      // Create a URL for the Blob and trigger a download
      const blob = new Blob([response.data], { type: "application/pdf" });
      const urlObject = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = urlObject;
      link.download = "transcript.pdf";
      document.body.appendChild(link);
      link.click();
      link.remove();

      // Clean up URL object
      window.URL.revokeObjectURL(urlObject);
    } catch (err) {
      console.error("Error downloading PDF:", err);
      setError("Error downloading PDF. Please try again.");
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
          Get more done with less effort. Our YouTube Downloader is designed to
          simplify the way you access video captions. Check out the features
          that make this tool a must-have for anyone who watches multi-language
          YouTube videos regularly.
        </p>
      ),
      imgLink: "./Thumbnail.png",
    },
  ];
  const Featuress = [
    {
      header: "Instant Captions",
      desc: "You will get the captions—no matter how long it is—within seconds. With this tool, you will have more time to understand the videos better.",
    },
    {
      header: "Easy To Use",
      desc: "The best part about our YT caption extractor is that you need not go through a complex set of steps like account creation. You just need to paste the video link correctly.",
    },
    {
      header: "Accurate Transcriptions",
      desc: "Our advanced system ensures that the captions are as accurate as possible. The chances for errors are minimal, making it an ideal choice for researchers.",
    },
    {
      header: "Supports Multiple Languages",
      desc: "Our tool isn’t limited to just English—get captions in multiple languages, depending on the video’s available subtitles. That means you can access international content with just a click, using our tool.",
    },
    {
      header: "Download Subtitles",
      desc: "No internet? No problem. You can download the subtitles as a PDF and use them anytime while you are offline.",
    },
  ];
  const FAQ = [
    {
      question: "Can I download captions from any YouTube video?",
      answer:
        "No, it depends on the subtitle settings. You can only download captions from videos that have them enabled. In case the video is private, you cannot download the transcript even if it is enabled.",
    },
    {
      question: "How accurate are the auto-generated captions?",
      answer:
        "Basically, auto-generated captions rely on speech recognition technology. Its accuracy depends on factors like audio quality, speaker accents, background noise, etc. It is better to review them before using.",
    },
    {
      question: "Can I edit the downloaded caption files?",
      answer:
        "Of course. You will download the subtitles from our website in a PDF format. You can use any PDF editor tool or convert it to another format to edit the subtitles.",
    },
    {
      question: "Can I download multiple subtitles at once?",
      answer:
        "No, you can download captions from only one video at a single run. However, you can use our tool without any restrictions. That means you can download subtitles for as many videos as you want.",
    },
  ];
  const CtaData = [
    {
      header: "Get Instant Subtitles That Speak to You",
      desc: "Why work harder when you can work smarter? With our YouTube Caption Downloader, you’ll skip the hassle of manual transcription and get captions instantly. Try it for free now!",
    },
  ];
  const serviceHeader = [
    {
      header: (
        <h2 className="my-8 text-2xl font-bold text-gray-700 md:text-4xl">
          What is a <span className="text-red-600">You</span>Tube Caption
          Downloader?
        </h2>
      ),
      desc: (
        <p className="text-gray-600">
          A YT caption downloader is an online tool that lets you extract the
          subtitles from any YouTube video. These subtitles can be either
          auto-generated by YouTube or manually added by the video creator. You
          can download them in PDF format.
        </p>
      ),
    },
  ];
  const serviceHeader2 = [
    {
      title: (
        <h2 className="text-3xl font-bold sm:text-4xl">
          Who Can Use <span className="text-red-600">You</span>Tube Caption
          Downloader?
        </h2>
      ),
      desc: (
        <p className="mt-4 text-gray-600">
          Our YouTube caption extractor tool is practically needed for anyone
          who wants to view the transcripts of a particular video. Here are some
          sects that may find our tool most useful:
        </p>
      ),
      imgLink: "./Thumbnail.png",
    },
  ];
  const serviceData = [
    {
      header: "Content Creators",
      desc: "Are you a YouTuber looking forward to reaching a wide international audience? Then, captions are a must. Our YT caption extractor lets you get an accurate transcript of your videos with just a single click.",
    },
    {
      header: "Language Learners",
      desc: "Understanding a foreign-language video from the first view could be a bit challenging. That’s where you need our YT caption downloader tool. Read along as you watch for better pronunciation and vocabulary.",
    },
    {
      header: "Students and Researchers",
      desc: "Need to extract information from a lecture? Instead of watching hours of video, grab the captions with a quick paste of the link. Save time by skimming through text and make your research way easier.",
    },
    {
      header: "Journalists",
      desc: "Our tool is a great time-saver for journalists who need references from long-form videos. Why waste time rewatching the interviews if you can grab the captions and find exactly what you need in seconds?",
    },
    {
      header: "Social Media Managers",
      desc: "When creating social media posts from videos, having captions makes it easier to pull highlights and key points. This tool ensures you always have the text at hand, ready for repurposing.",
    },
  ];
  const UseHeader = [
    {
      title: (
        <h2 className="my-8 text-2xl font-bold text-blace md:text-4xl">
          How To Use The <span className="text-red-600">You</span>Tube Caption
          Downloader?
        </h2>
      ),
      desc: (
        <p className="text-black">
          The usage of our YT caption extractor is pretty simple. All you need
          is basic technical knowledge. Here’s how to use it:
        </p>
      ),
      imgLink: "./captions.png",
    },
  ];
  const UseData = [
    {
      header: "Copy The Video URL",
      data: "Find the YouTube video you want subtitles for and copy its URL from the address bar.",
    },
    {
      header: "Visit YouTube Downloader",
      data: "Go to our website and click on ‘captions’ from the menu. Paste the link to the text box.",
    },
    {
      header: "Download The Subtitle",
      data: "Now, click on the download button to save the subtitle file to your device in a PDF format.",
    },
  ];
  const HeroText = [
    {
      title: <h2 className="text-2xl font-semibold text-red-600">CAPTIONS</h2>,
      desc: (
        <p className="mt-4 text-gray-800">
          Tired of manually transcribing YouTube videos? Get captions instantly
          by just pasting the video link! Our YouTube Caption Tool instantly
          grabs the captions from any video—no hassle, no waiting. Try it now
          for free!
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
              <span className="text-black font-bold"> Captions </span>
            </p>
            <TextinHero data={HeroText} />
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
                  Captions
                </button>
              </form>
            </div>

            {error && <p className="mt-4 text-red-500">{error}</p>}

            {assets && (
              <div className="mt-8 text-left">
                <h2 className="text-2xl font-semibold text-gray-800 mt-6">
                  Transcript
                </h2>
                <pre className="mt-2 bg-gray-100 p-4 rounded-lg text-sm text-gray-700 overflow-x-auto">
                  {translatedTranscript || assets.transcript}
                </pre>

                {/* <div className="mt-4">
                  <label className="block text-gray-700">
                    Select Language:
                  </label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="mt-2 p-2 border rounded-lg"
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                    <option value="ar">Arabic</option>
                    <option value="zh">Chinese</option>
                  </select>
                  <button
                    type="button"
                    onClick={handleTranslate}
                    className="ml-4 mt-2 px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-400 focus:outline-none"
                  >
                    Translate
                  </button>
                </div> */}

                {translatedTranscript && (
                  <div className="mt-8 text-left">
                    <h2 className="text-2xl font-semibold text-gray-800 mt-6">
                      Translated Transcript ({language.toUpperCase()})
                    </h2>
                    <pre className="mt-2 bg-gray-100 p-4 rounded-lg text-sm text-gray-700 overflow-x-auto">
                      {translatedTranscript}
                    </pre>
                  </div>
                )}

                {assets.transcript && (
                  <button
                    type="button"
                    onClick={handleDownloadPDF}
                    className="mt-4 px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-400 focus:outline-none"
                  >
                    Download PDF
                  </button>
                )}
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
