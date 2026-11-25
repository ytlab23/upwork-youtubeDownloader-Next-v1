import { Archivo, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import AppBar from "./components/bay/AppBar";
import StatusBar from "./components/bay/StatusBar";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata = {
  title: "YoutubeDownloader",
  description: " Unlock YouTube Content Effortlessly",
  // The site mark (public/icon.svg); favicon.ico and apple-touch-icon.png are rendered from it.
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export const viewport = {
  themeColor: "#111214",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${archivo.variable} ${mono.variable}`}>
      <body className="min-h-screen bg-bay-bg font-sans text-bay-text">
        <a
          href="#main"
          className="sr-only z-50 rounded-sm bg-bay-playhead px-3 py-2 font-semibold text-bay-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-3"
        >
          Skip to content
        </a>
        <AppBar />
        <main id="main">{children}</main>
        <StatusBar />
      </body>
    </html>
  );
}
