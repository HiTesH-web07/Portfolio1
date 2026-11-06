'use client';
// One character, many poses. Head, face and body are shared so proportions never drift;
// each pose only swaps arms and props, and each expression only swaps brows, eyes and mouth.
import { createContext, useContext, useId } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

const Ids = createContext({ hood: 'av-hood', skin: 'av-skin', hair: 'av-hair' });
import type { Pose } from '@/data/content';

export type Expression = 'smile' | 'joy' | 'focus' | 'puzzled' | 'curious' | 'calm';

const DEFAULT_EXPR: Record<Pose, Expression> = {
  wave: 'smile', explore: 'curious', laptop: 'focus', think: 'focus', puzzled: 'puzzled', celebrate: 'joy', closing: 'calm',
};

const C = {
  // Drawn from Hitesh's photos: warm light skin, dark hair with short sides and volume on top,
  // a trimmed beard with moustache, an olive bomber jacket over a black tee.
  hoodie: '#4E5240', hoodieLight: '#666B51', hoodieDark: '#3A3D2F', skin: '#E2B38F', skinLight: '#F1CFB2', skinShade: '#C8936E',
  hair: '#17120F', hairLight: '#3D2E25', beard: '#2B1F18', tee: '#1E1D1B', ink: '#24231F', cream: '#F1EBDD', clay: '#E8C6B8', sage: '#D9E4DC', lid: '#E4DDCD', lidEdge: '#C9C0AC', mouth: '#6B3326',
};

const LS = { x: 94, y: 300 }; // left shoulder (viewer's left)
const RS = { x: 266, y: 300 };

function Arm({ d, hand, front = false }: { d: string; hand: [number, number]; front?: boolean }) {
  const id = useContext(Ids);
  return (
    <g>
      <path d={d} stroke={`url(#${id.hood})`} strokeWidth={32} strokeLinecap="round" fill="none" />
      <path d={d} stroke={C.hoodieDark} strokeOpacity={front ? 0.25 : 0.15} strokeWidth={2} strokeLinecap="round" fill="none" />
      <circle cx={hand[0]} cy={hand[1]} r={15} fill={`url(#${id.skin})`} />
      <circle cx={hand[0] - 4} cy={hand[1] - 5} r={4} fill={C.skinLight} opacity={0.6} />
    </g>
  );
}

function Laptop({ closing = false, error = false }: { closing?: boolean; error?: boolean }) {
  if (closing) {
    return (
      <g>
        <path d="M84 330 L276 330 L292 382 L68 382 Z" fill={C.lid} stroke={C.lidEdge} strokeWidth={2} />
        <rect x={60} y={380} width={240} height={14} rx={7} fill={C.lidEdge} />
        <circle cx={180} cy={356} r={7} fill={C.sage} />
      </g>
    );
  }
  return (
    <g>
      <rect x={90} y={262} width={180} height={120} rx={14} fill={C.lid} stroke={C.lidEdge} strokeWidth={2} />
      {/* stickers: a stacked-stone mark and a code bracket */}
      <g transform="translate(206 318)">
        <rect x={0} y={0} width={40} height={40} rx={12} fill={C.sage} />
        <ellipse cx={20} cy={29} rx={12} ry={4.5} fill={C.hoodie} />
        <ellipse cx={20} cy={20} rx={8.5} ry={3.8} fill={C.clay} stroke={C.hoodie} strokeWidth={1.5} />
        <ellipse cx={20} cy={12.5} rx={5} ry={3} fill={C.hoodie} />
      </g>
      <rect x={108} y={280} width={38} height={22} rx={6} fill={C.ink} />
      <text x={127} y={296} textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize={12} fill={C.cream}>{'</>'}</text>
      <rect x={60} y={380} width={240} height={14} rx={7} fill={C.lidEdge} />
      {error && (
        <g>
          <circle cx={100} cy={268} r={16} fill="#C2553D" />
          <text x={100} y={274} textAnchor="middle" fontFamily="system-ui" fontWeight={700} fontSize={18} fill="#fff">!</text>
        </g>
      )}
    </g>
  );
}


function layers(pose: Pose): { back: React.ReactNode; front: React.ReactNode } {
  switch (pose) {
    case 'laptop':
      return {
        back: (<><Arm d={`M${LS.x} ${LS.y} Q 92 350 122 372`} hand={[122, 372]} /><Arm d={`M${RS.x} ${RS.y} Q 268 350 238 372`} hand={[238, 372]} /><Laptop /></>),
        front: null,
      };
    case 'think':
      return {
        back: (<><Arm d={`M${LS.x} ${LS.y} Q 92 350 122 372`} hand={[122, 372]} /><Laptop /></>),
        front: <Arm d={`M${RS.x} ${RS.y} Q 300 262 214 222`} hand={[212, 220]} front />,
      };
    case 'puzzled':
      return {
        back: (<><Arm d={`M${LS.x} ${LS.y} Q 92 350 122 372`} hand={[122, 372]} /><Laptop error /></>),
        front: (
          <>
            <Arm d={`M${RS.x} ${RS.y} Q 310 210 246 108`} hand={[244, 104]} front />
            <text x={300} y={70} fontFamily="Space Grotesk Variable, system-ui" fontWeight={600} fontSize={34} fill={C.ink} opacity={0.75}>?</text>
          </>
        ),
      };
    case 'wave':
      return {
        back: <Arm d={`M${LS.x} ${LS.y} Q 76 350 92 400`} hand={[92, 410]} />,
        front: (
          <g className="av-wave" style={{ transformOrigin: `${RS.x}px ${RS.y}px` }}>
            <Arm d={`M${RS.x} ${RS.y} Q 318 250 306 170`} hand={[306, 166]} front />
            <rect x={296} y={136} width={7} height={20} rx={3.5} fill={C.skin} />
            <rect x={305} y={133} width={7} height={22} rx={3.5} fill={C.skin} />
            <rect x={314} y={138} width={7} height={19} rx={3.5} fill={C.skin} />
          </g>
        ),
      };
    case 'explore':
      return {
        back: <Arm d={`M${LS.x} ${LS.y} Q 76 350 92 400`} hand={[92, 410]} />,
        front: (
          <>
            <Arm d={`M${RS.x} ${RS.y} Q 320 286 300 232`} hand={[300, 228]} front />
            <line x1={300} y1={226} x2={314} y2={196} stroke={C.ink} strokeWidth={9} strokeLinecap="round" />
            <circle cx={322} cy={170} r={27} fill={C.sage} fillOpacity={0.55} stroke={C.ink} strokeWidth={7} />
            <path d="M310 158 q8 -8 18 -4" stroke="#fff" strokeWidth={4} strokeLinecap="round" fill="none" opacity={0.8} />
          </>
        ),
      };
    case 'celebrate':
      return {
        back: null,
        front: (
          <>
            <Arm d={`M${LS.x} ${LS.y} Q 46 232 74 150`} hand={[74, 146]} front />
            <Arm d={`M${RS.x} ${RS.y} Q 314 232 286 150`} hand={[286, 146]} front />
            {[[40, 90, C.clay, 12], [318, 84, C.hoodieLight, -18], [60, 40, C.sage, 30], [300, 34, C.clay, 8], [180, 18, C.hoodieLight, -10]].map(([x, y, f, r], i) => (
              <rect key={i} x={x as number} y={y as number} width={14} height={7} rx={2} fill={f as string} transform={`rotate(${r} ${x} ${y})`} />
            ))}
          </>
        ),
      };
    case 'closing':
      return {
        back: (<><Laptop closing /><Arm d={`M${LS.x} ${LS.y} Q 92 336 134 332`} hand={[136, 332]} /><Arm d={`M${RS.x} ${RS.y} Q 268 336 226 332`} hand={[224, 332]} /></>),
        front: null,
      };
  }
}

function Face({ expr, look }: { expr: Expression; look: { x: number; y: number } }) {
  const eyesHappy = expr === 'joy' || expr === 'calm';
  const brows: Record<Expression, [string, string]> = {
    smile: ['M144 134 q14 -8 28 -2', 'M188 132 q14 -6 28 2'],
    joy: ['M144 130 q14 -10 28 -3', 'M188 127 q14 -7 28 3'],
    focus: ['M145 138 q14 -4 28 2', 'M187 140 q14 -6 28 -2'],
    puzzled: ['M145 140 q14 -2 27 0', 'M188 126 q14 -10 28 2'],
    curious: ['M144 126 q14 -10 28 -3', 'M188 124 q14 -8 28 3'],
    calm: ['M144 136 q14 -6 28 -1', 'M188 135 q14 -5 28 1'],
  };
  const mouth: Record<Expression, React.ReactNode> = {
    smile: <g><path d="M164 191 Q180 210 196 191 Z" fill={C.mouth} /><path d="M166 192 Q180 199 194 192 Z" fill="#fff" /></g>,
    joy: <g><path d="M161 189 Q180 218 199 189 Z" fill={C.mouth} /><path d="M163 190 Q180 199 197 190 Z" fill="#fff" /></g>,
    focus: <path d="M170 196 q10 3 20 0" stroke={C.mouth} strokeWidth={4.5} strokeLinecap="round" fill="none" />,
    puzzled: <path d="M167 198 q6 -5 12 0 q6 5 13 -1" stroke={C.mouth} strokeWidth={4.5} strokeLinecap="round" fill="none" />,
    curious: <ellipse cx={183} cy={196} rx={5.5} ry={6.5} fill={C.mouth} />,
    calm: <path d="M166 194 Q180 203 194 194" stroke={C.mouth} strokeWidth={4.5} strokeLinecap="round" fill="none" />,
  };
  return (
    <AnimatePresence mode="popLayout" initial={false}>
      <motion.g key={expr} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
        <g stroke={C.hair} strokeWidth={6.5} strokeLinecap="round" fill="none">
          <path d={brows[expr][0]} /><path d={brows[expr][1]} />
        </g>
        {eyesHappy ? (
          <g stroke={C.ink} strokeWidth={4.5} strokeLinecap="round" fill="none">
            <path d="M150 158 q8 -9 16 0" /><path d="M194 158 q8 -9 16 0" />
          </g>
        ) : (
          <g className="av-eyes">
            <g style={{ transform: `translate(${look.x}px, ${look.y}px)`, transition: 'transform .12s linear' }}>
              <ellipse cx={158} cy={157} rx={7.5} ry={9.5} fill={C.ink} />
              <ellipse cx={202} cy={157} rx={7.5} ry={9.5} fill={C.ink} />
              <circle cx={160.5} cy={153} r={2.6} fill="#fff" />
              <circle cx={204.5} cy={153} r={2.6} fill="#fff" />
            </g>
          </g>
        )}
        {mouth[expr]}
      </motion.g>
    </AnimatePresence>
  );
}

export default function Avatar({
  pose, expression, look = { x: 0, y: 0 }, className = '', title, float = true, crop = false,
}: { pose: Pose; expression?: Expression; look?: { x: number; y: number }; className?: string; title?: string; float?: boolean; crop?: boolean }) {
  const reduce = useReducedMotion();
  const uid = useId().replace(/:/g, '');
  const ids = { hood: `h${uid}`, skin: `s${uid}`, hair: `r${uid}` };
  const expr = expression ?? DEFAULT_EXPR[pose];
  const L = layers(pose);
  const lookIn = pose === 'explore' ? { x: 3, y: 1 } : look;
  const t = { duration: reduce ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] as const };
  return (
    <Ids.Provider value={ids}><svg viewBox={crop ? '92 52 176 176' : '0 0 360 400'} className={className} role="img" aria-label={title ?? `Illustration of Hitesh, ${pose}`}>
      <defs>
        <linearGradient id={ids.hood} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={C.hoodieLight} /><stop offset="1" stopColor={C.hoodie} /></linearGradient>
        <radialGradient id={ids.skin} cx=".38" cy=".32" r=".8"><stop offset="0" stopColor={C.skinLight} /><stop offset="1" stopColor={C.skin} /></radialGradient>
        <linearGradient id={ids.hair} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor={C.hairLight} /><stop offset=".6" stopColor={C.hair} /></linearGradient>
      </defs>
      <ellipse cx={180} cy={394} rx={130} ry={7} fill={C.ink} opacity={0.08} />
      <g className={float && !reduce && !crop ? 'av-float' : undefined}>
        {/* body: olive bomber jacket, open over a black tee */}
        <path d="M60 400 C60 304 102 256 180 252 C258 256 300 304 300 400 Z" fill={`url(#${ids.hood})`} />
        <rect x={163} y={204} width={34} height={56} rx={15} fill={C.skinShade} />
        <path d="M146 256 Q180 276 214 256 L224 400 L136 400 Z" fill={C.tee} />
        <path d="M156 258 Q180 274 204 258" stroke={C.skinShade} strokeWidth={3} fill="none" opacity={0.6} />
        <path d="M150 250 L124 262 L144 306 L160 264 Z" fill={C.hoodieLight} />
        <path d="M210 250 L236 262 L216 306 L200 264 Z" fill={C.hoodieLight} />
        <g stroke={C.hoodieDark} strokeWidth={2.5} strokeLinecap="round"><path d="M144 306 L140 400" /><path d="M216 306 L220 400" /></g>
        <rect x={84} y={338} width={30} height={5} rx={2.5} fill={C.hoodieDark} opacity={0.5} />
        <rect x={246} y={338} width={30} height={5} rx={2.5} fill={C.hoodieDark} opacity={0.5} />

        <AnimatePresence initial={false}>
          <motion.g key={`b-${pose}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }} transition={t}>{L.back}</motion.g>
        </AnimatePresence>

        {/* head */}
        <ellipse cx={120} cy={160} rx={10} ry={15} fill={C.skinShade} />
        <ellipse cx={240} cy={160} rx={10} ry={15} fill={C.skinShade} />
        <ellipse cx={180} cy={152} rx={60} ry={74} fill={`url(#${ids.skin})`} />
        {/* short faded sides */}
        <ellipse cx={125} cy={124} rx={7} ry={17} fill={C.hair} opacity={0.35} />
        <ellipse cx={235} cy={124} rx={7} ry={17} fill={C.hair} opacity={0.35} />
        {/* volume on top, swept up and back */}
        <path d="M119 140 C112 96 132 58 172 50 C202 44 240 54 251 84 C257 104 253 124 245 140 C241 122 234 110 224 103 C210 96 190 95 173 97 C156 100 140 110 130 122 C125 128 121 134 119 140 Z" fill={`url(#${ids.hair})`} />
        <g stroke={C.hairLight} strokeWidth={4} strokeLinecap="round" fill="none" opacity={0.9}>
          <path d="M150 74 C174 54 212 54 234 74" /><path d="M162 88 C186 72 216 74 236 90" />
        </g>
        {/* trimmed beard, moustache and chin */}
        <path d="M122 166 C124 202 148 232 180 234 C212 232 236 202 238 166 C233 184 224 198 213 206 C203 213 192 216 180 216 C168 216 157 213 147 206 C136 198 127 184 122 166 Z" fill={C.beard} opacity={0.62} />
        <path d="M163 186 Q171 179 180 183 Q189 179 197 186 Q189 188 180 187 Q171 188 163 186 Z" fill={C.beard} />
        <ellipse cx={180} cy={211} rx={8} ry={6} fill={C.beard} opacity={0.9} />
        <ellipse cx={144} cy={176} rx={10} ry={5} fill="#E58D74" opacity={0.16} />
        <ellipse cx={216} cy={176} rx={10} ry={5} fill="#E58D74" opacity={0.16} />
        <path d="M181 158 q5 13 -4 18" stroke={C.skinShade} strokeWidth={3.5} strokeLinecap="round" fill="none" />
        <Face expr={expr} look={lookIn} />

        <AnimatePresence initial={false}>
          <motion.g key={`f-${pose}`} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }} transition={t}>{L.front}</motion.g>
        </AnimatePresence>
      </g>
    </svg></Ids.Provider>
  );
}
