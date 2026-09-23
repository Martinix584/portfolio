"use client";

import { useCallback, useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, CheckCircle2, Hand, Truck } from "lucide-react";
import { finishedProduct, rawMaterial, stations, type Station } from "@/content/data";
import { ui } from "@/content/ui";
import { useLang } from "@/lib/i18n";
import { SectionTitle } from "../SectionTitle";
import { Scene } from "./scenes";
import { SectorModal } from "./SectorModal";

type Rect = { x: number; y: number; w: number; h: number };

// Posición de cada sala en el plano, en % del contenedor. "m" = celular, "d" = escritorio.
const LAYOUT: Record<string, { m: Rect; d: Rect }> = {
  conciliacion: { m: { x: 2, y: 2, w: 47, h: 15 }, d: { x: 1, y: 2, w: 31, h: 29 } },
  arca: { m: { x: 51, y: 2, w: 47, h: 15 }, d: { x: 34, y: 2, w: 31, h: 29 } },
  vision: { m: { x: 2, y: 19, w: 96, h: 14 }, d: { x: 67, y: 2, w: 32, h: 29 } },
  iot: { m: { x: 2, y: 35, w: 96, h: 14 }, d: { x: 51, y: 35, w: 48, h: 25 } },
  erp: { m: { x: 2, y: 51, w: 47, h: 16 }, d: { x: 1, y: 35, w: 48, h: 25 } },
  servicio: { m: { x: 2, y: 69, w: 96, h: 14 }, d: { x: 1, y: 63, w: 48, h: 25 } },
  ada: { m: { x: 51, y: 51, w: 47, h: 16 }, d: { x: 51, y: 63, w: 48, h: 25 } },
};
const ROAD = { m: { y: 85, h: 10 }, d: { y: 91, h: 7 } };

const pos = (r: Rect, p: "m" | "d") =>
  ({
    [`--${p}x`]: `${r.x}%`,
    [`--${p}y`]: `${r.y}%`,
    [`--${p}w`]: `${r.w}%`,
    [`--${p}h`]: `${r.h}%`,
  }) as React.CSSProperties;

export function Plant() {
  const { t } = useLang();
  const [open, setOpen] = useState<number | null>(null);
  const [visited, setVisited] = useState<Set<string>>(new Set());

  const openSector = useCallback((i: number) => {
    setOpen(i);
    setVisited((v) => new Set(v).add(stations[i].id));
  }, []);
  const close = useCallback(() => setOpen(null), []);
  const navigate = useCallback((i: number) => openSector((i + stations.length) % stations.length), [openSector]);

  const done = visited.size === stations.length;

  return (
    <section id="planta" className="relative border-t border-line bg-bg py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionTitle label={t(ui.plant.label)} title={t(ui.plant.title)} intro={t(ui.plant.intro)} />

        {/* Estado inicial: lo que había antes de automatizar */}
        <div className="mt-8 flex flex-wrap items-center gap-2">
          <span className="mr-1 font-mono text-[11px] uppercase tracking-widest text-rust">{t(ui.plant.before)}:</span>
          {rawMaterial.items.map((it, i) => (
            <span
              key={i}
              className="rounded-sm border border-rust/40 bg-rust/10 px-2.5 py-1 font-mono text-xs text-rust line-through decoration-rust/60"
            >
              {t(it)}
            </span>
          ))}
        </div>

        {/* Barra de inspección */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
          <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted">
            <Hand className="h-4 w-4 text-safety" /> {t(ui.plant.hint)}
          </p>
          <div className="flex items-center gap-3 font-mono text-xs uppercase text-muted">
            {t(ui.plant.progress)}
            <div className="flex gap-1">
              {stations.map((s) => (
                <span
                  key={s.id}
                  className={`h-2.5 w-5 rounded-sm transition-colors ${visited.has(s.id) ? "bg-led" : "bg-line"}`}
                />
              ))}
            </div>
            <span className="tabular-nums text-ink">
              {visited.size}/{stations.length}
            </span>
          </div>
        </div>

        {/* Plano */}
        <div className="plate relative mt-4 aspect-[390/860] w-full overflow-hidden rounded-lg md:aspect-[1200/1000]">
          <div className="floor-grid absolute inset-0 bg-[#141618]" />

          {/* Cañerías de datos entre sectores (solo escritorio) */}
          <svg
            className="pointer-events-none absolute inset-0 hidden h-full w-full md:block"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden
          >
            <Pipe d="M83 31 V32.3 H49.5 V31" color="var(--steel)" />
            <Pipe d="M16 31 V33.6 H99.6 V61.2 H88 V63" color="var(--yellow)" />
            <Pipe d="M25 60 V61.5 H62 V63 M75 60 V61.5 H62" color="var(--green)" />
            <Pipe d="M49 75.5 H51" color="var(--orange)" />
          </svg>

          {stations.map((s, i) => (
            <Room
              key={s.id}
              station={s}
              index={i}
              visited={visited.has(s.id)}
              onOpen={() => openSector(i)}
              style={{ ...pos(LAYOUT[s.id].m, "m"), ...pos(LAYOUT[s.id].d, "d") }}
            />
          ))}

          {/* Playa de maniobras: portón, calle y despacho */}
          <div
            className="absolute inset-x-0 top-[var(--ry)] h-[var(--rh)] overflow-hidden border-y-2 border-[#2a2d31] bg-[#1b1d20] md:top-[var(--dy)] md:h-[var(--dh)]"
            style={
              {
                "--ry": `${ROAD.m.y}%`,
                "--rh": `${ROAD.m.h}%`,
                "--dy": `${ROAD.d.y}%`,
                "--dh": `${ROAD.d.h}%`,
              } as React.CSSProperties
            }
          >
            <div className="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 bg-[repeating-linear-gradient(90deg,var(--yellow)_0_18px,transparent_18px_36px)] opacity-50" />
            <span className="absolute top-1 left-2 font-mono text-[9px] uppercase tracking-widest text-muted">
              ◧ {t(ui.plant.gate)}
            </span>
            <span className="absolute right-2 bottom-1 font-mono text-[9px] uppercase tracking-widest text-muted">
              {t(ui.plant.dispatch)} ▸
            </span>
            <div className="sc-truck absolute top-1/2 -translate-y-1/2 text-safety">
              <Truck className="h-6 w-6 md:h-8 md:w-8" strokeWidth={1.75} />
            </div>
          </div>
        </div>

        {/* Producto terminado */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <p className="max-w-2xl font-display text-2xl font-extrabold uppercase leading-tight sm:text-3xl">
            <span className="text-led">✓</span> {t(finishedProduct.text)}
          </p>
          {done && (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-start gap-2">
              <p className="font-mono text-xs text-led">{t(ui.plant.certified)}</p>
              <a
                href="#simulador"
                className="flex items-center gap-2 rounded bg-led px-4 py-2.5 font-mono text-xs font-semibold uppercase text-black"
              >
                {t(ui.plant.toGame)} <ArrowRight className="h-4 w-4" />
              </a>
            </motion.div>
          )}
        </div>
      </div>

      <SectorModal
        index={open}
        onClose={close}
        onNavigate={navigate}
      />
    </section>
  );
}

function Pipe({ d, color }: { d: string; color: string }) {
  return (
    <g>
      <path d={d} fill="none" stroke="#2c3035" strokeWidth="7" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
      <path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeDasharray="4 8"
        vectorEffect="non-scaling-stroke"
        className="sc-flow"
        opacity="0.85"
      />
    </g>
  );
}

function Room({
  station: s,
  index,
  visited,
  onOpen,
  style,
}: {
  station: Station;
  index: number;
  visited: boolean;
  onOpen: () => void;
  style: React.CSSProperties;
}) {
  const { t } = useLang();
  return (
    <motion.button
      onClick={onOpen}
      style={style}
      initial={{ opacity: 0.25, filter: "grayscale(1) brightness(0.6)" }}
      whileInView={{ opacity: 1, filter: "grayscale(0) brightness(1)" }}
      viewport={{ once: true, margin: "-15% 0px" }}
      transition={{ delay: 0.2 + index * 0.18, duration: 0.25, ease: "easeOut" }}
      aria-label={`${t(s.sector)}: ${t(s.title)}`}
      className="group absolute top-[var(--my)] left-[var(--mx)] flex h-[var(--mh)] w-[var(--mw)] flex-col overflow-hidden rounded-md border-2 border-[#4a4f56] bg-[#191b1e] text-left transition-[border-color,box-shadow] hover:border-safety hover:shadow-[0_0_0_3px_rgb(245_183_0/0.2),0_10px_40px_-10px_rgb(245_183_0/0.35)] focus-visible:border-safety focus-visible:outline-none md:top-[var(--dy)] md:left-[var(--dx)] md:h-[var(--dh)] md:w-[var(--dw)]"
    >
      {/* Cartel del sector */}
      <div className="flex shrink-0 items-center gap-2 border-b border-[#34383d] bg-[#202327] px-2 py-1 md:px-3 md:py-1.5">
        <span className="hidden shrink-0 whitespace-nowrap rounded-sm bg-safety px-1 font-mono text-[10px] font-semibold text-black sm:inline">{s.code}</span>
        <span className="truncate font-display text-[13px] font-extrabold uppercase leading-tight sm:text-sm md:text-lg">{t(s.sector)}</span>
        {visited ? (
          <CheckCircle2 className="ml-auto h-4 w-4 shrink-0 text-led" aria-label={t(ui.plant.inspected)} />
        ) : (
          <span className="led-blink ml-auto h-2 w-2 shrink-0 rounded-full bg-safety" />
        )}
      </div>

      {/* Escena animada */}
      <div className="min-h-0 flex-1 p-1 md:p-2">
        <Scene id={s.scene} />
      </div>

      {/* Pie: proyecto + llamado a inspeccionar (solo escritorio) */}
      <div className="hidden shrink-0 items-center justify-between gap-2 border-t border-dashed border-[#34383d] px-3 py-2 md:flex">
        <span className="truncate text-xs text-ink/80">{t(s.title)}</span>
        <span className="flex shrink-0 items-center gap-1 font-mono text-[10px] uppercase text-safety opacity-70 transition-opacity group-hover:opacity-100">
          {t(ui.plant.inspect)} <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </motion.button>
  );
}
