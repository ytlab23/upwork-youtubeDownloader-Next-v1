---
version: 1
slug: "app-pages-thumbnail-page-jsx"
primary_target: "app/(pages)/thumbnail/page.jsx"
related_targets: ["app/page.js","app/(pages)/captions/page.jsx","app/(pages)/logo/page.jsx","app/(pages)/banner/page.jsx","app/(pages)/channelinformation/page.jsx"]
---

# Surface brief: youtubedownload.org (whole site)

Scope: home (/) and the five tool pages (/thumbnail, /captions, /logo, /banner, /channelinformation) plus shared chrome and the 404 page. Mode: Operate; the visitor completes one task: paste a YouTube link, get the asset as a file. Home is the tool index, also Operate.

Audience and job: YouTube creators (and anyone) holding a YouTube link who want the thumbnail, transcript, channel logo, banner or channel details now, with no sign-up.

Constraints: page URLs unchanged; API contract unchanged (POST /api/get-assets with content, POST /api/download-assets); page copy kept except the claims PRODUCT.md removes; static export on cPanel; no sales funnel.

Memorable moment: the asset cuts into the viewer and lands as a coloured clip on the session timeline.

## Direction contract

THESIS: Each tool is an editing workspace, not a form on a white card: import a link, the asset cuts into the program viewer, and every pull lands as a clip on a session timeline. Refuses the category default of a centred YouTube-red input pill on white with feature cards.

OWN-WORLD: Flat editor charcoal panels separated by 1px hairlines, no shadows or gradients. Warm off-white text. One playhead accent (vermilion) for the primary action and the playhead. NLE label colours mark each tool: blue thumbnail, amber captions, violet logo, teal banner, green channel info. Archivo (width axis) for UI and display; a mono only for timecode, IDs and file names; tabular numerals.

STORY: The visitor sees the tool's name, pastes a link into the import bar, watches the timecode run while it works, sees the asset at full size with its real resolution and file name, and downloads it. A second link adds a second clip; clicking an earlier clip brings it back.

FIRST VIEWPORT: Top app bar with the wordmark and five workspace tabs (scrollable strip on phones). Left: the page's h1 and import bar (link field plus tool-verb button), one line of guidance. Right, larger: the program viewer at the asset's aspect with corner frame marks, a timecode and status readout, empty state naming what will appear. Directly under: the timeline track with clips and playhead. Primary action: the import button, then Download in the viewer's bar once a result exists.

FORM: Editing Bay (non-linear video editors: Premiere, DaVinci Resolve, Final Cut). Position 1 of 7 on the ordered list; chosen by the user as IMPECCABLE'S PICK over the roll (assigned: The Slate). Seed key 7ae1e3ac.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
