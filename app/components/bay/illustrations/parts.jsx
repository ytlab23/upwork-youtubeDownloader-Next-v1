// Drawing parts shared by the site's illustrations: flat editor panels, 1px
// hairlines, viewfinder corner marks and the vermilion playhead.
// The palette mirrors DESIGN.md's tokens; SVG fills take literal colours.

export const P = {
  bg: "#111214",
  panel: "#18191c",
  raised: "#212328",
  well: "#0a0b0d",
  line: "#2c2f35",
  strong: "#41454e",
  text: "#ece9e3",
  muted: "#b0b2b8",
  faint: "#8f9299",
  playhead: "#ff5b3a",
  ink: "#111214",
  thumbnail: "#6b97f2",
  captions: "#e8b647",
  logo: "#a888f2",
  banner: "#44c1b8",
  info: "#5cc27a",
};

/** Strokes stay exactly 1px (or the given width) at any rendered size. */
export const hair = { vectorEffect: "non-scaling-stroke", strokeWidth: 1 };
export const dashed = { ...hair, strokeDasharray: "3 4" };

export function Artboard({ children, viewBox = "0 0 640 400", className = "block h-auto w-full" }) {
  return (
    <svg viewBox={viewBox} className={className} fill="none" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg">
      {children}
    </svg>
  );
}

export const Panel = ({ x, y, w, h, r = 6, fill = P.panel, stroke = P.line }) => (
  <rect x={x} y={y} width={w} height={h} rx={r} fill={fill} stroke={stroke} {...hair} />
);

export const Bar = ({ x, y, w, h = 6, fill = P.strong, opacity = 1, r = 1 }) => (
  <rect x={x} y={y} width={w} height={h} rx={r} fill={fill} opacity={opacity} />
);

/** Viewfinder corners drawn `gap` units outside the box. */
export function CornerMarks({ x, y, w, h, color = P.strong, len = 14, gap = 8 }) {
  const l = x - gap;
  const t = y - gap;
  const r = x + w + gap;
  const b = y + h + gap;
  const d = [
    `M${l} ${t + len}V${t}H${l + len}`,
    `M${r - len} ${t}H${r}V${t + len}`,
    `M${r} ${b - len}V${b}H${r - len}`,
    `M${l + len} ${b}H${l}V${b - len}`,
  ].join("");
  return <path d={d} stroke={color} {...hair} />;
}

/** The playhead: a pentagon pin over a 2px line. */
export function Playhead({ x, top, bottom }) {
  return (
    <g>
      <line x1={x} y1={top + 6} x2={x} y2={bottom} stroke={P.playhead} vectorEffect="non-scaling-stroke" strokeWidth={2} />
      <path d={`M${x - 6} ${top}H${x + 6}V${top + 7}L${x} ${top + 12}L${x - 6} ${top + 7}Z`} fill={P.playhead} />
    </g>
  );
}

/** A timeline ruler: ticks rise from the baseline, every fifth one taller. */
export function Ruler({ x, y, w, step = 16, color = P.strong }) {
  const ticks = [];
  for (let index = 0; index * step <= w; index += 1) {
    ticks.push(`M${x + index * step} ${y}v${index % 5 === 0 ? -8 : -4}`);
  }
  return (
    <g>
      <path d={`M${x} ${y}H${x + w}`} stroke={P.line} {...hair} />
      <path d={ticks.join("")} stroke={color} {...hair} />
    </g>
  );
}

/** A simple editor clip: label-colour body, a poster block, and two name bars. */
export function Clip({ x, y, w, h = 44, color, poster = "block", active = false }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={3} fill={color} />
      {poster === "block" && <rect x={x + 4} y={y + 4} width={26} height={h - 8} rx={2} fill={P.ink} opacity={0.22} />}
      {poster === "text" && (
        <g opacity={0.35}>
          {[0, 1, 2, 3, 4].map((row) => (
            <rect key={row} x={x + 5} y={y + 7 + row * 6.5} width={22} height={2.5} rx={1} fill={P.ink} />
          ))}
        </g>
      )}
      <Bar x={x + 38} y={y + 12} w={Math.min(44, w - 46)} h={6} fill={P.ink} opacity={0.8} />
      <Bar x={x + 38} y={y + 24} w={Math.min(30, w - 46)} h={5} fill={P.ink} opacity={0.5} />
      {active && <rect x={x - 2} y={y - 2} width={w + 4} height={h + 4} rx={4} stroke={P.text} {...hair} strokeWidth={1.5} />}
    </g>
  );
}

/** A dashed guide with a round node at each end. */
export function Patch({ d, from, to, color }) {
  return (
    <g>
      <path d={d} stroke={color} {...dashed} opacity={0.75} />
      <circle cx={from[0]} cy={from[1]} r={3} fill={color} />
      <circle cx={to[0]} cy={to[1]} r={3} fill={color} />
    </g>
  );
}
