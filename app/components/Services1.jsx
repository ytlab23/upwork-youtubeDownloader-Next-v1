import Link from "next/link";
import React from "react";

export default function Services({ header, data, header2 }) {
  return (
    <div>
      <div id="features" className="mt-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-6">
          <div style={{ width: "100%" }}>
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
            {header.map((item, index) => (
              <div key={index} className="flex flex-row-reverse mt-8">
                {item.header}
                {item.desc}
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-y-8 lg:items-center lg:gap-x-16 mt-16 ">
            {header2.map((feature) => (
              <div
                className="mx-auto max-w-lg text-center lg:mx-0 ltr:lg:text-left "
                key={feature.title}
              >
                {feature.title}
                {feature.desc}
              </div>
            ))}
          </div>

          <div className="mt-16 grid divide-x divide-y divide-gray-100 overflow-hidden rounded-3xl border border-gray-100 text-gray-600 sm:grid-cols-2 lg:grid-cols-4 lg:divide-y-0 xl:grid-cols-4">
            {data.map((item, index) => (
              <div
                className="group relative bg-white transition hover:z-[1] hover:shadow-2xl hover:shadow-gray-600/10"
                key={index}
              >
                <div className="relative space-y-8 py-12 p-8">
                  <span className="inline-block rounded-lg bg-gray-50 p-3">
                    <img
                      src="/ribbon1.svg" // Path to the SVG in the public folder
                      alt="Ribbon Icon"
                      className="size-6" // Adjust size if needed
                    />
                  </span>
                  <div className="space-y-2">
                    <h5 className="text-xl font-semibold text-gray-700 transition group-hover:text-secondary">
                      {item.header}
                    </h5>
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
