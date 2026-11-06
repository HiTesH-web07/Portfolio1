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
  const n = (d.match(/-?\d+(\.\d+)?/g) ?? []).map(Number); // M x y Q cx cy ex ey
  const [cx, cy] = [n[2] ?? hand[0], n[3] ?? hand[1] - 1];
  let dx = hand[0] - cx, dy = hand[1] - cy; const len = Math.hypot(dx, dy) || 1; dx /= len; dy /= len;
  const px = -dy, py = dx; // perpendicular
  const r = (v: number) => Math.round(v * 10) / 10; // same string on server and client
  const ang = r((Math.atan2(dy, dx) * 180) / Math.PI - 90);
  const cuffX = hand[0] - dx * 15, cuffY = hand[1] - dy * 15;
  return (
    <g>
      <path d={d} stroke={`url(#${id.hood})`} strokeWidth={33} strokeLinecap="round" fill="none" />
      <path d={d} stroke="#fff" strokeOpacity={0.07} strokeWidth={10} strokeLinecap="round" fill="none" transform={`translate(${r(-px * 7)} ${r(-py * 7)})`} />
      <path d={d} stroke={C.hoodieDark} strokeOpacity={front ? 0.3 : 0.2} strokeWidth={2} strokeLinecap="round" fill="none" />
      <line x1={r(cuffX + px * 14)} y1={r(cuffY + py * 14)} x2={r(cuffX - px * 14)} y2={r(cuffY - py * 14)} stroke={C.hoodieDark} strokeWidth={8} strokeLinecap="round" />
      <ellipse cx={hand[0]} cy={hand[1]} rx={12} ry={14.5} fill={`url(#${id.skin})`} transform={`rotate(${ang} ${hand[0]} ${hand[1]})`} />
      <ellipse cx={r(hand[0] + px * 11 - dx * 2)} cy={r(hand[1] + py * 11 - dy * 2)} rx={4.5} ry={8} fill={C.skin} transform={`rotate(${r(ang + 25)} ${r(hand[0] + px * 11 - dx * 2)} ${r(hand[1] + py * 11 - dy * 2)})`} />
      <path d={`M${r(hand[0] - px * 7 + dx * 6)} ${r(hand[1] - py * 7 + dy * 6)} L${r(hand[0] + px * 5 + dx * 7)} ${r(hand[1] + py * 5 + dy * 7)}`} stroke={C.skinShade} strokeWidth={1.6} strokeLinecap="round" opacity={0.6} />
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
  const eyeClip = `${useContext(Ids).hair}e`;
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
            <path d="M147 157 C151 149 165 149 169 157 C165 163 151 163 147 157 Z" fill="#FBF7F2" />
            <path d="M191 157 C195 149 209 149 213 157 C209 163 195 163 191 157 Z" fill="#FBF7F2" />
            <path d="M147 156 C151 149 165 149 169 156" stroke={C.ink} strokeWidth={2.4} strokeLinecap="round" fill="none" />
            <path d="M191 156 C195 149 209 149 213 156" stroke={C.ink} strokeWidth={2.4} strokeLinecap="round" fill="none" />
            <clipPath id={eyeClip}><path d="M147 157 C151 149 165 149 169 157 C165 163 151 163 147 157 Z M191 157 C195 149 209 149 213 157 C209 163 195 163 191 157 Z" /></clipPath>
            <g clipPath={`url(#${eyeClip})`}><g style={{ transform: `translate(${look.x * 0.7}px, ${look.y * 0.5}px)`, transition: 'transform .45s cubic-bezier(.22,1,.36,1)' }}>
              <circle cx={158} cy={157} r={6.2} fill="#4A3122" />
              <circle cx={202} cy={157} r={6.2} fill="#4A3122" />
              <circle cx={158} cy={157} r={3.4} fill="#120D0A" />
              <circle cx={202} cy={157} r={3.4} fill="#120D0A" />
              <circle cx={160.2} cy={154.6} r={1.9} fill="#fff" />
              <circle cx={204.2} cy={154.6} r={1.9} fill="#fff" />
            </g></g>
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
    <Ids.Provider value={ids}><svg viewBox={crop ? '88 38 184 196' : '0 0 360 400'} className={className} role="img" aria-label={title ?? `Illustration of Hitesh, ${pose}`}>
      <defs>
        <linearGradient id={ids.hood} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={C.hoodieLight} /><stop offset="1" stopColor={C.hoodie} /></linearGradient>
        <radialGradient id={ids.skin} cx=".38" cy=".32" r=".8"><stop offset="0" stopColor={C.skinLight} /><stop offset="1" stopColor={C.skin} /></radialGradient>
        <linearGradient id={ids.hair} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor={C.hairLight} /><stop offset=".6" stopColor={C.hair} /></linearGradient>
      </defs>
      <ellipse cx={180} cy={394} rx={130} ry={7} fill={C.ink} opacity={0.08} />
      <g className={float && !crop ? 'av-float' : undefined}>
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

        <ellipse cx={180} cy={222} rx={20} ry={7} fill={C.skinShade} opacity={0.9} />
        <g transform="translate(180 232) scale(0.92) translate(-180 -232)">
        {/* head: drawn from Hitesh's photos */}
        <defs>
          <radialGradient id={`${ids.hair}b`} cx=".5" cy=".95" r=".75">
            <stop offset="0" stopColor={C.beard} stopOpacity={0.95} />
            <stop offset=".55" stopColor={C.beard} stopOpacity={0.8} />
            <stop offset="1" stopColor={C.beard} stopOpacity={0.45} />
          </radialGradient>
          <linearGradient id={`${ids.hair}f`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={C.hair} stopOpacity={0.95} />
            <stop offset=".55" stopColor={C.hair} stopOpacity={0.55} />
            <stop offset="1" stopColor={C.hair} stopOpacity={0.15} />
          </linearGradient>
        </defs>
        <ellipse cx={121} cy={160} rx={10} ry={15} fill={C.skinShade} />
        <ellipse cx={239} cy={160} rx={10} ry={15} fill={C.skinShade} />
        <path d="M118 154 q4 6 2 12" stroke="#A9765A" strokeWidth={2} fill="none" strokeLinecap="round" /><path d="M242 154 q-4 6 -2 12" stroke="#A9765A" strokeWidth={2} fill="none" strokeLinecap="round" />
        <path d="M121 150 C121 98 146 80 180 80 C214 80 239 98 239 150 C239 190 222 222 180 229 C138 222 121 190 121 150 Z" fill={`url(#${ids.skin})`} />

        <clipPath id={`${ids.hair}c`}><path d="M121 150 C121 98 146 80 180 80 C214 80 239 98 239 150 C239 190 222 222 180 229 C138 222 121 190 121 150 Z" /></clipPath>
        {/* short faded sides, kept inside the head outline */}
        <g clipPath={`url(#${ids.hair}c)`}>
          <path d="M116 160 C114 128 118 104 134 90 L144 114 C135 122 130 136 129 156 Z" fill={`url(#${ids.hair}f)`} />
          <path d="M244 160 C246 128 242 104 226 90 L216 114 C225 122 230 136 231 156 Z" fill={`url(#${ids.hair}f)`} />
        </g>

        {/* longer top, swept up and back into a soft quiff */}
        <path d="M124 124 C118 92 132 66 160 56 C182 48 214 48 234 60 C250 70 256 90 248 118 C242 106 230 100 216 98 C198 96 180 97 166 100 C150 104 136 112 124 124 Z" fill={`url(#${ids.hair})`} />
        <path d="M130 112 C126 84 146 60 178 54 C206 50 230 58 244 76 C228 70 208 68 190 72 C168 76 150 88 142 106 Z" fill={C.hair} />
        <path d="M142 106 C136 98 136 88 142 82 C146 92 156 98 170 99 Z" fill={C.hair} />
        <g stroke={C.hairLight} strokeWidth={3} strokeLinecap="round" fill="none" opacity={0.75}>
          <path d="M140 98 C144 78 164 62 192 58" /><path d="M158 94 C166 76 186 66 214 64" />
          <path d="M180 94 C190 80 208 72 232 74" /><path d="M202 97 C214 86 228 84 244 90" />
        </g>

        {/* short trimmed beard: light along the jaw, fuller at the chin, cheeks clear */}
        <path d="M121 150 C121 190 138 222 180 229 C222 222 239 190 239 150 C235 150 234 154 233 160 C230 184 220 200 206 207 C198 211 190 212 180 212 C170 212 162 211 154 207 C140 200 130 184 127 160 C126 154 125 150 121 150 Z" fill={`url(#${ids.hair}b)`} />
        {/* moustache, split in the middle */}
        <path d="M161 187 C166 180 174 179 179 182 C176 186 168 188 161 187 Z" fill={C.beard} />
        <path d="M199 187 C194 180 186 179 181 182 C184 186 192 188 199 187 Z" fill={C.beard} />
        {/* blush and nose */}
        <ellipse cx={145} cy={172} rx={10} ry={5} fill="#E58D74" opacity={0.14} />
        <ellipse cx={215} cy={172} rx={10} ry={5} fill="#E58D74" opacity={0.14} />
        <path d="M181 156 q5 14 -4 19" stroke={C.skinShade} strokeWidth={3.5} strokeLinecap="round" fill="none" />
        <Face expr={expr} look={lookIn} />
        </g>

        <AnimatePresence initial={false}>
          <motion.g key={`f-${pose}`} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }} transition={t}>{L.front}</motion.g>
        </AnimatePresence>
      </g>
    </svg></Ids.Provider>
  );
}
