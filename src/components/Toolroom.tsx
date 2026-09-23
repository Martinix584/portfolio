"use client";

import { motion } from "motion/react";
import { credentials, skills, type L } from "@/content/data";
import { ui } from "@/content/ui";
import { tag, useLang } from "@/lib/i18n";
import { SectionTitle } from "./SectionTitle";
import { ToolSvg } from "./toolbox/tools";

/** Caja de herramientas abierta: cada grupo de habilidades es una herramienta encajada en la goma espuma. */
export function Toolroom() {
  const { t } = useLang();

  return (
    <section id="herramientas" className="relative border-t border-line bg-panel/40 py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionTitle label={t(ui.tools.label)} title={t(ui.tools.title)} />

        {/* Caja: manija, tapa y bandeja */}
        <div className="relative mx-auto mt-16 max-w-5xl">
          <div className="absolute -top-9 left-1/2 h-12 w-40 -translate-x-1/2 rounded-t-2xl border-[10px] border-b-0 border-[#2a2d31]" aria-hidden />
          <div className="rounded-xl bg-gradient-to-b from-[#b3261e] to-[#6e1712] p-2 shadow-[0_30px_60px_-20px_rgb(0_0_0/0.8)] sm:p-4">
            <div className="flex items-center justify-between px-2 pb-3">
              <span className="h-3 w-10 rounded-sm bg-gradient-to-b from-[#d9dde1] to-[#7c838b]" aria-hidden />
              <span className="font-display text-sm font-extrabold uppercase tracking-[0.3em] text-white/80">
                {t(ui.tools.label)}
              </span>
              <span className="h-3 w-10 rounded-sm bg-gradient-to-b from-[#d9dde1] to-[#7c838b]" aria-hidden />
            </div>

            {/* Bandeja de goma espuma */}
            <div
              className="grid gap-x-8 gap-y-10 rounded-lg px-2 py-8 sm:px-8 md:grid-cols-2"
              style={{
                backgroundColor: "#121314",
                backgroundImage: "radial-gradient(rgb(255 255 255 / 0.035) 1px, transparent 1.5px)",
                backgroundSize: "6px 6px",
                boxShadow: "inset 0 4px 18px rgb(0 0 0 / 0.8)",
              }}
            >
              {skills.map((g, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24, rotate: i % 2 ? 2 : -2 }}
                  whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                  viewport={{ once: true, margin: "-10% 0px" }}
                  transition={{ delay: (i % 2) * 0.1, type: "spring", stiffness: 160, damping: 18 }}
                  whileHover={{ y: -6, rotate: i % 2 ? 1 : -1 }}
                  className={`mx-auto w-full max-w-[440px] self-center [filter:drop-shadow(0_10px_6px_rgb(0_0_0/0.65))] ${
                    i === skills.length - 1 && skills.length % 2 ? "md:col-span-2" : ""
                  }`}
                >
                  <ToolSvg shape={g.tool} title={t(g.title)} items={g.items.map((it) => tag(t, it))} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <h3 className="mt-16 font-mono text-xs uppercase tracking-[0.25em] text-muted">{t(ui.tools.certs)}</h3>
        <div className="mt-5 grid gap-5 sm:grid-cols-3">
          {credentials.map((c, i) => (
            <Plate key={i} index={i} {...c} />
          ))}
        </div>
      </div>
    </section>
  );
}

/** Placa de identificación de máquina: acero cepillado, remaches y texto grabado. */
function Plate({ title, detail, serial, status, index }: { title: L; detail: L; serial: L; status: L; index: number }) {
  const { t, lang } = useLang();
  const engraved = "[text-shadow:0_1px_0_rgb(255_255_255/0.45)]";
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="relative rounded-[6px] border border-[#5d636a] px-7 py-5 text-[#23272b] shadow-[0_10px_24px_-10px_rgb(0_0_0/0.8),inset_0_1px_0_rgb(255_255_255/0.6)]"
      style={{
        background:
          "repeating-linear-gradient(90deg, rgb(255 255 255 / 0.05) 0 1px, transparent 1px 3px), linear-gradient(180deg, #d5d9dd, #a3a9b0 55%, #8c9299)",
      }}
    >
      {["top-2 left-2", "top-2 right-2", "bottom-2 left-2", "bottom-2 right-2"].map((p) => (
        <span
          key={p}
          className={`absolute ${p} h-2.5 w-2.5 rounded-full bg-[radial-gradient(circle_at_35%_35%,#f2f4f6,#7d838a_60%,#4b5056)] shadow-[0_1px_1px_rgb(0_0_0/0.5)]`}
          aria-hidden
        />
      ))}
      <div className="flex items-center justify-between border-b border-[#23272b]/30 pb-1.5 font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-[#3a3f45]">
        <span>MP·FACTORY</span>
        <span>{lang === "es" ? "Placa" : "Plate"} N.º {String(index + 1).padStart(3, "0")}</span>
      </div>
      <p className={`mt-2.5 font-display text-2xl font-black uppercase leading-none ${engraved}`}>{t(title)}</p>
      <p className={`mt-1 font-mono text-xs uppercase tracking-wide text-[#3a3f45] ${engraved}`}>{t(detail)}</p>
      <div className="mt-3 flex items-center justify-between gap-2 font-mono text-[10px] font-semibold uppercase tracking-wider">
        <span className="rounded-[3px] border border-[#23272b]/40 px-1.5 py-0.5">{t(serial)}</span>
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[#1f7a45] shadow-[0_0_4px_#1f7a45]" />
          {t(status)}
        </span>
      </div>
    </motion.div>
  );
}
