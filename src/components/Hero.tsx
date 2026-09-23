"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ChevronsDown, Mail, MapPin } from "lucide-react";
import { Github, Linkedin } from "./BrandIcons";
import { profile } from "@/content/data";
import { ui } from "@/content/ui";
import { useLang } from "@/lib/i18n";

export function Hero() {
  const { t } = useLang();
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  // La persiana sube durante la primera mitad del scroll de la sección.
  const shutterY = useTransform(scrollYProgress, [0, 0.55], ["0%", "-104%"]);
  const lightOpacity = useTransform(scrollYProgress, [0, 0.4], [0.9, 0]);
  const badgeScale = useTransform(scrollYProgress, [0.1, 0.55], [0.92, 1]);

  return (
    <section id="top" ref={ref} className={reduce ? "relative" : "relative h-[220vh]"}>
      <div className={`${reduce ? "" : "sticky top-0"} flex min-h-svh items-center overflow-hidden floor-grid pt-14`}>
        {/* Interior de la planta: credencial + titular */}
        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-[auto_1fr] md:gap-16">
          <motion.div style={reduce ? undefined : { scale: badgeScale }} className="mx-auto hidden md:block">
            <Badge />
          </motion.div>

          <div>
            {/* En celular la credencial completa no entra: mostramos una versión compacta */}
            <div className="mb-5 flex items-center gap-3 md:hidden">
              <div className="relative h-14 w-14 overflow-hidden rounded-md border-2 border-safety">
                <Image src={profile.photo} alt={profile.name} fill sizes="56px" className="object-cover" />
              </div>
              <div>
                <p className="font-display text-xl font-extrabold uppercase leading-none">{profile.name}</p>
                <p className="mt-1 flex items-center gap-1.5 font-mono text-[10px] uppercase text-led">
                  <span className="led-blink inline-block h-1.5 w-1.5 rounded-full bg-led" />
                  {t(ui.hero.available)}
                </p>
              </div>
            </div>
            <p className="mb-3 hidden font-mono text-xs uppercase tracking-[0.25em] text-safety md:block">{t(ui.hero.gate)}</p>
            <h1 className="font-display text-[2.6rem] font-black uppercase leading-[0.9] sm:text-6xl lg:text-7xl">
              {t(ui.hero.headline)}
            </h1>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted sm:mt-6 sm:text-lg">{t(profile.summary)}</p>

            <div className="mt-8 flex flex-wrap items-center gap-3 font-mono text-xs">
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-2 rounded bg-safety px-4 py-2.5 font-semibold uppercase text-black transition-transform hover:-translate-y-0.5"
              >
                <Mail className="h-4 w-4" aria-hidden /> {profile.email}
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="rounded border border-line p-2.5 text-muted transition-colors hover:border-safety hover:text-safety"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="rounded border border-line p-2.5 text-muted transition-colors hover:border-safety hover:text-safety"
              >
                <Github className="h-4 w-4" />
              </a>
              <span className="flex items-center gap-1.5 text-muted">
                <MapPin className="h-4 w-4" aria-hidden /> {profile.location}
              </span>
            </div>
          </div>
        </div>

        {/* Persiana metálica que se abre con el scroll */}
        {!reduce && (
          <motion.div
            style={{ y: shutterY }}
            className="shutter absolute inset-0 z-10 flex flex-col items-center justify-center border-b-8 border-[#1a1c1f] px-4 text-center"
            aria-hidden
          >
            <motion.div
              style={{ opacity: lightOpacity }}
              className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-safety/25 to-transparent"
            />
            <div className="plate rivets rounded-sm px-8 py-6 sm:px-14">
              <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-safety">{t(ui.hero.gate)}</p>
              <p className="mt-3 font-display text-6xl font-black uppercase leading-none tracking-tight sm:text-8xl">
                {profile.name}
              </p>
              <p className="mt-3 font-mono text-xs uppercase tracking-wider text-muted sm:text-sm">{t(profile.role)}</p>
            </div>
            <div className="hazard mt-10 h-4 w-64 max-w-full rounded-sm" />
            <p className="mt-8 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-ink">
              <ChevronsDown className="h-4 w-4 animate-bounce text-safety" /> {t(ui.hero.enter)}
            </p>
            <div className="absolute inset-x-0 bottom-0 h-3 hazard" />
          </motion.div>
        )}
      </div>
    </section>
  );
}

function Badge() {
  const { t } = useLang();
  return (
    <div className="relative w-64 sm:w-72">
      {/* Cinta y clip */}
      <div className="mx-auto h-16 w-6 bg-gradient-to-b from-transparent via-safety/70 to-safety" />
      <div className="mx-auto -mt-1 h-4 w-12 rounded-sm border border-[#555] bg-gradient-to-b from-[#8a8f95] to-[#4a4e53]" />
      <div className="mx-auto -mt-1 h-3 w-8 rounded-b-sm bg-[#2a2d31]" />

      <div className="plate -rotate-2 overflow-hidden rounded-xl transition-transform duration-500 hover:rotate-0">
        <div className="flex items-center justify-between bg-safety px-4 py-2 text-black">
          <span className="font-display text-sm font-extrabold uppercase tracking-wider">{t(ui.hero.badge)}</span>
          <span className="font-mono text-[10px] font-semibold">MP·FACTORY</span>
        </div>
        <div className="p-4">
          <div className="flex gap-4">
            <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-md border border-line">
              <Image src={profile.photo} alt={profile.name} fill sizes="80px" className="object-cover" priority />
            </div>
            <div className="min-w-0">
              <p className="font-display text-2xl font-extrabold uppercase leading-none">{profile.name}</p>
              <p className="mt-2 font-mono text-[10px] uppercase leading-snug text-muted">{t(profile.role)}</p>
            </div>
          </div>
          <dl className="mt-4 grid grid-cols-2 gap-x-3 gap-y-2 border-t border-dashed border-line pt-3 font-mono text-[10px] uppercase">
            <div>
              <dt className="text-muted">{t(ui.hero.id)}</dt>
              <dd className="text-ink">0912</dd>
            </div>
            <div>
              <dt className="text-muted">{t(ui.hero.clearance)}</dt>
              <dd className="text-ink">{t(ui.hero.clearanceValue)}</dd>
            </div>
            <div className="col-span-2">
              <dt className="text-muted">{t(ui.hero.shift)}</dt>
              <dd className="flex items-center gap-1.5 text-led">
                <span className="led-blink inline-block h-1.5 w-1.5 rounded-full bg-led" />
                {t(ui.hero.available)}
              </dd>
            </div>
          </dl>
          <Barcode />
        </div>
      </div>
    </div>
  );
}

function Barcode() {
  // Código de barras decorativo, determinístico para evitar diferencias de hidratación.
  const bars = "3121411213113211412111231321211413112".split("").map(Number);
  return (
    <div className="mt-4 flex h-8 items-stretch gap-[2px] opacity-80" aria-hidden>
      {bars.map((w, i) => (
        <span key={i} className={i % 2 ? "bg-transparent" : "bg-ink"} style={{ width: w * 1.5 }} />
      ))}
    </div>
  );
}
