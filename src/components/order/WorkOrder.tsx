"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { Check, Factory, Printer, RotateCcw } from "lucide-react";
import { areaLabels, type Area } from "@/content/data";
import { ui } from "@/content/ui";
import { useLang } from "@/lib/i18n";
import { SectionTitle } from "../ProductionLine";
import { buildCv, type BuiltCv } from "./buildCv";
import { CvSheet } from "./CvSheet";

const AREAS = Object.keys(areaLabels) as Area[];
const STEP_MS = 650;

type Phase = { kind: "form" } | { kind: "producing"; step: number } | { kind: "done"; cv: BuiltCv };

export function WorkOrder() {
  const { t } = useLang();
  const [client, setClient] = useState("");
  const [position, setPosition] = useState("");
  const [areas, setAreas] = useState<Area[]>([]);
  const [number, setNumber] = useState("----");
  const [phase, setPhase] = useState<Phase>({ kind: "form" });
  const [mounted, setMounted] = useState(false);

  // Número de orden aleatorio: se genera en el cliente para no romper la hidratación.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setNumber(String(Math.floor(1000 + Math.random() * 9000)));
    setMounted(true);
  }, []);

  const toggle = (a: Area) => setAreas((cur) => (cur.includes(a) ? cur.filter((x) => x !== a) : [...cur, a]));

  const produce = () => {
    if (!areas.length) return;
    const cv = buildCv({ client: client.trim(), position: position.trim(), areas, number });
    const steps = ui.order.steps.length;
    setPhase({ kind: "producing", step: 0 });
    for (let i = 1; i <= steps; i++) {
      setTimeout(() => setPhase(i < steps ? { kind: "producing", step: i } : { kind: "done", cv }), i * STEP_MS);
    }
  };

  const newOrder = () => {
    setPhase({ kind: "form" });
    setNumber(String(Math.floor(1000 + Math.random() * 9000)));
  };

  return (
    <section id="orden" className="relative border-t border-line bg-panel/40 py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionTitle label={t(ui.order.label)} title={t(ui.order.title)} intro={t(ui.order.intro)} />

        <div className="mt-12">
          <AnimatePresence mode="wait">
            {phase.kind === "form" && (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                className="plate mx-auto max-w-3xl overflow-hidden rounded-lg"
              >
                <div className="hazard h-2" />
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-dashed border-line px-6 py-4">
                  <span className="flex items-center gap-2 font-display text-xl font-extrabold uppercase sm:text-2xl">
                    <Factory className="h-6 w-6 shrink-0 text-safety" /> {t(ui.order.title)}
                  </span>
                  <span className="font-mono text-xs text-muted">
                    {t(ui.order.number)} <span className="text-ink">{number}</span>
                  </span>
                </div>

                <div className="grid gap-5 px-6 py-6 sm:grid-cols-2">
                  <Field label={t(ui.order.client)} value={client} onChange={setClient} placeholder={t(ui.order.clientPh)} />
                  <Field
                    label={t(ui.order.position)}
                    value={position}
                    onChange={setPosition}
                    placeholder={t(ui.order.positionPh)}
                  />
                </div>

                <fieldset className="px-6 pb-6">
                  <legend className="font-mono text-[11px] uppercase tracking-widest text-muted">
                    {t(ui.order.specs)} <span className="normal-case tracking-normal">· {t(ui.order.specsHint)}</span>
                  </legend>
                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    {AREAS.map((a) => {
                      const on = areas.includes(a);
                      return (
                        <button
                          key={a}
                          type="button"
                          role="checkbox"
                          aria-checked={on}
                          onClick={() => toggle(a)}
                          className={`flex items-center gap-3 rounded border px-3 py-2.5 text-left text-sm transition-colors ${
                            on ? "border-safety bg-safety/10 text-ink" : "border-line text-ink/75 hover:border-muted"
                          }`}
                        >
                          <span
                            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-sm border-2 ${
                              on ? "border-safety bg-safety text-black" : "border-line"
                            }`}
                          >
                            {on && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
                          </span>
                          {t(areaLabels[a])}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                <div className="border-t border-line bg-bg/40 px-6 py-5">
                  <button
                    onClick={produce}
                    disabled={!areas.length}
                    className="flex w-full items-center justify-center gap-2 rounded bg-safety px-5 py-3.5 font-display text-xl font-extrabold uppercase tracking-wide text-black transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <Factory className="h-5 w-5" /> {t(ui.order.produce)}
                  </button>
                </div>
              </motion.div>
            )}

            {phase.kind === "producing" && (
              <motion.div
                key="producing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="plate mx-auto max-w-3xl rounded-lg px-6 py-10"
              >
                <p className="text-center font-display text-3xl font-black uppercase">{t(ui.order.producing)}</p>
                {/* Prensa estampando */}
                <div className="relative mx-auto mt-8 h-28 w-48">
                  <motion.div
                    animate={{ y: [0, 44, 0] }}
                    transition={{ duration: STEP_MS / 1000, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-x-6 top-0 h-10 rounded-sm border-2 border-[#555] bg-gradient-to-b from-[#7a7f86] to-[#40444a]"
                  >
                    <div className="hazard-thin absolute inset-x-0 bottom-0 h-1.5" />
                  </motion.div>
                  <div className="absolute inset-x-0 bottom-0 h-8 overflow-hidden rounded-sm">
                    <div className="belt h-full w-full" />
                  </div>
                  <div className="absolute bottom-8 left-1/2 h-4 w-14 -translate-x-1/2 rounded-sm bg-ink/90" />
                </div>
                <ol className="mx-auto mt-8 max-w-sm space-y-2 font-mono text-sm">
                  {ui.order.steps.map((s, i) => (
                    <li
                      key={i}
                      className={`flex items-center gap-3 ${
                        i < phase.step ? "text-led" : i === phase.step ? "text-safety" : "text-muted/50"
                      }`}
                    >
                      <span className="w-4">{i < phase.step ? "✓" : i === phase.step ? "▶" : "·"}</span>
                      {t(s)}
                    </li>
                  ))}
                </ol>
                <div className="mx-auto mt-6 h-2 max-w-sm overflow-hidden rounded-full bg-bg">
                  <motion.div
                    className="h-full bg-safety"
                    initial={{ width: "0%" }}
                    animate={{ width: `${((phase.step + 1) / ui.order.steps.length) * 100}%` }}
                    transition={{ duration: STEP_MS / 1000, ease: "linear" }}
                  />
                </div>
              </motion.div>
            )}

            {phase.kind === "done" && (
              <motion.div key="done" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <div className="no-print mx-auto mb-4 flex max-w-3xl flex-wrap items-center justify-between gap-3">
                  <p className="font-mono text-xs text-muted">{t(ui.order.printHint)}</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => window.print()}
                      className="flex items-center gap-2 rounded bg-safety px-4 py-2.5 font-mono text-xs font-semibold uppercase text-black"
                    >
                      <Printer className="h-4 w-4" /> {t(ui.order.download)}
                    </button>
                    <button
                      onClick={newOrder}
                      className="flex items-center gap-2 rounded border border-line px-4 py-2.5 font-mono text-xs uppercase text-muted hover:text-ink"
                    >
                      <RotateCcw className="h-4 w-4" /> {t(ui.order.newOrder)}
                    </button>
                  </div>
                </div>
                <div className="mx-auto max-w-3xl overflow-hidden rounded-sm shadow-[0_30px_80px_-20px_rgb(0_0_0/0.8)]">
                  <CvSheet cv={phase.cv} />
                </div>
                {mounted &&
                  createPortal(
                    <div id="cv-print">
                      <CvSheet cv={phase.cv} />
                    </div>,
                    document.body,
                  )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  return (
    <label className="block">
      <span className="font-mono text-[11px] uppercase tracking-widest text-muted">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={60}
        className="mt-1.5 w-full border-b-2 border-line bg-transparent py-2 font-mono text-ink outline-none transition-colors placeholder:text-muted/50 focus:border-safety"
      />
    </label>
  );
}
