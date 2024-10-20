import React from "react";
export default function Features() {
  const Featuress = [
    {
      header: "High-Quality",
      text: "Quality matters a lot on YouTube. The algorithm usually does not promote low-resolution thumbnails or poorly formatted captions. Thats why we prioritize delivering high-quality outputs every time. Our system is designed to fetch you the highest resolution available.",
    },
    {
      header: "User-Friendly Interface",
      text: "We have created the platforms specifically for beginners who are struggling to edit logos and thumbnails. Just paste a URL and click - that's literally it! The best part is that you do not need to struggle with annoying ads. You will have a straightforward experience that gets you the results you want, fast and hassle-free.",
    },
    {
      header: "Multilanguage Support",
      text: "Our tools come with multilanguage support. So, you can access them anytime no matter where you're from. Just click and pick your local language!",
    },
    {
      header: "Fast Processing",
      text: "As soon as you hit the download button, we will fetch the details from the channel and display them in the best quality- all within seconds. Our lightning-fast automated system processes your order within seconds. There will not be any video ads that will affect your loading speed. Paste, download, done - it's that quick!",
    },
    {
      header: "Reliable Results",
      text: "We understand that you need accurate data at each stage of the content creation process, right from brainstorming to keyword inclusion. As a trusted platform with many years of experience, we only provide accurate results every single time. We regularly update our systems to avoid any issues like broken downloads, missing information, etc. ",
    },
    {
      header: "No Signups",
      text: "Life's too short for another password! So, we have made our platform instantly accessible to anyone without wasting time on account creation. Just visit our site and start downloading - it's that easy. ",
    },
  ];
  return (
    <div className="flex items-center justify-center  mt-10">
      <div>
        <div className="max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
          <div className="flex flex-col gap-y-8 lg:items-center lg:gap-x-16">
            <div className="mx-auto max-w-lg text-center lg:mx-0 ltr:lg:text-left">
              <h2 className="text-3xl font-bold sm:text-4xl">
                Why Choose <span className="text-red-600">Us</span>?
              </h2>

              <p className="mt-4 text-gray-600">
                Nowadays, a lot of platforms offer various types of
                YouTube-related services. Yet, millions of users prefer us, and
                thats not just a coincidence. Check out how we stand out from
                other platforms.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {Featuress.map((feature) => (
                <a
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
