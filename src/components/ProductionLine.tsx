"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Banknote,
  Cpu,
  FileText,
  Network,
  PackageCheck,
  ReceiptText,
  ScanText,
  Smartphone,
  type LucideIcon,
} from "lucide-react";
import { finishedProduct, rawMaterial, stations, type Station } from "@/content/data";
import { ui } from "@/content/ui";
import { tag, useLang } from "@/lib/i18n";
import { BeforeAfter } from "./BeforeAfter";
import { Readout } from "./Readout";

// Cómo se ve la pieza al salir de cada estación: empieza como papel y termina como producto embalado.
const PIECES: { icon: LucideIcon; color: string }[] = [
  { icon: FileText, color: "var(--orange)" }, // materia prima
  { icon: Banknote, color: "var(--yellow)" },
  { icon: ReceiptText, color: "var(--yellow)" },
  { icon: ScanText, color: "var(--steel)" },
  { icon: Smartphone, color: "var(--steel)" },
  { icon: Cpu, color: "var(--steel)" },
  { icon: Network, color: "var(--steel)" },
  { icon: PackageCheck, color: "var(--green)" }, // producto terminado
];

export function ProductionLine() {
  const { t } = useLang();
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

  // La estación activa es la que cruza la franja central de la pantalla.
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.step));
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    listRef.current?.querySelectorAll("[data-step]").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const piece = PIECES[active];
  const PieceIcon = piece.icon;

  return (
    <section id="linea" className="relative border-t border-line bg-bg py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionTitle label={t(ui.line.label)} title={t(ui.line.title)} intro={t(ui.line.intro)} />

        <div className="relative mt-16">
          {/* Cinta vertical + pieza que viaja con el scroll */}
          <div className="absolute inset-y-0 left-[14px] w-5 sm:left-[16px] sm:w-7" aria-hidden>
            <div className="belt-y absolute inset-0 rounded-sm border-x-2 border-[#3b3f45]" />
            <div className="sticky top-[46vh] z-20 -ml-[10px] flex h-10 w-10 items-center justify-center sm:-ml-[8px] sm:h-11 sm:w-11">
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={active}
                  initial={{ scale: 0.4, rotate: -30, opacity: 0 }}
                  animate={{ scale: 1, rotate: 0, opacity: 1 }}
                  exit={{ scale: 0.4, rotate: 30, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 22 }}
                  className="flex h-10 w-10 items-center justify-center rounded-md border-2 bg-bg shadow-[0_0_24px_-4px_currentColor] sm:h-11 sm:w-11"
                  style={{ color: piece.color, borderColor: piece.color }}
                >
                  <PieceIcon className="h-5 w-5" />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div ref={listRef} className="space-y-20 pl-14 sm:space-y-28 sm:pl-24">
            {/* Materia prima */}
            <article data-step={0} className="relative">
              <MachineMarker label="IN" tone="rust" />
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-rust">
                {t(ui.line.input)} · {t(rawMaterial.title)}
              </p>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink/90 sm:text-xl">{t(rawMaterial.text)}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {rawMaterial.items.map((it, i) => (
                  <span
                    key={i}
                    className="rounded-sm border border-rust/40 bg-rust/10 px-3 py-1.5 font-mono text-xs text-rust"
                    style={{ transform: `rotate(${[-2, 1.5, -1, 2][i % 4]}deg)` }}
                  >
                    {t(it)}
                  </span>
                ))}
              </div>
            </article>

            {stations.map((s, i) => (
              <StationCard key={s.id} station={s} step={i + 1} active={active === i + 1} />
            ))}

            {/* Producto terminado */}
            <article data-step={stations.length + 1} className="relative">
              <MachineMarker label="OUT" tone="led" />
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-led">
                {t(ui.line.output)} · {t(finishedProduct.title)}
              </p>
              <p className="mt-4 max-w-2xl font-display text-4xl font-extrabold uppercase leading-none sm:text-5xl">
                {t(finishedProduct.text)}
              </p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}

function StationCard({
  station: s,
  step,
  active,
}: {
  station: Station;
  step: number;
  active: boolean;
}) {
  const { t, lang } = useLang();
  return (
    <motion.article
      data-step={step}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15% 0px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative"
    >
      <MachineMarker label={s.code.replace("EST-", "")} tone={active ? "safety" : "idle"} />

      <div
        className={`plate rivets overflow-hidden rounded-lg transition-[border-color,box-shadow] duration-500 ${
          active ? "border-safety/60 shadow-[0_0_0_1px_rgb(245_183_0/0.25),0_20px_50px_-20px_rgb(245_183_0/0.25)]" : ""
        }`}
      >
        <header className="flex flex-wrap items-center gap-x-4 gap-y-1 border-b border-line px-6 py-4 sm:px-8">
          <span className="rounded-sm bg-safety px-2 py-0.5 font-mono text-[11px] font-semibold text-black">{s.code}</span>
          <span className="font-mono text-xs uppercase tracking-widest text-muted">{t(s.kicker)}</span>
          <span className="ml-auto flex items-center gap-1.5 font-mono text-[10px] uppercase text-muted">
            <span className={`h-2 w-2 rounded-full ${active ? "bg-led led-blink" : "bg-line"}`} />
            {active ? "RUN" : "IDLE"}
          </span>
        </header>

        <div className="px-6 py-6 sm:px-8 sm:py-8">
          <h3 className="font-display text-3xl font-extrabold uppercase leading-none sm:text-4xl">{t(s.title)}</h3>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-widest text-alarm">{t(ui.line.problem)}</p>
              <p className="mt-2 leading-relaxed text-ink/85">{t(s.problem)}</p>
            </div>
            <div>
              <p className="font-mono text-[11px] uppercase tracking-widest text-led">{t(ui.line.solution)}</p>
              <p className="mt-2 leading-relaxed text-ink/85">{t(s.solution)}</p>
            </div>
          </div>

          {s.beforeAfter && <BeforeAfter before={s.beforeAfter.before} after={s.beforeAfter.after} />}

          <div className="mt-6 flex flex-col gap-6 border-t border-dashed border-line pt-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-widest text-muted">{t(ui.line.stack)}</p>
              <ul className="mt-2 flex flex-wrap gap-1.5">
                {s.stack.map((x, i) => (
                  <li key={i} className="rounded-sm border border-line bg-bg px-2 py-1 font-mono text-xs text-ink/90">
                    {tag(t, x)}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex gap-3">
              {s.impact.map((m, i) => (
                <div key={i} className="min-w-28 rounded-md border border-[#000] bg-[#0b0c0d] px-3 py-2 shadow-inner">
                  <p className="font-mono text-2xl font-semibold text-safety [text-shadow:0_0_12px_rgb(245_183_0/0.45)]">
                    <Readout value={m.value} locale={lang === "es" ? "es-AR" : "en-US"} />
                  </p>
                  <p className="font-mono text-[10px] uppercase leading-tight text-muted">{t(m.label)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

/** Carcasa de máquina sobre la cinta, alineada con cada estación. */
function MachineMarker({ label, tone }: { label: string; tone: "rust" | "led" | "safety" | "idle" }) {
  const styles = {
    rust: "border-rust text-rust",
    led: "border-led text-led",
    safety: "border-safety text-black bg-safety",
    idle: "border-line text-muted",
  }[tone];
  return (
    <div
      className={`absolute top-0 -left-14 z-10 flex h-12 w-12 items-center justify-center rounded-md border-2 bg-panel font-mono text-xs font-semibold transition-colors sm:-left-24 sm:h-[60px] sm:w-[60px] ${styles}`}
      aria-hidden
    >
      {label}
    </div>
  );
}

export function SectionTitle({ label, title, intro }: { label: string; title: string; intro?: string }) {
  return (
    <div className="max-w-3xl">
      <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-safety">
        <span className="hazard-thin inline-block h-3 w-8 rounded-sm" /> {label}
      </p>
      <h2 className="mt-3 font-display text-5xl font-black uppercase leading-[0.9] sm:text-6xl">{title}</h2>
      {intro && <p className="mt-5 text-lg leading-relaxed text-muted">{intro}</p>}
    </div>
  );
}
