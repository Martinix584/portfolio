"use client";

import { useId } from "react";
import type { ToolShape } from "@/content/data";

// Siluetas de herramientas reales dibujadas en SVG. Cada una define una zona (region) donde se
// "graba" el título y las habilidades del grupo mediante <foreignObject>, así el texto escala con la herramienta.

type Region = { x: number; y: number; w: number; h: number };
type Ink = "dark" | "light";

type ToolDef = {
  w: number;
  h: number;
  region: Region;
  /** Zona propia para el título (por ejemplo, la pantalla del multímetro). */
  titleRegion?: Region;
  ink: Ink;
  draw: (id: (name: string) => string) => React.ReactNode;
};

const STEEL = ["#d9dde1", "#a7adb4", "#7c838b"];

function SteelGradient({ id, vertical = true }: { id: string; vertical?: boolean }) {
  return (
    <linearGradient id={id} x1="0" y1="0" x2={vertical ? "0" : "1"} y2={vertical ? "1" : "0"}>
      <stop offset="0" stopColor={STEEL[0]} />
      <stop offset="0.5" stopColor={STEEL[1]} />
      <stop offset="1" stopColor={STEEL[2]} />
    </linearGradient>
  );
}

function Paint({ id, from, to }: { id: string; from: string; to: string }) {
  return (
    <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor={from} />
      <stop offset="1" stopColor={to} />
    </linearGradient>
  );
}

/** Serrucho: hoja grande con dientes y mango de madera. */
const saw: ToolDef = {
  w: 400,
  h: 200,
  region: { x: 26, y: 40, w: 248, h: 104 },
  ink: "dark",
  draw: (id) => {
    // Dientes a lo largo del borde inferior, de la punta al mango.
    const teeth: string[] = [];
    const n = 30;
    for (let i = 0; i <= n; i++) {
      const x = 8 + (i / n) * 284;
      const y = 150 + (i / n) * 28;
      teeth.push(`L${x.toFixed(1)} ${y.toFixed(1)}`);
      if (i < n) teeth.push(`L${(x + 284 / n / 2).toFixed(1)} ${(y + 9).toFixed(1)}`);
    }
    return (
      <>
        <defs>
          <SteelGradient id={id("blade")} />
          <Paint id={id("wood")} from="#e0a458" to="#a8632a" />
        </defs>
        <path d={`M8 44 Q4 44 4 60 L4 150 ${teeth.join(" ")} L296 178 L296 16 Z`} fill={`url(#${id("blade")})`} />
        <path d="M296 16 L8 44" stroke="#fff" strokeOpacity="0.5" strokeWidth="1.5" />
        <path
          d="M286 8 H360 Q394 8 394 42 V168 Q394 192 368 192 H300 Q286 192 286 176 Z"
          fill={`url(#${id("wood")})`}
          stroke="#7a4518"
          strokeWidth="2"
        />
        <rect x="314" y="48" width="54" height="104" rx="24" className="fill-[#0f1011]" />
        {[40, 100, 160].map((y) => (
          <circle key={y} cx="300" cy={y} r="5" fill="#d8dde2" stroke="#6b7178" />
        ))}
      </>
    );
  },
};

/** Multímetro: carcasa de goma amarilla, pantalla LCD y puntas de prueba. */
const multimeter: ToolDef = {
  w: 400,
  h: 220,
  region: { x: 100, y: 90, w: 200, h: 96 },
  titleRegion: { x: 108, y: 36, w: 184, h: 42 },
  ink: "light",
  draw: (id) => (
    <>
      <defs>
        <Paint id={id("boot")} from="#ffd23f" to="#d99a00" />
      </defs>
      <path d="M86 192 C 40 214, 22 150, 18 70" fill="none" stroke="#c0392b" strokeWidth="7" strokeLinecap="round" />
      <path d="M314 192 C 360 214, 378 150, 382 70" fill="none" stroke="#1b1b1b" strokeWidth="7" strokeLinecap="round" />
      <rect x="10" y="30" width="16" height="44" rx="4" fill="#c0392b" />
      <rect x="374" y="30" width="16" height="44" rx="4" fill="#1b1b1b" stroke="#444" />
      <path d="M18 30 V8" stroke="#ccc" strokeWidth="3" strokeLinecap="round" />
      <path d="M382 30 V8" stroke="#ccc" strokeWidth="3" strokeLinecap="round" />
      <rect x="70" y="8" width="260" height="204" rx="28" fill={`url(#${id("boot")})`} />
      <rect x="86" y="22" width="228" height="176" rx="14" fill="#25282c" />
      <rect x="102" y="34" width="196" height="46" rx="6" fill="#a9c19f" stroke="#6f8468" strokeWidth="2" />
      <circle cx="120" cy="192" r="5" fill="#c0392b" />
      <circle cx="280" cy="192" r="5" fill="#111" stroke="#555" />
    </>
  ),
};

/** Destornillador: mango rojo estriado, virola y vástago. */
const screwdriver: ToolDef = {
  w: 400,
  h: 170,
  region: { x: 30, y: 18, w: 196, h: 134 },
  ink: "dark",
  draw: (id) => (
    <>
      <defs>
        <Paint id={id("grip")} from="#ff6b5a" to="#b3261e" />
        <SteelGradient id={id("shaft")} />
      </defs>
      <rect x="236" y="72" width="130" height="26" fill={`url(#${id("shaft")})`} />
      <path d="M366 72 L392 80 L392 90 L366 98 Z" fill={`url(#${id("shaft")})`} />
      <rect x="222" y="54" width="22" height="62" rx="4" fill={`url(#${id("shaft")})`} />
      <rect x="4" y="6" width="230" height="158" rx="60" fill={`url(#${id("grip")})`} />
      {[40, 62, 84, 106, 128].map((y) => (
        <rect key={y} x="14" y={y - 2} width="6" height="4" rx="2" fill="#0003" />
      ))}
    </>
  ),
};

/** Llave combinada: boca abierta, cuerpo y estrella. */
const wrench: ToolDef = {
  w: 400,
  h: 170,
  region: { x: 110, y: 40, w: 186, h: 90 },
  ink: "dark",
  draw: (id) => (
    <>
      <defs>
        <SteelGradient id={id("steel")} />
        <mask id={id("cut")}>
          <rect width="400" height="170" fill="#fff" />
          <path d="M-4 57 L52 69 L52 101 L-4 113 Z" fill="#000" />
          <polygon
            points={Array.from({ length: 12 }, (_, i) => {
              const a = (Math.PI / 6) * i;
              const r = i % 2 === 0 ? 30 : 25;
              return `${(340 + r * Math.cos(a)).toFixed(1)},${(85 + r * Math.sin(a)).toFixed(1)}`;
            }).join(" ")}
            fill="#000"
          />
        </mask>
      </defs>
      <g mask={`url(#${id("cut")})`} fill={`url(#${id("steel")})`}>
        <circle cx="62" cy="85" r="66" />
        <rect x="60" y="36" width="284" height="98" rx="18" />
        <circle cx="340" cy="85" r="60" />
      </g>
      <rect x="112" y="39" width="182" height="3" rx="1.5" fill="#fff" opacity="0.5" />
    </>
  ),
};

/** Cinta métrica: carcasa amarilla y cinta extendida con marcas. */
const tape: ToolDef = {
  w: 400,
  h: 200,
  region: { x: 30, y: 26, w: 172, h: 146 },
  ink: "dark",
  draw: (id) => (
    <>
      <defs>
        <Paint id={id("case")} from="#ffd23f" to="#d99a00" />
        <SteelGradient id={id("hook")} />
      </defs>
      <rect x="200" y="146" width="186" height="30" fill="#f1d34a" stroke="#b8930f" />
      {Array.from({ length: 23 }, (_, i) => (
        <line key={i} x1={206 + i * 8} y1="146" x2={206 + i * 8} y2={i % 5 === 0 ? 162 : 153} stroke="#222" strokeWidth="1.2" />
      ))}
      {[0, 5, 10, 15, 20].map((i) => (
        <text key={i} x={208 + i * 8} y="172" className="fill-[#222] font-mono text-[8px]">
          {i / 5 + 1}
        </text>
      ))}
      <rect x="384" y="138" width="10" height="46" rx="2" fill={`url(#${id("hook")})`} />
      <rect x="8" y="8" width="210" height="184" rx="44" fill={`url(#${id("case")})`} />
      <rect x="92" y="2" width="44" height="12" rx="4" fill="#1b1b1b" />
    </>
  ),
};

/** Taladro inalámbrico: cuerpo, mandril, mecha, empuñadura y batería. */
const drill: ToolDef = {
  w: 400,
  h: 262,
  region: { x: 98, y: 20, w: 232, h: 126 },
  ink: "light",
  draw: (id) => (
    <>
      <defs>
        <Paint id={id("body")} from="#3f86b0" to="#1e4f6e" />
        <SteelGradient id={id("bit")} />
      </defs>
      <rect x="2" y="78" width="42" height="14" rx="3" fill={`url(#${id("bit")})`} />
      {[10, 20, 30].map((x) => (
        <line key={x} x1={x} y1="78" x2={x + 6} y2="92" stroke="#6b7178" strokeWidth="2" />
      ))}
      <rect x="38" y="56" width="44" height="58" rx="8" fill="#2b2e33" stroke="#111" />
      <path d="M230 150 L292 150 L286 228 L228 228 Z" fill="#1d1f22" />
      <rect x="236" y="152" width="18" height="30" rx="4" fill="#111" />
      <rect x="196" y="224" width="140" height="32" rx="7" fill="#f5b700" stroke="#a87c00" />
      <rect x="76" y="8" width="274" height="148" rx="52" fill={`url(#${id("body")})`} />
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={318 - i * 10} y="140" width="4" height="8" rx="2" fill="#0005" />
      ))}
    </>
  ),
};

/** Martillo: cabeza de acero con uña y mango de madera. */
const hammer: ToolDef = {
  w: 400,
  h: 170,
  region: { x: 118, y: 42, w: 262, h: 86 },
  ink: "dark",
  draw: (id) => (
    <>
      <defs>
        <SteelGradient id={id("head")} vertical={false} />
        <Paint id={id("wood")} from="#e0a458" to="#a8632a" />
      </defs>
      <rect x="84" y="38" width="312" height="94" rx="36" fill={`url(#${id("wood")})`} stroke="#7a4518" strokeWidth="2" />
      <path
        d="M30 8 H96 Q104 8 104 18 V152 Q104 162 96 162 H30 Q22 162 22 152 V114 H8 Q2 114 2 106 V64 Q2 56 8 56 H22 V18 Q22 8 30 8 Z"
        fill={`url(#${id("head")})`}
      />
    </>
  ),
};

export const TOOLS: Record<ToolShape, ToolDef> = { saw, multimeter, screwdriver, wrench, tape, drill, hammer };

export function ToolSvg({
  shape,
  title,
  items,
}: {
  shape: ToolShape;
  title: string;
  items: string[];
}) {
  const uid = useId().replace(/:/g, "");
  const id = (name: string) => `${uid}-${name}`;
  const tool = TOOLS[shape];
  const { region: r, titleRegion: tr, ink } = tool;

  return (
    <svg viewBox={`0 0 ${tool.w} ${tool.h}`} className="h-auto w-full overflow-visible" role="img" aria-label={`${title}: ${items.join(", ")}`}>
      {tool.draw(id)}
      {tr && (
        <foreignObject x={tr.x} y={tr.y} width={tr.w} height={tr.h}>
          <div className="flex h-full items-center">
            <p className="font-mono text-[15px] font-semibold uppercase leading-tight text-[#1f2a1c]">{title}</p>
          </div>
        </foreignObject>
      )}
      <foreignObject x={r.x} y={r.y} width={r.w} height={r.h}>
        <div className="flex h-full flex-col justify-center gap-1.5">
          {!tr && (
            <p
              className={`font-display text-[22px] font-black uppercase leading-none tracking-wide ${
                ink === "dark" ? "text-[#141414]" : "text-ink"
              }`}
            >
              {title}
            </p>
          )}
          <ul className="flex flex-wrap gap-1">
            {items.map((it) => (
              <li
                key={it}
                className={`rounded-[3px] px-1.5 py-[2px] font-mono text-[13px] leading-tight ${
                  ink === "dark" ? "bg-[#141414]/85 text-[#f1efe9]" : "border border-white/20 bg-white/10 text-ink"
                }`}
              >
                {it}
              </li>
            ))}
          </ul>
        </div>
      </foreignObject>
    </svg>
  );
}
