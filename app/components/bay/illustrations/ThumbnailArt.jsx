import { Artboard, CornerMarks, P, Playhead, Ruler, dashed, hair } from "./parts";

/** A thumbnail's composition on a 304×171 (16:9) card: title blocks, a ringed subject, an arrow. */
function ThumbnailCard({ x, y, scale = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <rect width={304} height={171} rx={3} fill={P.thumbnail} />
      <path d="M172 0H301Q304 0 304 3V168Q304 171 301 171H172Z" fill={P.ink} opacity={0.22} />
      <rect x={20} y={34} width={124} height={20} rx={2} fill={P.ink} />
      <rect x={20} y={62} width={92} height={20} rx={2} fill={P.ink} />
      <rect x={20} y={96} width={64} height={8} rx={1} fill={P.ink} opacity={0.5} />
      <circle cx={238} cy={84} r={30} fill={P.text} />
      <circle cx={238} cy={84} r={17} stroke={P.thumbnail} strokeWidth={3} />
      <circle cx={238} cy={84} r={44} stroke={P.ink} strokeWidth={4} />
      <path d="M108 128L176 104" stroke={P.ink} strokeWidth={8} strokeLinecap="round" />
      <path d="M194.9 97.3L179.3 113.4L172.7 94.6Z" fill={P.ink} />
      <rect x={268} y={150} width={28} height={13} rx={2} fill={P.ink} opacity={0.85} />
    </g>
  );
}

const FRAME = { w: 78, h: 44, y: 310, gap: 13.6, first: 52, chosen: 3 };
const frameX = (index) => FRAME.first + index * (FRAME.w + FRAME.gap);

/** A plain frame of the same shot: the subject drifts right from frame to frame. */
function PlainFrame({ index }) {
  const x = frameX(index);
  return (
    <g>
      <rect x={x} y={FRAME.y} width={FRAME.w} height={FRAME.h} rx={2} fill={P.raised} stroke={P.line} {...hair} />
      <rect x={x + 1} y={FRAME.y + 33} width={FRAME.w - 2} height={10} fill={P.line} />
      <circle cx={x + 14 + index * 9} cy={FRAME.y + 22} r={8} fill={P.strong} />
    </g>
  );
}

export default function ThumbnailArt({ className }) {
  const chosenX = frameX(FRAME.chosen);
  const perforations = [];
  for (let px = 48; px <= 588; px += 14) perforations.push(px);

  return (
    <Artboard className={className}>
      {/* Pull lines from the chosen frame up to the full-size thumbnail. */}
      <path d={`M${chosenX} ${FRAME.y}L168 199M${chosenX + FRAME.w} ${FRAME.y}L472 199`} stroke={P.strong} {...dashed} />

      <ThumbnailCard x={168} y={28} />
      <CornerMarks x={168} y={28} w={304} h={171} color={P.thumbnail} />

      <rect x={40} y={300} width={560} height={64} rx={4} fill={P.panel} stroke={P.line} {...hair} />
      <path d={perforations.map((px) => `M${px} 303h6v3h-6ZM${px} 358h6v3h-6Z`).join("")} fill={P.line} />
      {[0, 1, 2, 4, 5].map((index) => (
        <PlainFrame key={index} index={index} />
      ))}
      <ThumbnailCard x={chosenX} y={FRAME.y} scale={FRAME.w / 304} />
      <rect x={chosenX - 2} y={FRAME.y - 2} width={FRAME.w + 4} height={FRAME.h + 4} rx={3} stroke={P.text} {...hair} strokeWidth={1.5} />

      <Ruler x={40} y={390} w={560} />
      <Playhead x={chosenX + FRAME.w / 2} top={282} bottom={392} />
    </Artboard>
  );
}
