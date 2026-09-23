"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { stations } from "@/content/data";
import { ui } from "@/content/ui";
import { tag, useLang } from "@/lib/i18n";
import { BeforeAfter } from "../BeforeAfter";
import { Readout } from "../Readout";
import { Scene } from "./scenes";

/** Ficha de inspección de un sector: se abre al tocar una sala del plano. */
export function SectorModal({
  index,
  onClose,
  onNavigate,
}: {
  index: number | null;
  onClose: () => void;
  onNavigate: (i: number) => void;
}) {
  const { t, lang } = useLang();
  const closeRef = useRef<HTMLButtonElement>(null);
  const isOpen = index !== null;

  useEffect(() => {
    if (!isOpen) return;
    closeRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNavigate((index ?? 0) + 1);
      if (e.key === "ArrowLeft") onNavigate((index ?? 0) - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, index, onClose, onNavigate]);

  const s = index !== null ? stations[index] : null;

  return (
    <AnimatePresence>
      {s && index !== null && (
        <motion.div
          key="sector-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="sector-title"
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            key={s.id}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
            className="plate relative flex max-h-[92svh] w-full max-w-3xl flex-col overflow-hidden rounded-t-xl sm:rounded-xl"
          >
            <div className="hazard h-2 shrink-0" />
            <header className="flex shrink-0 items-center gap-3 border-b border-line px-5 py-3 sm:px-7">
              <span className="rounded-sm bg-safety px-1.5 py-0.5 font-mono text-[11px] font-semibold text-black">{s.code}</span>
              <span className="font-mono text-xs uppercase tracking-widest text-muted">
                {t(s.sector)} · {t(s.kicker)}
              </span>
              <button
                ref={closeRef}
                onClick={onClose}
                aria-label={t(ui.plant.close)}
                className="ml-auto rounded p-1.5 text-muted transition-colors hover:bg-line hover:text-ink"
              >
                <X className="h-5 w-5" />
              </button>
            </header>

            <div className="overflow-y-auto">
              <div className="h-36 border-b border-line bg-[#141618] px-4 py-2 sm:h-44">
                <Scene id={s.scene} />
              </div>

              <div className="px-5 py-6 sm:px-7">
                <h3 id="sector-title" className="font-display text-3xl font-extrabold uppercase leading-none sm:text-4xl">
                  {t(s.title)}
                </h3>

                <div className="mt-6 grid gap-5 md:grid-cols-2">
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-widest text-alarm">{t(ui.plant.problem)}</p>
                    <p className="mt-2 leading-relaxed text-ink/85">{t(s.problem)}</p>
                  </div>
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-widest text-led">{t(ui.plant.solution)}</p>
                    <p className="mt-2 leading-relaxed text-ink/85">{t(s.solution)}</p>
                  </div>
                </div>

                {s.beforeAfter && <BeforeAfter before={s.beforeAfter.before} after={s.beforeAfter.after} />}

                <div className="mt-6 flex flex-col gap-5 border-t border-dashed border-line pt-5 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-widest text-muted">{t(ui.plant.stack)}</p>
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
                      <div key={i} className="min-w-28 rounded-md border border-black bg-[#0b0c0d] px-3 py-2">
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

            <footer className="flex shrink-0 items-center justify-between gap-2 border-t border-line bg-bg/40 px-5 py-3 font-mono text-xs uppercase sm:px-7">
              <button
                onClick={() => onNavigate(index - 1)}
                className="flex items-center gap-1 text-muted transition-colors hover:text-safety"
                aria-label={t(ui.plant.prev)}
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="hidden sm:inline">{t(stations[(index - 1 + stations.length) % stations.length].sector)}</span>
              </button>
              <span className="text-muted">
                {index + 1}/{stations.length}
              </span>
              <button
                onClick={() => onNavigate(index + 1)}
                className="flex items-center gap-1 text-muted transition-colors hover:text-safety"
                aria-label={t(ui.plant.next)}
              >
                <span className="hidden sm:inline">{t(stations[(index + 1) % stations.length].sector)}</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </footer>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
