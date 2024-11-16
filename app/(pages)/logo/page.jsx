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

  // Function to fetch assets from the backend
  const handleFetchAssets = async () => {
    try {
      const response = await axios.post(
        "https://upwork-youtube-downloader-nodejs-v1.vercel.app/api/get-assets",
        { url }
      );
      setAssets(response.data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Error fetching data. Please ensure the URL is correct.");
    }
  };

  // Function to handle downloading the logo
  const handleDownload = () => {
    axios
      .post(
        "https://upwork-youtube-downloader-nodejs-v1.vercel.app/api/download-assets",
        { url, type: "image", content: "logo" },
        { responseType: "blob" }
      )
      .then((response) => {
        const blobUrl = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = blobUrl;
        link.setAttribute("download", "logo.jpg");
        document.body.appendChild(link);
        link.click();
        link.remove();
      })
      .catch((error) => {
        console.error("Error downloading the logo:", error);
        setError("Error downloading the logo. Please try again.");
      });
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
      desc: "Our tool works quickly right from the moment when you hit the download button. It requests the YouTube server and fetches the logo within a flash. Plus, there are no lengthy video ads to slow you down.",
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
            className="underline text-red-600 hover:text-red-800"
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
            className="underline text-red-600 hover:text-red-800"
          >
            Banner
          </a>
          {"  "}
          and {"  "}
          <a
            href="https://youtubedownload.org/logo"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-red-600 hover:text-red-800"
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
            className="underline text-red-600 hover:text-red-800"
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
        <h2 className="mt-0 mb-8 text-2xl font-bold text-gray-700 text-left md:text-4xl md:mb-6">
          About Our<span className="text-red-600">You</span>Tube Logo
          Downloader?
        </h2>
      ),
      desc: (
        <p className="text-gray-600 text-sm md:text-base md:pl-5">
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
        <h2 className="text-3xl font-bold sm:text-4xl">
          Who Can Use a <span className="text-red-600">You</span>Tube Logo
          Downloader?
        </h2>
      ),
      desc: (
        <p className="mt-4 text-gray-600">
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
        <h2 className="my-8 text-2xl font-bold text-blace md:text-4xl">
          How To Use The <span className="text-red-600">You</span>Tube Logo
          Downloader?
        </h2>
      ),
      desc: (
        <p className="text-black">
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
      title: <h2 className="text-2xl font-semibold text-red-600">LOGO</h2>,
      desc: (
        <p className="mt-4 text-gray-800">
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
    <div className="flex flex-col items-center min-h-screen bg-white">
      <section className="bg-white rounded-2xl shadow-2xl w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto mt-44 mb-44">
        <div className="px-6 py-10 sm:py-12 md:py-16 text-center">
          <div className="max-w-lg mx-auto">
            <h1 className="text-3xl font-semibold text-gray-800 lg:text-4xl">
              <span className="text-red-600">You</span>Tube Logo Downloader
            </h1>

            <p className="mt-6 text-gray-500">
              Enter the URL of a YouTube video to download the{" "}
              <span className="text-black font-bold">Logo</span>.
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
                  Logo
                </button>
              </form>
            </div>
            {error && <p className="mt-4 text-red-500">{error}</p>}

            <TextinHero data={HeroText} />
           

            {assets && assets.logo && (
              <div className="mt-8 text-left">
                <h2 className="text-2xl font-semibold text-gray-800 mt-6">
                  Logo
                </h2>
                <img src={assets.logo} alt="Logo" className="mt-2 rounded-lg" />
                <button
                  onClick={handleDownload}
                  className="mt-4 h-10 px-4 py-2 text-white transition-colors duration-300 transform bg-green-500 rounded-full hover:bg-green-400 focus:outline-none focus:bg-green-400"
                >
                  Download Logo
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
