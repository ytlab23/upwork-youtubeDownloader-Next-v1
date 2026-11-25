import { Artboard, Bar, CornerMarks, P, Patch, hair } from "./parts";

const ROW = { first: 102, step: 31 };
const KEY_WIDTHS = [44, 34, 56, 40, 62, 48, 30, 52];
const VALUE_WIDTHS = [120, 96, 140, 70, 128, 110, 84, 132];
const rowY = (index) => ROW.first + index * ROW.step;

function ChannelPage() {
  return (
    <g>
      <rect x={40} y={48} width={236} height={304} rx={6} fill={P.panel} stroke={P.line} {...hair} />
      <rect x={52} y={60} width={212} height={56} rx={3} fill={P.info} opacity={0.22} />
      <circle cx={92} cy={118} r={26} fill={P.info} stroke={P.panel} strokeWidth={4} />
      <circle cx={92} cy={118} r={10} fill={P.ink} opacity={0.85} />
      <Bar x={128} y={122} w={96} h={10} fill={P.text} opacity={0.9} />
      <Bar x={128} y={138} w={60} h={6} fill={P.faint} />
      {[52, 118, 184].map((x) => (
        <Bar key={x} x={x} y={164} w={56} h={6} fill={P.strong} />
      ))}
      {[184, 252].flatMap((y) =>
        [52, 160].map((x) => (
          <g key={`${x}-${y}`}>
            <rect x={x} y={y} width={100} height={56} rx={2} fill={P.raised} />
            <Bar x={x + 8} y={y + 42} w={46} h={5} fill={P.strong} />
          </g>
        ))
      )}
    </g>
  );
}

function Inspector() {
  return (
    <g>
      <rect x={336} y={28} width={264} height={344} rx={6} fill={P.well} stroke={P.strong} {...hair} />
      <circle cx={362} cy={56} r={12} fill={P.info} />
      <Bar x={382} y={48} w={110} h={8} fill={P.text} opacity={0.9} />
      <Bar x={382} y={61} w={64} h={5} fill={P.faint} />
      <path d="M336 84H600" stroke={P.line} {...hair} />
      <path
        d="M360 97C353 97 352 102 352 110V212C352 220 349 224 344 224C349 224 352 228 352 236V340C352 348 353 353 360 353"
        stroke={P.info}
        {...hair}
        strokeWidth={1.5}
      />
      {KEY_WIDTHS.map((keyWidth, index) => {
        const y = rowY(index);
        return (
          <g key={y}>
            <Bar x={368} y={y} w={keyWidth} h={6} fill={P.info} />
            <Bar x={432} y={y} w={VALUE_WIDTHS[index]} h={6} fill={P.muted} opacity={0.62} />
            {index < KEY_WIDTHS.length - 1 && <path d={`M364 ${y + 18}H588`} stroke={P.line} {...hair} />}
          </g>
        );
      })}
      <CornerMarks x={336} y={28} w={264} h={344} color={P.info} />
    </g>
  );
}

// Where each piece of the channel page lands in the inspector: [start, inspector row].
const LINKS = [
  [[226, 127], 1],
  [[242, 167], 3],
  [[262, 212], 5],
];

export default function ChannelInfoArt({ className }) {
  return (
    <Artboard className={className}>
      <ChannelPage />
      <Inspector />
      {LINKS.map(([[x, y], row]) => {
        const endY = rowY(row) + 3;
        return <Patch key={row} d={`M${x} ${y}H296C318 ${y} 318 ${endY} 340 ${endY}H362`} from={[x, y]} to={[362, endY]} color={P.info} />;
      })}
    </Artboard>
  );
}
