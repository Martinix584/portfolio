"use client";

import { motion } from "motion/react";
import { BadgeCheck } from "lucide-react";
import { credentials, skills } from "@/content/data";
import { ui } from "@/content/ui";
import { tag, useLang } from "@/lib/i18n";
import { SectionTitle } from "./ProductionLine";

/** Pañol de herramientas: cada grupo de skills es un cajón etiquetado sobre un tablero perforado. */
export function Toolroom() {
  const { t } = useLang();

  return (
    <section id="herramientas" className="relative border-t border-line bg-panel/40 py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionTitle label={t(ui.tools.label)} title={t(ui.tools.title)} />

        <div
          className="mt-12 grid gap-4 rounded-lg border border-line p-4 sm:grid-cols-2 sm:p-6 lg:grid-cols-3"
          style={{
            backgroundColor: "#16181a",
            backgroundImage: "radial-gradient(circle, #0b0c0d 2.2px, transparent 2.6px)",
            backgroundSize: "22px 22px",
          }}
        >
          {skills.map((g, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ delay: (i % 3) * 0.08, duration: 0.45 }}
              className="plate rounded-md"
            >
              <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
                <span className="font-display text-lg font-extrabold uppercase tracking-wide">{t(g.title)}</span>
                <span className="rounded-sm bg-safety px-1.5 font-mono text-[10px] font-semibold text-black">
                  {String.fromCharCode(65 + i)}-0{i + 1}
                </span>
              </div>
              <ul className="flex flex-wrap gap-1.5 p-4">
                {g.items.map((it, j) => (
                  <li
                    key={j}
                    className="rounded-sm border border-line bg-bg px-2 py-1 font-mono text-xs text-ink/90 transition-colors hover:border-safety hover:text-safety"
                  >
                    {tag(t, it)}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <h3 className="mt-14 font-mono text-xs uppercase tracking-[0.25em] text-muted">{t(ui.tools.certs)}</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {credentials.map((c, i) => (
            <div key={i} className="plate flex items-start gap-3 rounded-md p-4">
              <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-led" aria-hidden />
              <div>
                <p className="font-semibold">{t(c.title)}</p>
                <p className="mt-0.5 font-mono text-xs text-muted">{t(c.detail)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
