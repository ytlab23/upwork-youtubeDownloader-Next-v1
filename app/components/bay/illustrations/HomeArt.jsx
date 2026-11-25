import { Artboard, Bar, Clip, CornerMarks, P, Playhead, Ruler, dashed, hair } from "./parts";

const TOOL_COLOURS = [P.thumbnail, P.captions, P.logo, P.banner, P.info];

/** Every asset of one channel on the program monitor, each in its tool's colour. */
function Monitor() {
  return (
    <g>
      <rect x={40} y={20} width={560} height={252} rx={6} fill={P.panel} stroke={P.line} {...hair} />
      <rect x={54} y={34} width={532} height={224} rx={3} fill={P.well} />
      <CornerMarks x={54} y={34} w={532} h={224} gap={6} />

      <rect x={70} y={50} width={500} height={54} rx={2} fill={P.banner} />
      <path d="M470 104L510 50H530L490 104ZM500 104L540 50H560L520 104Z" fill={P.ink} opacity={0.15} />

      <circle cx={114} cy={110} r={28} fill={P.logo} stroke={P.well} strokeWidth={5} />
      <circle cx={114} cy={110} r={11} fill={P.ink} opacity={0.85} />
      <circle cx={114} cy={110} r={4} fill={P.logo} />
      <Bar x={152} y={116} w={104} h={10} fill={P.text} opacity={0.9} />
      <Bar x={152} y={132} w={64} h={6} fill={P.faint} />

      <rect x={70} y={156} width={236} height={88} rx={3} fill={P.panel} stroke={P.line} {...hair} />
      {[36, 28, 44, 32].map((keyWidth, row) => (
        <g key={row}>
          <Bar x={84} y={170 + row * 18} w={keyWidth} h={5} fill={P.info} />
          <Bar x={132} y={170 + row * 18} w={[120, 90, 140, 100][row]} h={5} fill={P.muted} opacity={0.6} />
        </g>
      ))}

      <rect x={330} y={118} width={240} height={135} rx={2} fill={P.thumbnail} />
      <path d="M480 118H568Q570 118 570 120V251Q570 253 568 253H480Z" fill={P.ink} opacity={0.22} />
      <Bar x={346} y={136} w={96} h={14} fill={P.ink} r={2} />
      <Bar x={346} y={156} w={70} h={14} fill={P.ink} r={2} />
      <circle cx={525} cy={168} r={20} fill={P.text} />
      <circle cx={525} cy={168} r={29} stroke={P.ink} strokeWidth={3} />
      <rect x={372} y={212} width={156} height={30} rx={2} fill={P.well} opacity={0.88} />
      <Bar x={384} y={219} w={132} h={6} fill={P.captions} />
      <Bar x={400} y={230} w={100} h={6} fill={P.captions} opacity={0.55} />
    </g>
  );
}

export function ToolkitArt({ className }) {
  return (
    <Artboard className={className}>
      <Monitor />
      <rect x={40} y={288} width={560} height={96} rx={6} fill={P.panel} stroke={P.line} {...hair} />
      <Ruler x={48} y={306} w={544} />
      {TOOL_COLOURS.map((colour, index) => (
        <Clip key={colour} x={56 + index * 106} y={318} w={98} color={colour} poster={index === 1 ? "text" : "block"} active={index === 3} />
      ))}
      <Playhead x={423} top={282} bottom={376} />
    </Artboard>
  );
}

/** A clip lifted out of the timeline by the pointer, its slot left dashed behind it. */
export function TakeOutArt({ className }) {
  return (
    <Artboard viewBox="0 0 480 180" className={className}>
      <Ruler x={8} y={90} w={464} />
      <rect x={8} y={96} width={464} height={60} rx={4} fill={P.well} stroke={P.line} {...hair} />
      <Clip x={16} y={104} w={84} color={P.thumbnail} />
      <Clip x={106} y={104} w={110} color={P.captions} poster="text" />
      <Clip x={222} y={104} w={70} color={P.logo} />
      <rect x={298} y={104} width={86} height={44} rx={3} stroke={P.text} opacity={0.5} {...dashed} />
      <Clip x={390} y={104} w={74} color={P.info} />
      <path d="M341 104V72" stroke={P.banner} {...dashed} />
      <Clip x={318} y={22} w={86} color={P.banner} active />
      <path d="M394 50L394 74L400 68.5L405 79.5L409.5 77.5L404.5 66.5L412.5 66.5Z" fill={P.text} stroke={P.ink} strokeLinejoin="round" {...hair} />
      <Playhead x={150} top={74} bottom={166} />
    </Artboard>
  );
}
