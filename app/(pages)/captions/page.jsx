// "use client";
// import { useState } from "react";
// import axios from "axios";
// import React from "react";

// export default function Page() {
//   const [url, setUrl] = useState("");
//   const [assets, setAssets] = useState(null);
//   const [error, setError] = useState("");
//   const [language, setLanguage] = useState("en");
//   const [translatedTranscript, setTranslatedTranscript] = useState(null);

//   const handleFetchAssets = async () => {
//     try {
//       const response = await axios.post(
//         "https://upwork-youtube-downloader-nodejs-v1.vercel.app/api/get-assets",
//         { url }
//       );
//       setAssets(response.data);
//       setError("");
//     } catch (err) {
//       setError("Error fetching data");
//     }
//   };

//   const handleTranslate = async () => {
//     try {
//       const response = await axios.post("https://upwork-youtube-downloader-nodejs-v1.vercel.app/api/translate", {
//         transcript: assets.transcript,
//         language,
//       });
//       setTranslatedTranscript(response.data.translatedText);
//       setError("");
//     } catch (err) {
//       setError("Error translating transcript");
//     }
//   };

//   const handleDownloadPDF = async () => {
//     try {
//       const response = await axios.post(
//         "https://upwork-youtube-downloader-nodejs-v1.vercel.app/api/download-assets",
//         {
//           url,
//           type: "pdf",
//         },
//         { responseType: "blob" }
//       );

//       // Create a link element, set its href to a URL representing the Blob object, and click it
//       const url = window.URL.createObjectURL(
//         new Blob([response.data], { type: "application/pdf" })
//       );
//       const link = document.createElement("a");
//       link.href = url;
//       link.setAttribute("download", "transcript.pdf");
//       document.body.appendChild(link);
//       link.click();
//       link.remove();
//     } catch (err) {
//       console.error(err); // Log error for debugging
//       setError("Error downloading PDF");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-white">
//       <section className="bg-white rounded-2xl shadow-2xl w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto">
//         <div className="px-6 py-10 sm:py-12 md:py-16 text-center">
//           <div className="max-w-lg mx-auto">
//             <h1 className="text-3xl font-semibold text-gray-800 lg:text-4xl">
//               <span className="text-red-600">Yout</span>Tube Asset Downloader
//             </h1>

//             <p className="mt-6 text-gray-500">
//               Enter the URL of a YouTube video to download
//               <span className="text-black font-bold"> Caption </span>
//             </p>

//             <div className="w-full max-w-sm mx-auto mt-6 bg-transparent border rounded-full focus-within:border-blue-400 focus-within:ring focus-within:ring-blue-300 focus-within:ring-opacity-40">
//               <form className="flex flex-col md:flex-row">
//                 <input
//                   type="text"
//                   value={url}
//                   onChange={(e) => setUrl(e.target.value)}
//                   placeholder="Enter YouTube video URL"
//                   className="flex-1 h-10 px-4 py-2 m-1 text-gray-700 placeholder-gray-400 bg-transparent border-none appearance-none focus:outline-none focus:placeholder-transparent focus:ring-0"
//                 />
//                 <button
//                   type="button"
//                   onClick={handleFetchAssets}
//                   className="h-10 px-4 py-2 m-1 text-white transition-colors duration-300 transform bg-blue-500 rounded-full hover:bg-blue-400 focus:outline-none focus:bg-blue-400"
//                 >
//                   Caption
//                 </button>
//               </form>
//             </div>

//             {error && <p className="mt-4 text-red-500">{error}</p>}

//             {assets && (
//               <div className="mt-8 text-left">
//                 <h2 className="text-2xl font-semibold text-gray-800 mt-6">
//                   Transcript
//                 </h2>
//                 <pre className="mt-2 bg-gray-100 p-4 rounded-lg text-sm text-gray-700">
//                   {assets.transcript}
//                 </pre>

//                 <div className="mt-4">
//                   <label className="block text-gray-700">
//                     Select Language:
//                   </label>
//                   <select
//                     value={language}
//                     onChange={(e) => setLanguage(e.target.value)}
//                     className="mt-2 p-2 border rounded-lg"
//                   >
//                     <option value="en">English</option>
//                     <option value="es">Spanish</option>
//                     <option value="fr">French</option>
//                     <option value="de">German</option>
//                     <option value="ar">Arabic</option>
//                     <option value="zh">Chinese</option>
//                   </select>
//                   <button
//                     type="button"
//                     onClick={handleTranslate}
//                     className="ml-4 mt-2 px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-400 focus:outline-none"
//                   >
//                     Translate
//                   </button>
//                 </div>

//                 {translatedTranscript && (
//                   <div className="mt-8 text-left">
//                     <h2 className="text-2xl font-semibold text-gray-800 mt-6">
//                       Translated Transcript ({language.toUpperCase()})
//                     </h2>
//                     <pre className="mt-2 bg-gray-100 p-4 rounded-lg text-sm text-gray-700">
//                       {translatedTranscript}
//                     </pre>
//                   </div>
//                 )}

//                 <div className="mt-6">
//                   <button
//                     type="button"
//                     onClick={handleDownloadPDF}
//                     className="px-4 py-2 text-white bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none"
//                   >
//                     Download Transcript as PDF
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

// last working code well

// "use client";
// import { useState } from "react";
// import axios from "axios";
// import React from "react";

// export default function Page() {
//   const [url, setUrl] = useState("");
//   const [assets, setAssets] = useState(null);
//   const [error, setError] = useState("");
//   const [language, setLanguage] = useState("en");
//   const [translatedTranscript, setTranslatedTranscript] = useState(null);

//   const handleFetchAssets = async () => {
//     try {
//       const response = await axios.post(
//         "https://upwork-youtube-downloader-nodejs-v1.vercel.app/api/get-assets",
//         { url }
//       );
//       setAssets(response.data);
//       setError("");
//     } catch (err) {
//       console.error("Error fetching assets:", err);
//       setError("Error fetching data");
//     }
//   };

//   const handleTranslate = async () => {
//     try {
//       const response = await axios.post("https://upwork-youtube-downloader-nodejs-v1.vercel.app/api/translate", {
//         transcript: assets.transcript,
//         language,
//       });
//       setTranslatedTranscript(response.data.translatedText);
//       setError("");
//     } catch (err) {
//       console.error("Error translating transcript:", err);
//       setError("Error translating transcript");
//     }
//   };

//   const handleDownloadPDF = async () => {
//     try {
//       const response = await axios.post(
//         "https://upwork-youtube-downloader-nodejs-v1.vercel.app/api/download-assets",
//         {
//           url,
//           type: "pdf",
//         },
//         { responseType: "blob" }
//       );

//       // Create a link element, set its href to a URL representing the Blob object, and click it
//       const urlObject = window.URL.createObjectURL(
//         new Blob([response.data], { type: "application/pdf" })
//       );
//       const link = document.createElement("a");
//       link.href = urlObject;
//       link.setAttribute("download", "transcript.pdf");
//       document.body.appendChild(link);
//       link.click();
//       link.remove();
//     } catch (err) {
//       console.error("Error downloading PDF:", err);
//       setError("Error downloading PDF");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-white">
//       <section className="bg-white rounded-2xl shadow-2xl w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto">
//         <div className="px-6 py-10 sm:py-12 md:py-16 text-center">
//           <div className="max-w-lg mx-auto">
//             <h1 className="text-3xl font-semibold text-gray-800 lg:text-4xl">
//               <span className="text-red-600">Yout</span>Tube Asset Downloader
//             </h1>

//             <p className="mt-6 text-gray-500">
//               Enter the URL of a YouTube video to download
//               <span className="text-black font-bold"> Caption </span>
//             </p>

//             <div className="w-full max-w-sm mx-auto mt-6 bg-transparent border rounded-full focus-within:border-blue-400 focus-within:ring focus-within:ring-blue-300 focus-within:ring-opacity-40">
//               <form className="flex flex-col md:flex-row">
//                 <input
//                   type="text"
//                   value={url}
//                   onChange={(e) => setUrl(e.target.value)}
//                   placeholder="Enter YouTube video URL"
//                   className="flex-1 h-10 px-4 py-2 m-1 text-gray-700 placeholder-gray-400 bg-transparent border-none appearance-none focus:outline-none focus:placeholder-transparent focus:ring-0"
//                 />
//                 <button
//                   type="button"
//                   onClick={handleFetchAssets}
//                   className="h-10 px-4 py-2 m-1 text-white transition-colors duration-300 transform bg-blue-500 rounded-full hover:bg-blue-400 focus:outline-none focus:bg-blue-400"
//                 >
//                   Caption
//                 </button>
//               </form>
//             </div>

//             {error && <p className="mt-4 text-red-500">{error}</p>}

//             {assets && (
//               <div className="mt-8 text-left">
//                 <h2 className="text-2xl font-semibold text-gray-800 mt-6">
//                   Transcript
//                 </h2>
//                 <pre className="mt-2 bg-gray-100 p-4 rounded-lg text-sm text-gray-700">
//                   {assets.transcript}
//                 </pre>

//                 {/* <div className="mt-4">
//                   <label className="block text-gray-700">
//                     Select Language:
//                   </label>
//                   <select
//                     value={language}
//                     onChange={(e) => setLanguage(e.target.value)}
//                     className="mt-2 p-2 border rounded-lg"
//                   >
//                     <option value="en">English</option>
//                     <option value="es">Spanish</option>
//                     <option value="fr">French</option>
//                     <option value="de">German</option>
//                     <option value="ar">Arabic</option>
//                     <option value="zh">Chinese</option>
//                   </select>
//                   <button
//                     type="button"
//                     onClick={handleTranslate}
//                     className="ml-4 mt-2 px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-400 focus:outline-none"
//                   >
//                     Translate
//                   </button>
//                 </div> */}

//                 {/* {translatedTranscript && (
//                   <div className="mt-8 text-left">
//                     <h2 className="text-2xl font-semibold text-gray-800 mt-6">
//                       Translated Transcript ({language.toUpperCase()})
//                     </h2>
//                     <pre className="mt-2 bg-gray-100 p-4 rounded-lg text-sm text-gray-700">
//                       {translatedTranscript}
//                     </pre>
//                   </div>
//                 )} */}

//                 {assets.transcript && (
//                   <button
//                     type="button"
//                     onClick={handleDownloadPDF}
//                     className="mt-4 px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-400 focus:outline-none"
//                   >
//                     Download PDF
//                   </button>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

"use client";
import { useState } from "react";
import axios from "axios";
import React from "react";

export default function Page() {
  const [url, setUrl] = useState("");
  const [assets, setAssets] = useState(null);
  const [error, setError] = useState("");
  const [language, setLanguage] = useState("en");
  const [translatedTranscript, setTranslatedTranscript] = useState(null);

  const handleFetchAssets = async () => {
    try {
      const response = await axios.post(
        "https://upwork-youtube-downloader-nodejs-v1.vercel.app/api/get-assets",
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
      const response = await axios.post("https://upwork-youtube-downloader-nodejs-v1.vercel.app/api/translate", {
        transcript: assets.transcript,
        language,
      });
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
        "https://upwork-youtube-downloader-nodejs-v1.vercel.app/api/download-assets",
        {
          url,
          type: "pdf",
          content: 'transcript' || assets.transcript,
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

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <section className="bg-white rounded-2xl shadow-2xl w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto">
        <div className="px-6 py-10 sm:py-12 md:py-16 text-center">
          <div className="max-w-lg mx-auto">
            <h1 className="text-3xl font-semibold text-gray-800 lg:text-4xl">
              <span className="text-red-600">You</span>Tube Asset Downloader
            </h1>

            <p className="mt-6 text-gray-500">
              Enter the URL of a YouTube video to download
              <span className="text-black font-bold"> Captions </span>
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
    </div>
  );
}
