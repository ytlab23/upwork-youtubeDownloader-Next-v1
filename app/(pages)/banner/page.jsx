"use client";
import { useState } from "react";
import axios from "axios";
import React from "react";

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
      setError("Error fetching data");
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

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <section className="bg-white rounded-2xl shadow-2xl w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto">
        <div className="px-6 py-10 sm:py-12 md:py-16 text-center">
          <div className="max-w-lg mx-auto">
            <h1 className="text-3xl font-semibold text-gray-800 lg:text-4xl">
              <span className="text-red-600">Yout</span>Tube Asset Downloader
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
                  className="h-10 px-4 py-2 m-1 text-white transition-colors duration-300 transform bg-blue-500 rounded-full hover:bg-blue-400 focus:outline-none focus:bg-blue-400"
                >
                  Banner
                </button>
              </form>
            </div>

            {error && <p className="mt-4 text-red-500">{error}</p>}

            {assets && (
              <div className="mt-8 text-left">
                <h2 className="text-2xl font-semibold text-gray-800 mt-6">
                  Banner
                </h2>
                <div className="relative">
                  <img
                    src={assets.channelArt}
                    alt="Channel Art"
                    className="mt-2 rounded-lg"
                  />
                  <button
                    onClick={() =>
                      handleDownloadImage(assets.channelArt, "channel-art.jpg")
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
    </div>
  );
}
