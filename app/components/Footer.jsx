import React from "react";

export default function Footer() {
  const NavLInks = [
    { name: "Thumbnail", Links: "thumbnail" },
    { name: "Logo", Links: "logo" },
    { name: "Banner", Links: "banner" },
    { name: "ChannelInformation", Links: "channelinformation" },
    { name: "Captions", Links: "captions" },
  ];
  return (
    <div>
      <footer className="bg-white mt-10">
        <div className="relative mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 lg:pt-24">
          <div className="lg:flex lg:items-end lg:justify-between">
            <div>
              <div className="flex justify-center text-black lg:justify-start">
                <h1 className="text-2xl font-bold">
                  <span className="text-red-700">YouTube</span>Downloader
                </h1>
              </div>

              <p className="mx-auto mt-6 max-w-md text-center leading-relaxed text-gray-500 lg:text-left">
                Download Thumbnails, Logos, Banners, Captions, and More in
                Seconds.
              </p>
            </div>
            <ul className="mt-12 flex flex-wrap justify-center gap-6 md:gap-8 lg:mt-0 lg:justify-end lg:gap-12">
              {NavLInks.map((link) => (
                <li key={link.name}>
                  <a
                    className="text-gray-700 transition hover:text-gray-700/75"
                    href={link.Links}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-12 text-center text-sm text-gray-500 lg:text-right">
            Copyright &copy; 2024.
          </p>
        </div>
      </footer>
    </div>
  );
}
