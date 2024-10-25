import Link from "next/link";
import React from "react";

export default function Services() {
  return (
    <div>
      <div id="features" className="mt-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-6">
          <div className="md:w-2/3 lg:w-1/2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#FFD700"
              className="w-6 h-6 text-secondary"
            >
              <path
                fillRule="evenodd"
                d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813A3.75 3.75 0 007.466 7.89l.813-2.846A.75.75 0 019 4.5zM18 1.5a.75.75 0 01.728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 010 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 01-1.456 0l-.258-1.036a2.625 2.625 0 00-1.91-1.91l-1.036-.258a.75.75 0 010-1.456l1.036-.258a2.625 2.625 0 001.91-1.91l.258-1.036A.75.75 0 0118 1.5zM16.5 15a.75.75 0 01.712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 010 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 01-1.422 0l-.395-1.183a1.5 1.5 0 00-.948-.948l-1.183-.395a.75.75 0 010-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0116.5 15z"
                clipRule="evenodd"
              ></path>
            </svg>

            <h2 className="my-8 text-2xl font-bold text-gray-700 md:text-4xl">
              All-in-One <span style={{ color: "red" }}>You</span>Tube Toolkit
            </h2>
            <p className="text-gray-600">
              Stop switching between tabs on multiple websites. Download all
              YouTube assets from one place—free and user-friendly!
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-gray-600">
            {/* Thumbnail Downloader */}
            <ServiceCard
              title="Thumbnail Downloader"
              description="First impressions matter! With our thumbnail download tool, you can instantly grab attention with the perfect visual for your video through a simple click. No more screenshot hassles or low-quality images. Get exactly what you need to showcase your content in the best light."
              link="thumbnail"
              imgSrc="https://cdn-icons-png.flaticon.com/512/4341/4341139.png"
            />

            {/* Logo Downloader */}
            <ServiceCard
              title="Logo Downloader"
              description="Your logo is the face of the brand. So, creating it from scratch is not advisable for beginners. With our logo downloader, you can easily save any YouTube channel's logo. Edit it with a random tool to create your own logo."
              link="logo"
              imgSrc="https://cdn-icons-png.flaticon.com/512/4341/4341134.png"
            />

            {/* Banner Downloader */}
            <ServiceCard
              title="Banner Downloader"
              description="Need a stunning banner to represent your YouTube channel? Simply paste the URL to your inspiring source channel. Our easy-to-use tool will fetch full-resolution banners instantly. Keep your website visitors hooked with eye-catching visuals!"
              link="banner"
              imgSrc="https://cdn-icons-png.flaticon.com/512/4341/4341160.png"
            />
            {/* Channel Information Downloader */}
            <ServiceCard
              title="Channel Information"
              description="An in-depth competitor research is the first step to your YouTube channel's success. Our channel information extractor will give you all the juicy info in one place. Use this data to analyze trends and improve your own content strategy."
              link="channelinformation"
              imgSrc="https://cdn-icons-png.flaticon.com/512/4341/4341260.png"
            />

            {/* Captions Download */}
            <ServiceCard
              title="Captions Download"
              description="Feeling trapped within language barriers? Well, our platform lets you download subtitles of any video easily. You can paste them to a translator to view the content in your local language. Luckily, our tool supports multiple languages and formats."
              link="captions"
              imgSrc="https://cdn-icons-png.flaticon.com/512/4341/4341025.png"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ServiceCard({ title, description, link, imgSrc }) {
  return (
    <div className="group relative bg-white rounded-lg shadow-lg p-8 transition transform hover:-translate-y-2 hover:shadow-xl">
      <img src={imgSrc} className="w-12 mb-4 mx-auto" alt={title} />
      <h5 className="text-xl font-semibold text-gray-700 text-center">
        {title}
      </h5>
      <p className="mt-4 text-gray-600 text-center">{description}</p>
      <Link
        href={link}
        className="mt-6 block text-center text-secondary font-medium text-red-600 hover:text-red-400"
      >
        Read more
      </Link>
    </div>
  );
}
