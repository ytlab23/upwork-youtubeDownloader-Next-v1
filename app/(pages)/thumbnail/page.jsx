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
        "http://localhost:5000/api/get-assets",
        { url }
      );
      setAssets(response.data);
      setError("");
    } catch (err) {
      setError("Error fetching data");
    }
  };

  const handleDownload = async (type) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/download-assets",
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
                  className="h-10 px-4 py-2 m-1 text-white transition-colors duration-300 transform bg-blue-500 rounded-full hover:bg-blue-400 focus:outline-none focus:bg-blue-400"
                >
                  Thumbnail
                </button>
              </form>
            </div>

            {error && <p className="mt-4 text-red-500">{error}</p>}

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
    </div>
  );
}
