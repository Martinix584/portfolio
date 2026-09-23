"use client";

import { Download, Settings } from "lucide-react";
import { profile } from "@/content/data";
import { ui } from "@/content/ui";
import { useLang } from "@/lib/i18n";
import { VisitCounter } from "./VisitCounter";

export function Header() {
  const { lang, setLang, t } = useLang();

  const links = [
    { href: "#planta", label: ui.nav.plant },
    { href: "#taller", label: ui.nav.lab },
    { href: "#herramientas", label: ui.nav.tools },
    { href: "#simulador", label: ui.nav.game },
    { href: "#contacto", label: ui.nav.contact },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-line bg-bg/85 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-4 px-4">
        <a href="#top" className="flex items-center gap-2 font-display text-lg font-extrabold uppercase tracking-wide">
          <Settings className="gear-spin h-5 w-5 text-safety" aria-hidden />
          <span>
            {profile.brand.main}
            <span className="text-safety">{profile.brand.accent}</span>
          </span>
        </a>

        <nav className="ml-4 hidden items-center gap-5 font-mono text-xs uppercase tracking-wider text-muted md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition-colors hover:text-safety">
              {t(l.label)}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <div className="hidden lg:block">
            <VisitCounter />
          </div>

          {/* Selector de idioma estilo llave de dos posiciones */}
          <div
            role="radiogroup"
            aria-label="Idioma / Language"
            className="flex overflow-hidden rounded border border-line font-mono text-[11px] font-semibold"
          >
            {(["es", "en"] as const).map((l) => (
              <button
                key={l}
                role="radio"
                aria-checked={lang === l}
                onClick={() => setLang(l)}
                className={`px-2 py-1 uppercase transition-colors ${
                  lang === l ? "bg-safety text-black" : "text-muted hover:text-ink"
                }`}
              >
                {l}
              </button>
            ))}
          </div>

          <a
            href={profile.cv[lang]}
            download
            className="flex items-center gap-1.5 rounded border border-safety/60 px-2.5 py-1 font-mono text-[11px] font-semibold uppercase text-safety transition-colors hover:bg-safety hover:text-black"
          >
            <Download className="h-3.5 w-3.5" aria-hidden />
            {t(ui.downloadCv)}
          </a>
        </div>
      </div>
      <div className="hazard-thin h-[3px] opacity-80" />
    </header>
  );
}
