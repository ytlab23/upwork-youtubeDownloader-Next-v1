/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    // Build plain HTML/CSS/JS files into out/ so the site runs on ordinary
    // (cPanel) hosting without a Node.js server. The pages have no server
    // code; the YouTube work is done by a separate back-end.
    output: 'export',
    // Image optimisation needs a server; plain-file builds serve images as they are.
    images: { unoptimized: true },
};

export default nextConfig;
