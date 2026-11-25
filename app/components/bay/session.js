// The session timeline: every asset pulled in this browser tab, across tools.
// Kept in sessionStorage so it follows the visitor from tool to tool.

const KEY = "ytd-timeline";
const MAX_CLIPS = 12;

export function readClips() {
  try {
    const stored = JSON.parse(window.sessionStorage.getItem(KEY) ?? "[]");
    return Array.isArray(stored) ? stored.filter((clip) => clip && clip.tool && clip.url) : [];
  } catch {
    return [];
  }
}

/** Adds a clip (moving an existing one for the same tool and link to the end) and returns the new list. */
export function rememberClip(clips, clip) {
  const others = clips.filter((existing) => !(existing.tool === clip.tool && existing.url === clip.url));
  const next = [...others, clip].slice(-MAX_CLIPS);
  try {
    window.sessionStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // Private browsing or full storage: the timeline simply lasts for this page view.
  }
  return next;
}

export const clipKey = (clip) => `${clip.tool}:${clip.url}`;
