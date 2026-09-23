"use client";

import { useEffect, useState } from "react";
import type { SceneId } from "@/content/data";

// Mini escenas animadas de cada sector. Todas usan viewBox 200x120 y se escalan dentro de su sala.
// Las animaciones son CSS (clases sc-* en globals.css): se congelan con la parada de emergencia
// y se desactivan con prefers-reduced-motion.

const STROKE = "#4a4f56";

function Treasury() {
  return (
    <>
      {/* Extracto bancario: filas que se van conciliando */}
      <rect x="22" y="14" width="104" height="92" rx="4" className="fill-[#1d2023]" stroke={STROKE} />
      <rect x="22" y="14" width="104" height="14" rx="4" className="fill-[#2a2e33]" />
      <text x="30" y="24" className="fill-muted font-mono text-[7px]">EXTRACTO · CUIT</text>
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i} transform={`translate(0 ${36 + i * 14})`}>
          <rect x="30" y="0" width="44" height="5" rx="1" className="fill-[#3a3e44]" />
          <rect x="80" y="0" width="22" height="5" rx="1" className="fill-[#3a3e44]" />
          <circle cx="114" cy="2.5" r="4" className="sc-check" style={{ animationDelay: `${i * 0.45}s` }} />
        </g>
      ))}
      {/* CSV de salida */}
      <path d="M140 52 h6" stroke="var(--yellow)" strokeWidth="2" strokeDasharray="3 3" className="sc-flow" />
      <g transform="translate(150 38)">
        <path d="M0 0 h22 l8 8 v30 h-30 z" className="fill-[#1d2023]" stroke="var(--green)" strokeWidth="1.5" />
        <text x="4" y="28" className="fill-led font-mono text-[8px] font-semibold">CSV</text>
      </g>
    </>
  );
}

function Fiscal() {
  return (
    <>
      {/* Escritorio + impresora emitiendo facturas */}
      <rect x="10" y="92" width="180" height="6" rx="2" className="fill-[#2a2e33]" />
      <g transform="translate(40 30)">
        <rect x="0" y="16" width="70" height="34" rx="4" className="fill-[#2f3338]" stroke={STROKE} />
        <rect x="8" y="10" width="54" height="8" rx="2" className="fill-[#25282c]" />
        <circle cx="60" cy="24" r="2.5" className="fill-led sc-led" />
        <rect x="10" y="42" width="50" height="3" rx="1" className="fill-[#111]" />
        {/* Hoja saliendo */}
        <g className="sc sc-print">
          <rect x="16" y="40" width="38" height="24" rx="1" className="fill-ink" />
          <rect x="20" y="45" width="20" height="2.5" className="fill-[#999]" />
          <rect x="20" y="50" width="28" height="2" className="fill-[#bbb]" />
          <rect x="20" y="55" width="14" height="2.5" className="fill-alarm/80" />
        </g>
      </g>
      {/* Monitor con API ARCA */}
      <g transform="translate(128 34)">
        <rect x="0" y="0" width="56" height="38" rx="3" className="fill-[#1d2023]" stroke={STROKE} />
        <text x="6" y="12" className="fill-safety font-mono text-[7px] font-semibold">ARCA API</text>
        <text x="6" y="22" className="fill-led font-mono text-[6px]">200 OK · CAE</text>
        <rect x="6" y="27" width="30" height="3" rx="1" className="fill-[#3a3e44] sc sc-type" />
        <rect x="24" y="38" width="8" height="10" className="fill-[#2a2e33]" />
      </g>
    </>
  );
}

function Lab() {
  return (
    <>
      {/* Factura escaneada por el modelo de visión */}
      <g transform="translate(22 16)">
        <rect x="0" y="0" width="62" height="84" rx="3" className="fill-ink" />
        {[10, 18, 26, 40, 48, 56, 70].map((y, i) => (
          <rect key={y} x="7" y={y} width={i % 3 === 0 ? 30 : 46} height="3" rx="1" className="fill-[#9aa]" />
        ))}
        <rect x="36" y="66" width="20" height="8" rx="1" className="fill-safety/70" />
        <g className="sc sc-scan">
          <rect x="-4" y="4" width="70" height="3" className="fill-steel" opacity="0.9" />
          <rect x="-4" y="7" width="70" height="10" className="fill-steel" opacity="0.15" />
        </g>
      </g>
      <path d="M92 58 h20" stroke="var(--steel)" strokeWidth="2" strokeDasharray="4 4" className="sc-flow" />
      {/* JSON estructurado */}
      <g transform="translate(118 22)">
        <rect x="0" y="0" width="68" height="74" rx="3" className="fill-[#1d2023]" stroke={STROKE} />
        <text x="5" y="13" className="fill-steel font-mono text-[9px] font-semibold">{"{"}</text>
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i} transform={`translate(12 ${20 + i * 10})`}>
            <rect width="18" height="3.5" rx="1" className="fill-safety/80 sc sc-type" style={{ animationDelay: `${i * 0.18}s` }} />
            <rect x="21" width={16 + (i % 2) * 12} height="3.5" rx="1" className="fill-led/80 sc sc-type" style={{ animationDelay: `${i * 0.18 + 0.1}s` }} />
          </g>
        ))}
        <text x="5" y="70" className="fill-steel font-mono text-[9px] font-semibold">{"}"}</text>
      </g>
    </>
  );
}

function Production({ count }: { count: number }) {
  return (
    <>
      {/* Cinta con unidades que cruzan las barreras ópticas */}
      <rect x="-80" y="70" width="360" height="14" className="fill-[#26292d]" />
      <line x1="-80" y1="70" x2="280" y2="70" stroke="#50555c" strokeWidth="1.5" />
      <line x1="-80" y1="84" x2="280" y2="84" stroke="#50555c" strokeWidth="1.5" />
      {[0, 1, 2].map((i) => (
        <g key={i} className="sc sc-box" style={{ animationDelay: `${-i * 1.5}s` }}>
          <rect x="0" y="54" width="18" height="16" rx="2" className="fill-rust/80" stroke="var(--orange)" />
          <line x1="0" y1="62" x2="18" y2="62" stroke="#0006" />
        </g>
      ))}
      {/* Barreras */}
      {[82, 122].map((x) => (
        <g key={x}>
          <rect x={x - 3} y="36" width="6" height="36" rx="1" className="fill-[#3a3e44]" />
          <rect x={x - 3} y="36" width="6" height="6" rx="1" className="fill-safety" />
        </g>
      ))}
      <line x1="82" y1="60" x2="122" y2="60" stroke="var(--red)" strokeWidth="1.5" className="sc-beam" />
      {/* ESP32 + contador */}
      <g transform="translate(142 12)">
        <rect x="0" y="0" width="52" height="30" rx="3" className="fill-[#0b0c0d]" stroke={STROKE} />
        <text x="5" y="10" className="fill-muted font-mono text-[6px]">ESP32 · UNID.</text>
        <text x="5" y="24" className="fill-safety font-mono text-[12px] font-semibold tabular-nums">
          {String(count).padStart(5, "0")}
        </text>
      </g>
      <path d="M122 40 C 130 30, 134 28, 142 27" stroke="var(--steel)" strokeWidth="1.5" fill="none" strokeDasharray="3 3" className="sc-flow" />
      <line x1="-80" y1="100" x2="280" y2="100" stroke="var(--yellow)" strokeWidth="4" strokeDasharray="8 8" opacity="0.7" />
    </>
  );
}

function Depot() {
  return (
    <>
      {/* Estanterías */}
      {[0, 1].map((col) => (
        <g key={col} transform={`translate(${14 + col * 62} 14)`}>
          <rect x="0" y="0" width="54" height="72" className="fill-none" stroke={STROKE} strokeWidth="2" />
          {[22, 46].map((y) => (
            <line key={y} x1="0" y1={y} x2="54" y2={y} stroke={STROKE} strokeWidth="2" />
          ))}
          {[0, 1, 2].map((r) =>
            [0, 1, 2].map((c) => (
              <rect
                key={`${r}-${c}`}
                x={4 + c * 16}
                y={6 + r * 24}
                width="13"
                height="14"
                rx="1"
                className="sc-glow"
                style={{ animationDelay: `${(r * 3 + c + col * 4) * 0.55}s` }}
              />
            )),
          )}
        </g>
      ))}
      {/* Autoelevador */}
      <g className="sc sc-fork">
        <rect x="14" y="94" width="22" height="12" rx="2" className="fill-safety" />
        <rect x="18" y="86" width="10" height="9" rx="1" className="fill-none" stroke="var(--yellow)" strokeWidth="1.5" />
        <rect x="36" y="88" width="2" height="18" className="fill-[#777]" />
        <rect x="38" y="102" width="10" height="2" className="fill-[#777]" />
        <circle cx="19" cy="107" r="3" className="fill-[#111]" />
        <circle cx="32" cy="107" r="3" className="fill-[#111]" />
      </g>
      {/* Celular con remitos */}
      <g transform="translate(146 16)">
        <rect x="0" y="0" width="40" height="72" rx="6" className="fill-[#0b0c0d]" stroke="#5a5f66" strokeWidth="1.5" />
        <text x="6" y="14" className="fill-steel font-mono text-[6px] font-semibold">REMITOS</text>
        {[0, 1, 2, 3].map((i) => (
          <g key={i} transform={`translate(6 ${22 + i * 11})`}>
            <rect width="20" height="6" rx="1" className="fill-[#2a2e33]" />
            <circle cx="25" cy="3" r="2.5" className="sc-check" style={{ animationDelay: `${i * 0.5}s` }} />
          </g>
        ))}
      </g>
    </>
  );
}

function DataCenter() {
  return (
    <>
      {/* Rack de servidores */}
      <g transform="translate(16 10)">
        <rect x="0" y="0" width="54" height="96" rx="3" className="fill-[#16181b]" stroke={STROKE} />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <g key={i} transform={`translate(5 ${6 + i * 15})`}>
            <rect width="44" height="11" rx="1" className="fill-[#26292d]" />
            {[0, 1, 2].map((j) => (
              <circle
                key={j}
                cx={32 + j * 4.5}
                cy="5.5"
                r="1.4"
                className={`sc-led ${j === 2 ? "fill-safety" : "fill-led"}`}
                style={{ animationDelay: `${(i * 3 + j) * 0.17}s`, animationDuration: `${0.8 + ((i + j) % 3) * 0.4}s` }}
              />
            ))}
            <rect x="4" y="4" width="16" height="3" rx="1" className="fill-[#3a3e44]" />
          </g>
        ))}
      </g>
      {/* Hub MCP y apps conectadas */}
      <g transform="translate(96 48)">
        <rect x="0" y="0" width="30" height="18" rx="9" className="fill-safety" />
        <text x="15" y="12.5" textAnchor="middle" className="fill-black font-mono text-[7px] font-bold">MCP</text>
      </g>
      <path d="M70 57 H96" stroke="var(--yellow)" strokeWidth="1.5" strokeDasharray="3 3" className="sc-flow" />
      {[
        { y: 18, label: "PORTAL" },
        { y: 52, label: "FÁBRICA" },
        { y: 86, label: "QR" },
      ].map((n) => (
        <g key={n.label}>
          <path d={`M126 57 C 140 57, 140 ${n.y + 7}, 150 ${n.y + 7}`} stroke="var(--steel)" strokeWidth="1.5" fill="none" strokeDasharray="3 3" className="sc-flow" />
          <rect x="150" y={n.y} width="40" height="14" rx="2" className="fill-[#1d2023]" stroke="var(--steel)" />
          <text x="170" y={n.y + 9.5} textAnchor="middle" className="fill-steel font-mono text-[6.5px] font-semibold">
            {n.label}
          </text>
        </g>
      ))}
    </>
  );
}

/** Contador de producción que avanza al ritmo de las cajas (una cada 1,5 s). */
function useUnitCounter(active: boolean) {
  const [count, setCount] = useState(3187);
  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => {
      if (!document.documentElement.classList.contains("halted")) setCount((c) => c + 1);
    }, 1500);
    return () => clearInterval(id);
  }, [active]);
  return count;
}

export function Scene({ id, active = true }: { id: SceneId; active?: boolean }) {
  const count = useUnitCounter(active && id === "production");
  return (
    <svg viewBox="0 0 200 120" className="h-full w-full overflow-hidden" preserveAspectRatio="xMidYMid meet" aria-hidden>
      {id === "treasury" && <Treasury />}
      {id === "fiscal" && <Fiscal />}
      {id === "lab" && <Lab />}
      {id === "production" && <Production count={count} />}
      {id === "depot" && <Depot />}
      {id === "datacenter" && <DataCenter />}
    </svg>
  );
}
