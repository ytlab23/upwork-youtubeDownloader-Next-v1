# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
YouTube creators and anyone who needs an asset from YouTube: a video's thumbnail or transcript, or a channel's profile picture, banner or public details. They arrive with a YouTube link in hand (often from a search) and want the file in seconds, without signing up.

## Product Purpose
YouTubeDownload (youtubedownload.org) is a free tool: no sign-up tools that pull assets out of YouTube videos and channels. It has no sales funnel or paid tier. Success means visitors get their asset quickly and come back when they need another.

## Positioning
Five asset tools in one place, each a single step: paste a link, get the result, download it as a real file (JPEG image, PDF transcript, JSON channel details). Free and without an account.

## Operating Context
- A visitor pastes a YouTube video link (the back-end also accepts channel and @handle links), presses the tool's button, sees the result on the page, then downloads it.
- Used on phones and desktops.
- Each tool has its own page and URL: /thumbnail, /captions, /logo, /banner, /channelinformation. The home page lists all five.

## Capabilities and Constraints
- Tools: video thumbnail (best available up to 1280×720), video transcript (shown as text, downloadable as PDF), channel logo, channel banner (up to 2560 px wide), channel information (title, handle, subscribers, video count, description, keywords; downloadable as JSON).
- Technical: Next.js 14 exported as static files and hosted on cPanel shared hosting; the data comes from a PHP back-end on the same domain under /api (get-assets, download-assets), limited to 30 requests per minute per visitor.
- Page URLs must stay as they are (search ranking).
- Transcripts depend on the video having captions. PDF transcripts can only show Western European characters; other languages are machine-translated to English for the PDF.

## Brand Commitments
- Name: YouTubeDownload, domain youtubedownload.org.
- The visual identity (logo, colours, typography) is free to change.

## Evidence on Hand
- No user numbers, testimonials, reviews, ratings, press or usage statistics exist. Do not invent any.
- Claims removed from the copy because nothing backs them: "millions of users prefer us", "multilanguage support / pick your local language" (no language picker exists), "we do not monetize through ads".
- Existing images in public/: Thumbnail.png, banner.png, captions.png, chinfo.png, logo.png, youtubeLogo.png, favicon.ico.

## Product Principles
1. The tool comes first: paste, one click, result. Nothing gets between a visitor and their asset.
2. Honest copy: describe what the tools really do and nothing more.
3. Fast and usable on a phone.
