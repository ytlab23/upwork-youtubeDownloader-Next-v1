import { Artboard, Bar, CornerMarks, P, Patch, Playhead, hair } from "./parts";

// Caption clips on the subtitle track, as [x, width]; the waveform goes quiet in the gaps between them.
const CUES = [
  [52, 64],
  [122, 98],
  [226, 54],
  [286, 118],
  [410, 92],
  [508, 80],
];
const ACTIVE_CUE = 3;
const TRANSCRIPT_WIDTHS = [138, 112, 146, 128, 94, 140, 120, 150, 86, 124];
const SPOKEN_ROW = 3;

const inGap = (px) => CUES.every(([x, w]) => px < x || px > x + w);

function amplitude(px) {
  if (inGap(px)) return 0.06;
  const wave = Math.sin(px * 0.071) * 0.55 + Math.sin(px * 0.023 + 1.3) * 0.3 + Math.sin(px * 0.31) * 0.2;
  return Math.min(1, 0.22 + Math.abs(wave) * 0.85);
}

/** One path for many 2px waveform bars centred on the audio track. */
function waveform(positions) {
  return positions
    .map((px) => {
      const height = 3 + amplitude(px) * 32;
      return `M${px - 1} ${(354 - height / 2).toFixed(1)}h2v${height.toFixed(1)}h-2Z`;
    })
    .join("");
}

function Microphone() {
  return (
    <g>
      <rect x={176} y={88} width={18} height={34} rx={9} fill={P.strong} />
      <path d="M180 98H190M180 104H190M180 110H190" stroke={P.panel} strokeWidth={1.5} />
      <path d="M171 106Q171 130 185 130Q199 130 199 106" stroke={P.strong} strokeWidth={2.5} />
      <path d="M185 130V146" stroke={P.strong} strokeWidth={3} />
      <rect x={168} y={146} width={34} height={5} rx={2} fill={P.strong} />
    </g>
  );
}

function VideoFrame() {
  return (
    <g>
      <rect x={40} y={36} width={320} height={180} rx={3} fill={P.panel} stroke={P.line} {...hair} />
      <rect x={232} y={58} width={96} height={72} rx={2} fill={P.raised} stroke={P.line} {...hair} />
      <path d="M280 58V130M232 94H328" stroke={P.line} {...hair} />
      <rect x={41} y={151} width={318} height={64} fill={P.raised} />
      <Microphone />
      <rect x={92} y={164} width={216} height={40} rx={3} fill={P.well} opacity={0.88} />
      <Bar x={106} y={173} w={188} h={8} fill={P.captions} />
      <Bar x={130} y={187} w={140} h={8} fill={P.captions} opacity={0.55} />
      <CornerMarks x={40} y={36} w={320} h={180} />
    </g>
  );
}

function TranscriptPage() {
  return (
    <g>
      <path d="M404 28H578L600 50V268H404Z" fill={P.panel} stroke={P.strong} {...hair} />
      <path d="M578 28V50H600Z" fill={P.raised} stroke={P.strong} {...hair} />
      {TRANSCRIPT_WIDTHS.map((width, row) => {
        const y = 62 + row * 19;
        const spoken = row === SPOKEN_ROW;
        return (
          <g key={row}>
            {spoken && <rect x={410} y={y - 6} width={184} height={17} rx={2} fill={P.raised} />}
            <Bar x={418} y={y} w={12} h={4} fill={spoken ? P.captions : P.strong} />
            <Bar x={438} y={y - 0.5} w={width} h={5} fill={spoken ? P.captions : P.faint} opacity={spoken ? 1 : 0.6} />
          </g>
        );
      })}
    </g>
  );
}

function Timeline() {
  const bars = [];
  for (let px = 54; px <= 586; px += 4) bars.push(px);
  const [activeX, activeW] = CUES[ACTIVE_CUE];
  return (
    <g>
      <rect x={40} y={284} width={560} height={96} rx={4} fill={P.panel} stroke={P.line} {...hair} />
      {CUES.map(([x, w], index) => (
        <g key={x}>
          <rect x={x} y={296} width={w} height={24} rx={2} fill={P.captions} />
          <g opacity={0.35} fill={P.ink}>
            <rect x={x + 6} y={303} width={w - 14} height={2.5} rx={1} />
            <rect x={x + 6} y={310} width={Math.max(8, w - 30)} height={2.5} rx={1} />
          </g>
          {index === ACTIVE_CUE && <rect x={x - 2} y={294} width={w + 4} height={28} rx={3} stroke={P.text} {...hair} strokeWidth={1.5} />}
        </g>
      ))}
      <path d="M40 328H600" stroke={P.line} {...hair} />
      <path d={waveform(bars.filter((px) => px < activeX || px > activeX + activeW))} fill={P.faint} opacity={0.5} />
      <path d={waveform(bars.filter((px) => px >= activeX && px <= activeX + activeW))} fill={P.captions} opacity={0.95} />
    </g>
  );
}

export default function CaptionsArt({ className }) {
  return (
    <Artboard className={className}>
      <VideoFrame />
      <TranscriptPage />
      <Patch d="M308 186H352C380 186 376 119 404 119" from={[308, 186]} to={[404, 119]} color={P.captions} />
      <Timeline />
      <Playhead x={345} top={274} bottom={378} />
    </Artboard>
  );
}
