"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Copy, Mail, MessageCircle, RotateCw } from "lucide-react";
import { Github, Linkedin } from "./BrandIcons";
import { profile } from "@/content/data";
import { ui } from "@/content/ui";
import { useLang } from "@/lib/i18n";

/** Sirena corta generada con WebAudio (sin archivos de audio). */
function siren() {
  try {
    const Ctx = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new Ctx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sawtooth";
    const now = ctx.currentTime;
    for (let i = 0; i < 3; i++) {
      osc.frequency.setValueAtTime(620, now + i * 0.5);
      osc.frequency.linearRampToValueAtTime(920, now + i * 0.5 + 0.25);
      osc.frequency.linearRampToValueAtTime(620, now + i * 0.5 + 0.5);
    }
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.06, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.5);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(now + 1.55);
    osc.onended = () => ctx.close();
  } catch {}
}

export function EmergencyStop() {
  const { t } = useLang();
  const [halted, setHalted] = useState(false);
  const [copied, setCopied] = useState(false);
  const rearmRef = useRef<HTMLButtonElement>(null);

  const stop = () => {
    setHalted(true);
    document.documentElement.classList.add("halted");
    siren();
  };

  const rearm = useCallback(() => {
    setHalted(false);
    document.documentElement.classList.remove("halted");
  }, []);

  useEffect(() => {
    if (!halted) return;
    rearmRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && rearm();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [halted, rearm]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  const links = [
    { href: `mailto:${profile.email}`, icon: Mail, label: profile.email },
    { href: `https://wa.me/${profile.whatsapp}`, icon: MessageCircle, label: "WhatsApp" },
    { href: profile.linkedin, icon: Linkedin, label: "LinkedIn" },
    { href: profile.github, icon: Github, label: "GitHub" },
  ];

  return (
    <>
      {/* Botón hongo */}
      <button
        onClick={stop}
        aria-label={t(ui.estop.button)}
        title={t(ui.estop.button)}
        className="group fixed right-4 bottom-4 z-40 flex h-16 w-16 items-center justify-center rounded-full bg-safety shadow-[0_8px_24px_rgb(0_0_0/0.6)] sm:right-6 sm:bottom-6 sm:h-20 sm:w-20"
      >
        <span className="absolute inset-0 rounded-full border-4 border-black/70" />
        <svg viewBox="0 0 100 100" className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden>
          <defs>
            <path id="estop-ring" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
          </defs>
          <text className="fill-black font-mono text-[8.5px] font-bold uppercase">
            <textPath href="#estop-ring" textLength="236" lengthAdjust="spacing">
              PARADA DE EMERGENCIA · EMERGENCY STOP ·
            </textPath>
          </text>
        </svg>
        <span className="relative h-[46%] w-[46%] rounded-full bg-gradient-to-b from-[#ff4a42] to-[#a51410] shadow-[inset_0_-4px_6px_rgb(0_0_0/0.4),0_4px_0_#6d0c09] transition-transform group-hover:scale-105 group-active:translate-y-[3px] group-active:shadow-[inset_0_-2px_4px_rgb(0_0_0/0.4),0_1px_0_#6d0c09]" />
      </button>

      <AnimatePresence>
        {halted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="estop-title"
          >
            <div className="beacon absolute inset-0 backdrop-blur-sm" onClick={rearm} />
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className="plate relative w-full max-w-md overflow-hidden rounded-lg"
            >
              <div className="hazard h-3" />
              <div className="p-6 sm:p-8">
                <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-alarm">
                  <span className="led-blink h-2.5 w-2.5 rounded-full bg-alarm shadow-[0_0_10px_var(--red)]" />
                  {t(ui.estop.title)}
                </p>
                <h2 id="estop-title" className="mt-2 font-display text-5xl font-black uppercase leading-none">
                  {t(ui.estop.subtitle)}
                </h2>
                <p className="mt-3 text-muted">{t(ui.estop.text)}</p>

                <div className="mt-6 grid gap-2">
                  {links.map(({ href, icon: Icon, label }) => (
                    <a
                      key={label}
                      href={href}
                      target={href.startsWith("mailto") ? undefined : "_blank"}
                      rel="noreferrer"
                      className="flex items-center gap-3 rounded border border-line bg-bg/50 px-4 py-3 font-mono text-sm transition-colors hover:border-safety hover:text-safety"
                    >
                      <Icon className="h-4 w-4" /> {label}
                    </a>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  <button
                    onClick={copy}
                    className="flex items-center gap-2 rounded border border-line px-3 py-2 font-mono text-xs uppercase text-muted hover:text-ink"
                  >
                    <Copy className="h-3.5 w-3.5" /> {copied ? t(ui.estop.copied) : t(ui.estop.copy)}
                  </button>
                  <button
                    ref={rearmRef}
                    onClick={rearm}
                    className="ml-auto flex items-center gap-2 rounded bg-led px-3 py-2 font-mono text-xs font-semibold uppercase text-black"
                  >
                    <RotateCw className="h-3.5 w-3.5" /> {t(ui.estop.rearm)}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
