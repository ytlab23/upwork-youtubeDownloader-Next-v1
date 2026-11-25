import { Artboard, CornerMarks, P, hair } from "./parts";

// YouTube channel art to scale: the 2560×1440 canvas TVs show, the 2560×423 strip desktops show,
// the 1855-wide crop tablets show and the 1546-wide safe area every device shows.
const CANVAS = { x: 80, y: 24, w: 480, h: 270 };
const BAND = { y: 120, h: 80 };
const scaleX = CANVAS.w / 2560;
const centred = (width) => CANVAS.x + (CANVAS.w - width * scaleX) / 2;

function BandArt({ x, y, w }) {
  const s = w / CANVAS.w;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect width={CANVAS.w} height={BAND.h} fill={P.banner} />
      {[330, 380, 430].map((left, index) => (
        <path key={left} d={`M${left - 80} ${BAND.h}L${left - 20} 0H${left + 10}L${left - 50} ${BAND.h}Z`} fill={P.ink} opacity={0.16 - index * 0.04} />
      ))}
      <circle cx={188} cy={40} r={18} fill={P.ink} opacity={0.85} />
      <rect x={216} y={28} width={96} height={10} rx={1} fill={P.ink} />
      <rect x={216} y={44} width={64} height={7} rx={1} fill={P.ink} opacity={0.6} />
    </g>
  );
}

function Canvas() {
  const { x, y, w, h } = CANVAS;
  const grid = [];
  for (let gx = x + 40; gx < x + w; gx += 40) grid.push(`M${gx} ${y}V${y + h}`);
  for (let gy = y + 45; gy < y + h; gy += 45) grid.push(`M${x} ${gy}H${x + w}`);
  const safeX = centred(1546);
  const tabletX = centred(1855);
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={3} fill={P.panel} stroke={P.line} {...hair} />
      <path d={grid.join("")} stroke={P.line} opacity={0.7} {...hair} />
      <BandArt x={x} y={BAND.y} w={w} />
      <rect x={tabletX} y={BAND.y} width={1855 * scaleX} height={BAND.h} stroke={P.ink} opacity={0.55} {...hair} strokeDasharray="2 4" />
      <rect x={safeX} y={BAND.y} width={1546 * scaleX} height={BAND.h} stroke={P.text} opacity={0.9} {...hair} strokeDasharray="4 4" />
      <CornerMarks x={x} y={BAND.y} w={w} h={BAND.h} color={P.banner} />
      <path d={`M${x} ${y + h + 12}H${x + w}M${x} ${y + h + 7}V${y + h + 17}M${x + w} ${y + h + 7}V${y + h + 17}`} stroke={P.faint} {...hair} />
      <path
        d={`M${x + w + 22} ${BAND.y}V${BAND.y + BAND.h}M${x + w + 17} ${BAND.y}H${x + w + 27}M${x + w + 17} ${BAND.y + BAND.h}H${x + w + 27}`}
        stroke={P.faint}
        {...hair}
      />
    </g>
  );
}

/** The banner strip cropped to a centred `sourceWidth` (in YouTube pixels), drawn `w` wide at (x, y). */
function CroppedBand({ x, y, w, sourceWidth }) {
  const share = sourceWidth / 2560;
  const viewWidth = CANVAS.w * share;
  return (
    <svg x={x} y={y} width={w} height={(w * BAND.h) / viewWidth} viewBox={`${(CANVAS.w - viewWidth) / 2} 0 ${viewWidth} ${BAND.h}`}>
      <BandArt x={0} y={0} w={CANVAS.w} />
    </svg>
  );
}

/** Grey page content under the banner on a device screen. */
const ContentBars = ({ x, y, w }) => (
  <g fill={P.line}>
    <rect x={x} y={y} width={w} height={4} rx={1} />
    <rect x={x} y={y + 8} width={w * 0.7} height={4} rx={1} />
  </g>
);

/** How each device crops the same art: TV shows the whole canvas, desktop the full strip, tablet 1855, phone the 1546 safe area. */
function Devices() {
  return (
    <g>
      {/* TV: a 16:9 screen on two splayed feet, showing the full 2560×1440 canvas. */}
      <rect x={92} y={322} width={112} height={65} rx={3} fill={P.well} stroke={P.strong} {...hair} />
      <rect x={96} y={326} width={104} height={58.5} fill={P.panel} />
      <BandArt x={96} y={326 + 58.5 * (96 / 270)} w={104} />
      <path d="M108 387L102 395M188 387L194 395" stroke={P.strong} {...hair} />

      {/* Desktop: a browser window with the full 2560×423 strip across its top. */}
      <rect x={222} y={318} width={150} height={76} rx={4} fill={P.well} stroke={P.strong} {...hair} />
      <path d="M222 329H372" stroke={P.strong} {...hair} />
      <g fill={P.strong}>
        <circle cx={229} cy={323.5} r={1.6} />
        <circle cx={235} cy={323.5} r={1.6} />
        <circle cx={241} cy={323.5} r={1.6} />
      </g>
      <BandArt x={226} y={333} w={142} />
      <g fill={P.raised}>
        {[226, 262, 298, 334].map((x) => (
          <rect key={x} x={x} y={360} width={32} height={15} rx={1.5} />
        ))}
      </g>
      <ContentBars x={226} y={380} w={60} />

      {/* Tablet: landscape, showing the centred 1855-wide crop. */}
      <rect x={390} y={326} width={94} height={64} rx={6} fill={P.well} stroke={P.strong} {...hair} />
      <CroppedBand x={396} y={332} w={82} sourceWidth={1855} />
      <ContentBars x={396} y={358} w={70} />

      {/* Phone: the 1546-wide safe area that every device shows. */}
      <rect x={502} y={318} width={44} height={76} rx={7} fill={P.well} stroke={P.strong} {...hair} />
      <CroppedBand x={506} y={330} w={36} sourceWidth={1546} />
      <ContentBars x={506} y={346} w={36} />
    </g>
  );
}

export default function BannerArt({ className }) {
  return (
    <Artboard className={className}>
      <Canvas />
      <Devices />
    </Artboard>
  );
}
