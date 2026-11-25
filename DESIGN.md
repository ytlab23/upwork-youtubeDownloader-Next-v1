---
name: YouTubeDownload
description: Free YouTube asset tools laid out as a non-linear video editor's workspace.
colors:
  bay-bg: "#111214"
  bay-panel: "#18191c"
  bay-raised: "#212328"
  bay-well: "#0a0b0d"
  bay-line: "#2c2f35"
  bay-line-strong: "#41454e"
  bay-text: "#ece9e3"
  bay-muted: "#b0b2b8"
  bay-faint: "#8f9299"
  bay-playhead: "#ff5b3a"
  bay-playhead-hover: "#ff7c60"
  bay-ink: "#111214"
  bay-danger: "#ff8a7a"
  label-thumbnail: "#6b97f2"
  label-captions: "#e8b647"
  label-logo: "#a888f2"
  label-banner: "#44c1b8"
  label-info: "#5cc27a"
typography:
  display:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(2.4rem, 1.5rem + 3.6vw, 4.5rem)"
    fontWeight: 700
    lineHeight: 0.98
    letterSpacing: "-0.03em"
    fontVariation: "'wdth' 112"
  headline:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(2rem, 1.35rem + 2.4vw, 3.1rem)"
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: "-0.025em"
    fontVariation: "'wdth' 112"
  title:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 1.1rem + 1.4vw, 2.125rem)"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.015em"
    fontVariation: "'wdth' 108"
  subtitle:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 600
    lineHeight: 1.4
  body:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.7
  body-ui-lg:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
  body-ui:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.6
  control:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 500
    lineHeight: 1.5
  readout:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.4
  micro:
    fontFamily: "JetBrains Mono, ui-monospace, SFMono-Regular, monospace"
    fontSize: "11px"
    fontWeight: 400
    lineHeight: 1.55
  ruler:
    fontFamily: "JetBrains Mono, ui-monospace, SFMono-Regular, monospace"
    fontSize: "10px"
    fontWeight: 400
    lineHeight: 1
    fontFeature: "'tnum' 1"
  label:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "12px"
    fontWeight: 600
    letterSpacing: "0.08em"
  mono:
    fontFamily: "JetBrains Mono, ui-monospace, SFMono-Regular, monospace"
    fontSize: "12px"
    fontWeight: 400
    fontFeature: "'tnum' 1"
rounded:
  hair: "2px"
  clip: "3px"
  control: "4px"
  panel: "6px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "20px"
  xl: "28px"
  section: "96px"
components:
  button-primary:
    backgroundColor: "{colors.bay-playhead}"
    textColor: "{colors.bay-ink}"
    rounded: "{rounded.control}"
    padding: "0 20px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.bay-playhead-hover}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.bay-text}"
    rounded: "{rounded.control}"
    padding: "0 20px"
    height: "48px"
  button-outline-hover:
    backgroundColor: "{colors.bay-raised}"
  input-link:
    backgroundColor: "{colors.bay-well}"
    textColor: "{colors.bay-text}"
    rounded: "{rounded.control}"
    padding: "0 14px"
    height: "48px"
  panel:
    backgroundColor: "{colors.bay-panel}"
    rounded: "{rounded.panel}"
  viewer-well:
    backgroundColor: "{colors.bay-well}"
  timeline-clip:
    textColor: "{colors.bay-ink}"
    rounded: "{rounded.clip}"
    height: "44px"
    width: "208px"
  nav-tab:
    textColor: "{colors.bay-muted}"
    height: "56px"
    padding: "0 12px"
  nav-tab-active:
    textColor: "{colors.bay-text}"
---

# Design System: YouTubeDownload

## Overview

**Creative North Star: "The Editing Bay"**

Every tool is an editing workspace, not a form on a white card. A visitor imports a link, the asset cuts into the program monitor, and each pull lands as a colour-labelled clip on a session timeline under a vermilion playhead. The world is the non-linear editor (Premiere, Resolve, Final Cut): flat charcoal panels, 1px hairline dividers, a recessed well for the picture, and the editor's own vocabulary (timecode, a ruler, clips, corner marks), with every word taken from the old site's copy.

Density is that of a working application in the workspace (44-56px bars, 13-15px readouts) and relaxes into a long-form reading column below it. There is one warm accent, the playhead vermilion, and five NLE label colours that identify the tools everywhere they appear: tabs, footer, list markers, viewer tag, clips. Depth comes from tone, never from shadow. The category default this rejects is the centred YouTube-red input pill on white with feature cards.

**Key Characteristics:**
- Flat charcoal panels, separated by 1px hairlines; no shadows.
- One vermilion action at a time in the workspace; vermilion also marks the playhead, focus, caret and selection.
- One label colour per tool, used consistently as the tool's identity.
- Wide Archivo (width axis) for display; mono reserved for timecode, IDs, line numbers and file specs.
- The asset cuts into a corner-marked viewer and lands as a clip on the timeline.

## Colors

A near-black editor charcoal with warm off-white text, one hot vermilion accent and five saturated-but-soft editor label colours.

### Primary
- **Playhead Vermilion** (`bay-playhead`): the single primary action in the workspace, the playhead and its head, step markers, focus rings, text caret, selection, link underlines, and the loading scan line. Hover lightens to **Hot Vermilion** (`bay-playhead-hover`).

### Secondary
The five **Editor Labels** are the system's secondary palette, one per tool, never interchangeable:
- **Thumbnail Blue** (`label-thumbnail`), **Caption Amber** (`label-captions`), **Logo Violet** (`label-logo`), **Banner Teal** (`label-banner`), **Info Green** (`label-info`).
They fill timeline clips (with Ink text), colour each tool's icon in the tabs, footer, home launcher, tile titles and viewer bar, the active tab underline, the corner marks once a picture has loaded, and the home index's wordless drawings.

### Neutral
- **Bay Charcoal** (`bay-bg`): page and app bar background.
- **Panel Charcoal** (`bay-panel`): workspace panels, footer, closing panel, timeline gutters.
- **Raised Charcoal** (`bay-raised`): hover fill on panel items and outline buttons.
- **Monitor Well** (`bay-well`): the recessed picture area of the viewer, inputs, the home launcher.
- **Hairline** (`bay-line`): every divider and panel border; ruler minor ticks.
- **Strong Hairline** (`bay-line-strong`): control borders, ruler major ticks, empty corner marks, empty clip slot.
- **Warm Off-White** (`bay-text`): primary text and the active clip outline.
- **Muted Grey** (`bay-muted`): body and secondary copy.
- **Faint Grey** (`bay-faint`): metadata, placeholders, dt labels, ruler timecode.
- **Ink** (`bay-ink`): text on vermilion and on label colours.
- **Soft Red** (`bay-danger`): error text and the alert icon only.

### Named Rules
**The One Playhead Rule.** Exactly one vermilion action is live in the workspace at a time: the import button before a result; once a result exists the viewer bar's Download turns vermilion and the import button drops to an outline.

**The Label Identity Rule.** A tool's label colour is its identity everywhere; never use a label colour for anything that is not that tool, and never as a page background.

## Typography

**Display Font:** Archivo, variable with the width axis (with system-ui, sans-serif)
**Body Font:** Archivo (same family)
**Label/Mono Font:** JetBrains Mono (with ui-monospace, SFMono-Regular)

**Character:** Archivo stretched wide (112%) gives headings the broad, engineered stance of editor branding; at normal width it is a calm UI face. JetBrains Mono is the machine's voice, used only where the editor itself would print data.

### Hierarchy
- **Display** (home h1): wide, bold, near-solid leading; balanced wrap.
- **Headline** (each tool's h1 inside the workspace; the 404 heading).
- **Title** (long-form section h2s, 108% width; the closing panel heading is wide at a similar size).
- **Subtitle** (17px semibold): list item, step, FAQ and tool-index headings.
- **Body** (17px / 1.7, max 68ch): long-form prose in Muted Grey. UI copy runs 14-16px.
- **Label** (12px semibold, uppercase, 0.08em): clip tool names on the timeline.
- **Mono** (10-15px, tabular): timecode readout (15px), ruler labels (10px), transcript line numbers, clip IDs, channel IDs and JSON field names.

### Named Rules
**The Machine Voice Rule.** Mono is only for timecode, IDs, line numbers and file specs. Headings, buttons and prose are always Archivo.

**The Tabular Rule.** Every changing number (timecode, status timing, resolution readout) uses tabular numerals so it never jitters.

## Layout

A single centred workspace container (max 90rem) with 16px gutters on phones and 24px from 640px. The tool workspace is one bordered panel: on large screens a two-column grid (left column of roughly 0.82fr holding h1, prompt and import bar; right column of 1.6fr holding the viewer bar, the viewer and the transport bar), with the timeline spanning the full width beneath. Below 1024px the columns stack, left above right.

Panel interiors pad 20px on phones and 28px from 640px; bars are 44px tall with 16-20px horizontal padding. Long-form sections sit 80-96px apart, each opened by a hairline rule, with the heading in a 5fr column and the body in a 7fr column on large screens, stacked on phones. The home tool index is a five-up grid of panels separated by 1px gaps over Hairline (two-up at 640px, one-up on phones). The app bar is sticky; its tab strip scrolls horizontally on phones. The timeline scrolls horizontally with a sticky track header.

## Elevation & Depth

The system is flat. There are no box-shadows anywhere. Depth is tonal: Monitor Well sits below Bay Charcoal, which sits below Panel Charcoal, with Raised Charcoal for hover. Hairlines, not shadows, separate every surface. Grids of panels use a 1px gap over a Hairline background so the dividers are the gaps themselves.

### Named Rules
**The Flat Bay Rule.** No shadows, glows or decorative gradients. Linear gradients appear only as drawing tools for instrument marks (ruler minor ticks, the caption clip's text strip), never as fills.

## Shapes

Corners are nearly square, scaled by role: 2px for swatches and the picture frame, 3px for timeline clips and sample frames, 4px for inputs, buttons and readout grids, 6px for top-level panels. Round only where the asset is round (channel logos, avatars, status dots). The recurring silhouettes are the editor's own: 16px viewfinder corner marks drawn in 1px hairlines (inside the monitor when empty; just outside the picture once loaded, in the tool's label colour; vermilion on the 404), and the playhead head, a pentagon pin reused for the numbered step markers.

## Components

### Buttons
Solid, compact and decisive.
- **Shape:** 4px corners, 48px tall in forms (40px in the transport bar), 20px horizontal padding, 15px bold label with an 18px bold Phosphor icon (the tool's own icon on the import button, a download arrow on Download).
- **Primary:** Playhead Vermilion fill with Ink text; hover to Hot Vermilion; colour transition 150ms.
- **Outline:** transparent with a Strong Hairline border and off-white text; hover raises the fill and lightens the border to Faint Grey. The import button becomes this once a result exists.
- **Disabled (pre-result Download):** transparent with Faint Grey text and a not-allowed cursor.
- **Tool chooser (home launcher):** Panel fill, Strong Hairline border, a 6x20px label-colour bar before the tool name.

### Inputs / Fields
- **Style:** Monitor Well fill (Panel fill inside the launcher well), Strong Hairline border, 4px corners, 48px tall, 15px text, Faint Grey placeholder.
- **Focus:** border turns Playhead Vermilion; caret is vermilion.
- **Error:** the error message inside the viewer under a Soft Red warning-circle icon.

### Cards / Containers
- **Corner Style:** 6px.
- **Background:** Panel Charcoal, with Monitor Well for picture and launcher areas.
- **Shadow Strategy:** none (see Elevation & Depth).
- **Border:** 1px Hairline.
- **Internal Padding:** 20px phones, 28px from 640px; 16px in index tiles.

### Navigation
App bar on Bay Charcoal with a bottom hairline: mark and semi-wide wordmark, then five tabs (14px medium, Muted Grey, each led by its tool icon, duotone, in the tool's label colour). Hover and active go off-white; the active tab carries a 2px underline in its label colour. On phones the tabs drop below the wordmark into a horizontal scroll strip. The footer repeats the five tools with swatches.

### Program Viewer (signature)
A 44px bar (the tool icon in its label colour, the old site's result label such as "Transcript", the clip ID in mono, the measured resolution right-aligned for images), then the Monitor Well. Image tools draw a frame in the asset's own aspect ratio (the tool's ratio, then the measured natural ratio) letterboxed inside the monitor, with corner marks just outside the picture; logos crop round. On phones, before a picture arrives, the whole monitor is the frame and the empty icon or error message sits inside it. The empty state is an icon only; loading shows no text. Text tools show a fixed-height monitor with a scrolling readout: numbered transcript lines or the channel's JSON fields listed under their own keys. Loading runs a 1px vermilion scan line across the frame; the result cuts in with a 140ms stepped opacity cut. A transport bar beneath holds the status dot, the mono timecode and Download.

### Session Timeline (signature)
A ruler of 8rem segments with mono timecode on each major tick and minor ticks every 1rem, and one track whose header is a film-strip icon. Each pull adds a 208x44px clip filled with its tool's label colour, carrying a poster of the asset (or a text strip for captions) and the tool name over the clip ID. The newest clip wipes in (320ms clip-path); the active clip gets an off-white outline and the vermilion playhead. An empty session shows a dashed placeholder slot.

### Long-form Article
Hairline-ruled sections in a 5/7 split; item lists of hairline-topped rows with label-colour square markers; numbered steps on playhead-pin markers along a strong hairline; FAQ as hairline-divided disclosures with a rotating chevron; a closing panel holding the closing heading and text, with an illustration beside it on the home page.

### Illustrations
Wordless flat vector drawings in the editor's own language, built in code from the parts kit in `app/components/bay/illustrations/parts.jsx`: panels, 1px non-scaling hairlines (`vector-effect: non-scaling-stroke`), viewfinder corner marks, the vermilion playhead pin, rulers, label-colour clips and dashed patch lines. One drawing per tool, keyed to its label colour and true to what the tool returns (a frame lifted out of a film strip; caption cues aligned to the waveform's quiet gaps beside a transcript page; the profile picture pulled into a square crop; YouTube channel art to scale with TV, desktop, tablet and phone crops; a channel page wired to a data inspector), plus ToolkitArt (all five assets over a five-clip timeline) and TakeOutArt (a clip dragged out of the timeline). Placement: under the heading of each tool page's "why" section (sticky from 1024px), in the home "Why Choose Us?" section and closing panel, and in the home tool-index tiles. The palette object `P` in parts.jsx copies the colour tokens as literal hex values because SVG fills take literals; update it whenever a token changes.

### Site mark and favicon
The mark is a Phosphor DownloadSimple arrow (bold) in Ink on a Playhead Vermilion tile with 5px corners. `public/icon.svg` is the favicon source; `public/favicon.ico` (16, 32 and 48px) and `public/apple-touch-icon.png` (180px, full-bleed) are rendered from it.

## Do's and Don'ts

### Do:
- **Do** keep exactly one vermilion action live in the workspace, handing it from import to Download when a result arrives.
- **Do** mark each tool with its own label colour wherever it appears, and fill its clips with that colour and Ink text.
- **Do** separate surfaces with 1px hairlines and tonal steps (Well, Bay, Panel, Raised).
- **Do** frame pictures at the asset's real aspect ratio with corner marks, letterboxed in the Monitor Well.
- **Do** set display and tool headings in wide Archivo with tight negative tracking.
- **Do** honour reduced motion: the scan, clip wipe and cut animations switch off and smooth scrolling stops.
- **Do** draw every icon from Phosphor only: Image (thumbnail), ClosedCaptioning (captions), UserCircle (logo), Panorama (banner), IdentificationCard (channel information); duotone for tool identity, bold inside buttons, regular elsewhere. Never hand-draw icons.
- **Do** use only the old site's wording for every visible string (deletions allowed, no new sentences or labels); illustrations stay wordless.

### Don't:
- **Don't** use box-shadows, glows or decorative gradient fills.
- **Don't** put words, gradients or shadows in an illustration, or generate one as a raster; illustrations are drawn from the parts kit.
- **Don't** set headings, buttons or prose in mono; mono is for timecode, IDs, line numbers and file specs only.
- **Don't** use a label colour for anything other than its tool, or vermilion for a second competing action.
- **Don't** round corners past 6px except for assets that are round (logos, avatars) and status dots.
- **Don't** fall back to the category default: a centred YouTube-red input pill on white with feature cards.
