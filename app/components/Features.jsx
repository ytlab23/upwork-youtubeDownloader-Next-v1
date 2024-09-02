import React from "react";
// lg:flex-row-reverse
export default function Features() {
  const Featuress = [
    {
      header: "Multi-Language Support",
      text: "Enjoy seamless automatic translations for transcripts to connect with a global audience.",
    },
    {
      header: "User-Friendly Interface",
      text: "Experience an intuitive interface designed for ease of use,regardless of your tech skills.",
    },
    {
      header: "High-Quality Outputs",
      text: " Receive high-quality images and accurate data, ready for immediate use",
    },
    {
      header: "Comprehensive Content",
      text: " From visuals to text, get everything you need from a single YouTube link",
    },
  ];
  return (
    <div className="flex items-center justify-center  mt-10">
      <div>
        <div className="max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
          <div className="flex flex-col gap-y-8 lg:items-center lg:gap-x-16">
            <div className="mx-auto max-w-lg text-center lg:mx-0 ltr:lg:text-left">
              <h2 className="text-3xl font-bold sm:text-4xl">
                Unlock a World of <span style={{ color: "red" }}>You</span>Tube
                Content
              </h2>

              <p className="mt-4 text-gray-600">
                Whether you’re a content creator, marketer, or researcher,
                access and download essential YouTube assets with just a few
                clicks.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {Featuress.map((feature)=>(<a
                className="block rounded-xl border border-gray-100 p-4 shadow-sm hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring"
                href="#"
                key={feature.header}
              >
                <span className="inline-block rounded-lg bg-gray-50 p-3">
                  <img
                    src="/ribbon.svg" // Path to the SVG in the public folder
                    alt="Ribon Icon"
                    className="size-6" // Adjust size if needed
                  />
                </span>

                <h2 className="mt-2 font-bold">{feature.header}</h2>

                <p className="hidden sm:mt-1 sm:block sm:text-sm sm:text-gray-600">
                 {feature.text}
                </p>
              </a>
))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
