import { Artboard, Bar, CornerMarks, P, dashed, hair } from "./parts";

const CROP = { x: 392, y: 72, size: 208 };

/** The channel's round profile picture: a violet disc with a lens-like mark. */
function Avatar({ cx, cy, r, ring = 0 }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={P.logo} stroke={ring ? P.bg : undefined} strokeWidth={ring || undefined} />
      <circle cx={cx} cy={cy} r={r * 0.41} fill={P.ink} opacity={0.85} />
      <circle cx={cx} cy={cy} r={r * 0.15} fill={P.logo} />
    </g>
  );
}

function ChannelHeader() {
  return (
    <g>
      <rect x={40} y={48} width={300} height={72} rx={3} fill={P.logo} opacity={0.22} />
      <path d="M180 120L250 48H290L220 120Z" fill={P.logo} opacity={0.16} />
      <path d="M240 120L310 48H330L260 120Z" fill={P.logo} opacity={0.1} />
      <Avatar cx={100} cy={128} r={34} ring={5} />
      <rect x={66} y={94} width={68} height={68} stroke={P.strong} {...dashed} />
      <Bar x={52} y={182} w={104} h={11} fill={P.text} opacity={0.9} />
      <Bar x={52} y={200} w={70} h={7} fill={P.faint} />
      {[40, 130, 220].map((x) => (
        <g key={x}>
          <rect x={x} y={236} width={80} height={46} rx={2} fill={P.raised} />
          <Bar x={x + 8} y={266} w={40} h={5} fill={P.strong} />
          <Bar x={x} y={292} w={60} h={5} fill={P.line} />
        </g>
      ))}
    </g>
  );
}

function CropFrame() {
  const { x, y, size } = CROP;
  const third = size / 3;
  const handles = [0, 0.5, 1].flatMap((fx) => [0, 0.5, 1].map((fy) => [fx, fy])).filter(([fx, fy]) => !(fx === 0.5 && fy === 0.5));
  return (
    <g>
      <rect x={x} y={y} width={size} height={size} fill={P.well} />
      <Avatar cx={x + size / 2} cy={y + size / 2} r={94} />
      <path
        d={`M${x + third} ${y}V${y + size}M${x + 2 * third} ${y}V${y + size}M${x} ${y + third}H${x + size}M${x} ${y + 2 * third}H${x + size}`}
        stroke={P.text}
        opacity={0.22}
        {...hair}
      />
      <rect x={x} y={y} width={size} height={size} stroke={P.text} opacity={0.75} {...hair} />
      {handles.map(([fx, fy]) => (
        <rect key={`${fx}-${fy}`} x={x + fx * size - 3} y={y + fy * size - 3} width={6} height={6} fill={P.text} />
      ))}
      <CornerMarks x={x} y={y} w={size} h={size} color={P.logo} gap={11} />
      {/* Measurement lines: the square's width and height. */}
      <path
        d={`M${x} ${y + size + 22}H${x + size}M${x} ${y + size + 17}V${y + size + 27}M${x + size} ${y + size + 17}V${y + size + 27}`}
        stroke={P.faint}
        {...hair}
      />
      <path d={`M${x + size + 22} ${y}V${y + size}M${x + size + 17} ${y}H${x + size + 27}M${x + size + 17} ${y + size}H${x + size + 27}`} stroke={P.faint} {...hair} />
    </g>
  );
}

export default function LogoArt({ className }) {
  return (
    <Artboard className={className}>
      {/* Lowered so the drawing sits centred on the artboard. */}
      <g transform="translate(0 26)">
        <ChannelHeader />
        {/* Pull lines from the profile picture's box to the square crop. */}
        <path d={`M134 94L${CROP.x} ${CROP.y}M134 162L${CROP.x} ${CROP.y + CROP.size}`} stroke={P.strong} {...dashed} />
        <CropFrame />
      </g>
    </Artboard>
  );
}
