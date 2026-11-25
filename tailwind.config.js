/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bay: {
          bg: "var(--bay-bg)",
          panel: "var(--bay-panel)",
          raised: "var(--bay-raised)",
          well: "var(--bay-well)",
          line: "var(--bay-line)",
          "line-strong": "var(--bay-line-strong)",
          text: "var(--bay-text)",
          muted: "var(--bay-muted)",
          faint: "var(--bay-faint)",
          playhead: "var(--bay-playhead)",
          "playhead-hover": "var(--bay-playhead-hover)",
          ink: "var(--bay-ink)",
          danger: "var(--bay-danger)",
        },
      },
      fontFamily: {
        sans: ["var(--font-archivo)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      maxWidth: {
        workspace: "90rem",
        prose: "68ch",
      },
    },
  },
  plugins: [],
};
