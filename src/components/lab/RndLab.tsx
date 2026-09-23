"use client";

import { motion } from "motion/react";
import { labProjects, type LabProject } from "@/content/data";
import { ui } from "@/content/ui";
import { tag, useLang } from "@/lib/i18n";
import { SectionTitle } from "../SectionTitle";

// Taller de I+D: proyectos propios presentados como planos técnicos (blueprints) de prototipos.

const LINE = "#8cc4f0";

function SportsScene() {
  return (
    <svg viewBox="0 0 240 150" className="h-full w-full overflow-hidden" aria-hidden>
      {/* Servidor BFF emitiendo eventos */}
      <g transform="translate(12 36)">
        <rect width="54" height="70" rx="4" fill="none" stroke={LINE} strokeWidth="1.5" />
        {[10, 26, 42].map((y) => (
          <g key={y}>
            <line x1="8" y1={y} x2="34" y2={y} stroke={LINE} strokeWidth="1.2" />
            <circle cx="44" cy={y} r="2" fill="#3ddc84" className="sc-led" style={{ animationDelay: `${y / 40}s` }} />
          </g>
        ))}
        <text x="27" y="64" textAnchor="middle" fill={LINE} className="font-mono text-[8px]">
          KTOR BFF
        </text>
      </g>
      <path d="M70 70 H104" stroke="#f5b700" strokeWidth="1.6" strokeDasharray="4 4" className="sc-flow" />
      <text x="87" y="64" textAnchor="middle" fill="#f5b700" className="font-mono text-[7px]">
        SSE
      </text>
      {/* Celular con marcador en vivo */}
      <g transform="translate(108 8)">
        <rect width="72" height="134" rx="10" fill="#0b1f33" stroke={LINE} strokeWidth="1.5" />
        <rect x="26" y="5" width="20" height="3" rx="1.5" fill={LINE} opacity="0.6" />
        <circle cx="14" cy="22" r="3" fill="#e2352f" className="sc-led" />
        <text x="21" y="25" fill="#e2352f" className="font-mono text-[7px] font-bold">
          LIVE 78&apos;
        </text>
        <text x="36" y="50" textAnchor="middle" fill="#fff" className="font-mono text-[15px] font-bold">
          2 - 1
        </text>
        <text x="14" y="62" fill={LINE} className="font-mono text-[7px]">
          LOC
        </text>
        <text x="47" y="62" fill={LINE} className="font-mono text-[7px]">
          VIS
        </text>
        {[74, 86, 98, 110].map((y, i) => (
          <g key={y}>
            <rect x="10" y={y} width="52" height="8" rx="2" fill="none" stroke={LINE} strokeOpacity="0.5" />
            <rect x="10" y={y} width={[30, 44, 22, 38][i]} height="8" rx="2" fill={LINE} opacity="0.25" className="sc sc-type" style={{ animationDelay: `${i * 0.3}s` }} />
          </g>
        ))}
      </g>
      {/* Deportes */}
      {["FÚT", "BÁS", "F1", "TEN", "PÁD"].map((s, i) => (
        <g key={s} transform={`translate(190 ${14 + i * 25})`}>
          <rect width="40" height="18" rx="9" fill="none" stroke={i === 2 ? "#f5b700" : LINE} strokeWidth="1.2" />
          <text x="20" y="12.5" textAnchor="middle" fill={i === 2 ? "#f5b700" : LINE} className="font-mono text-[7.5px] font-semibold">
            {s}
          </text>
        </g>
      ))}
    </svg>
  );
}

function QuestScene() {
  const letters = "ABCDEFGHIJLMNOPRSTUV".split("");
  return (
    <svg viewBox="0 0 240 150" className="h-full w-full overflow-hidden" aria-hidden>
      {/* Rosco */}
      <g transform="translate(62 75)">
        {letters.map((l, i) => {
          const a = (i / letters.length) * Math.PI * 2 - Math.PI / 2;
          const x = Math.cos(a) * 52;
          const y = Math.sin(a) * 52;
          const done = i < 7;
          return (
            <g key={l} transform={`translate(${x.toFixed(1)} ${y.toFixed(1)})`}>
              <circle r="8" fill={done ? "#3ddc84" : "none"} stroke={done ? "#3ddc84" : LINE} strokeWidth="1.2" className={i === 7 ? "sc-led" : undefined} />
              <text y="3" textAnchor="middle" fill={done ? "#0b1f33" : LINE} className="font-mono text-[8px] font-bold">
                {l}
              </text>
            </g>
          );
        })}
        <text y="-4" textAnchor="middle" fill="#fff" className="font-mono text-[9px] font-bold">
          ROSCO
        </text>
        <text y="10" textAnchor="middle" fill="#f5b700" className="font-mono text-[12px] font-bold">
          7/20
        </text>
      </g>
      {/* Tarjeta de pregunta + XP */}
      <g transform="translate(130 18)">
        <rect width="100" height="114" rx="8" fill="#0b1f33" stroke={LINE} strokeWidth="1.5" />
        <text x="10" y="18" fill={LINE} className="font-mono text-[7px]">
          PARADIGMAS · Q 4/10
        </text>
        <rect x="10" y="26" width="80" height="4" rx="2" fill={LINE} opacity="0.5" />
        <rect x="10" y="34" width="56" height="4" rx="2" fill={LINE} opacity="0.5" />
        {[46, 60, 74].map((y, i) => (
          <rect key={y} x="10" y={y} width="80" height="10" rx="3" fill={i === 1 ? "#3ddc84" : "none"} fillOpacity={i === 1 ? 0.25 : 0} stroke={i === 1 ? "#3ddc84" : LINE} strokeOpacity={i === 1 ? 1 : 0.5} />
        ))}
        <text x="10" y="100" fill="#f5b700" className="font-mono text-[7px] font-bold">
          NIVEL 6 · XP
        </text>
        <rect x="10" y="104" width="80" height="4" rx="2" fill={LINE} opacity="0.25" />
        <rect x="10" y="104" width="80" height="4" rx="2" fill="#f5b700" className="sc sc-type" />
      </g>
    </svg>
  );
}

export function RndLab() {
  const { t } = useLang();
  return (
    <section id="taller" className="relative border-t border-line bg-bg py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionTitle label={t(ui.lab.label)} title={t(ui.lab.title)} intro={t(ui.lab.intro)} />
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {labProjects.map((p, i) => (
            <Blueprint key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Blueprint({ project: p, index }: { project: LabProject; index: number }) {
  const { t } = useLang();
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ delay: index * 0.12, duration: 0.5 }}
      className="relative overflow-hidden rounded-md border-2 border-[#2d5f8a] text-[#dcecfa] shadow-[0_20px_50px_-20px_rgb(0_0_0/0.8)]"
      style={{
        backgroundColor: "#0d2944",
        backgroundImage:
          "linear-gradient(rgb(140 196 240 / 0.09) 1px, transparent 1px), linear-gradient(90deg, rgb(140 196 240 / 0.09) 1px, transparent 1px), linear-gradient(rgb(140 196 240 / 0.04) 1px, transparent 1px), linear-gradient(90deg, rgb(140 196 240 / 0.04) 1px, transparent 1px)",
        backgroundSize: "40px 40px, 40px 40px, 8px 8px, 8px 8px",
      }}
    >
      {/* Rótulo del plano */}
      <header className="flex items-center justify-between gap-3 border-b border-dashed border-[#8cc4f0]/40 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.15em] whitespace-nowrap text-[#8cc4f0] sm:px-6 sm:tracking-[0.2em]">
        <span>
          <span className="hidden sm:inline">{t(ui.lab.prototype)} </span>
          {p.code}
        </span>
        <span className="flex items-center gap-1.5 text-[#f5b700]">
          <span className="led-blink h-1.5 w-1.5 rounded-full bg-[#f5b700]" />
          {t(ui.lab.status)}
        </span>
      </header>

      <div className="h-44 border-b border-dashed border-[#8cc4f0]/40 px-4 py-3 sm:h-52">
        {p.scene === "sports" ? <SportsScene /> : <QuestScene />}
      </div>

      <div className="px-4 py-6 sm:px-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-display text-4xl font-black uppercase leading-none text-white">{p.name}</h3>
            <p className="mt-1 font-mono text-xs uppercase tracking-wider text-[#8cc4f0]">{t(p.tagline)}</p>
          </div>
          <div className="shrink-0 rounded border border-[#8cc4f0]/50 px-3 py-1.5 text-center">
            <p className="font-mono text-2xl font-semibold leading-none text-[#f5b700]">{p.stat.value}</p>
            <p className="mt-1 font-mono text-[9px] uppercase text-[#8cc4f0]">{t(p.stat.label)}</p>
          </div>
        </div>

        <p className="mt-4 leading-relaxed text-[#dcecfa]/90">{t(p.description)}</p>

        <ul className="mt-4 space-y-1.5">
          {p.features.map((f, i) => (
            <li key={i} className="flex gap-2 text-sm text-[#dcecfa]/85">
              <span className="font-mono text-[#f5b700]">▸</span>
              {t(f)}
            </li>
          ))}
        </ul>

        <ul className="mt-5 flex flex-wrap gap-1.5 border-t border-dashed border-[#8cc4f0]/40 pt-4">
          {p.stack.map((s, i) => (
            <li key={i} className="rounded-sm border border-[#8cc4f0]/50 px-2 py-0.5 font-mono text-xs text-[#dcecfa]">
              {tag(t, s)}
            </li>
          ))}
        </ul>
      </div>

      {/* Cota decorativa de plano */}
      <div className="pointer-events-none absolute right-3 bottom-2 font-mono text-[9px] text-[#8cc4f0]/50" aria-hidden>
        ESC 1:1 · REV {index + 1}
      </div>
    </motion.article>
  );
}
