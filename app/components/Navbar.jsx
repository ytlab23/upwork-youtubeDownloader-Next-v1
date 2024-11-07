"use client";
// Components/Navbar.js
import React, { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const NavLInks = [
    { name: "Thumbnail", Links: "thumbnail" },
    { name: "Logo", Links: "logo" },
    { name: "Banner", Links: "banner" },
    { name: "Channel Information", Links: "channelinformation" },
    { name: "Captions", Links: "captions" },
  ];
  return (
    <header className="bg-white">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/">
            {" "}
            <h1 className="text-2xl font-bold">
              <span className="text-red-700">YouTube</span>Download.org
            </h1>
          </Link>

          {/* Desktop Menu */}
          <nav aria-label="Global" className="hidden md:flex md:items-center">
            <ul className="flex items-center gap-6 text-sm">
              {/* Links */}
              {NavLInks.map((link) => (
                <li key={link.name}>
                  <a
                    className="text-black font-medium transition hover:text-gray-600"
                    href={link.Links}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <div className="block md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <nav className="md:hidden mt-4">
            <ul className="flex flex-col gap-2">
              {NavLInks.map((link) => {
                <li>
                  <a
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    href={link.Links}
                  >
                    {link.name}
                  </a>
                </li>;
              })}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
