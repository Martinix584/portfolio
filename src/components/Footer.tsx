"use client";

import { Download, Mail } from "lucide-react";
import { Github, Linkedin } from "./BrandIcons";
import { profile } from "@/content/data";
import { ui } from "@/content/ui";
import { useLang } from "@/lib/i18n";

export function Footer() {
  const { t } = useLang();
  return (
    <footer className="relative border-t border-line bg-bg">
      <div className="hazard h-3" />
      <div className="mx-auto max-w-6xl px-4 py-20">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-safety">{t(ui.footer.label)}</p>
        <h2 className="mt-3 max-w-3xl font-display text-5xl font-black uppercase leading-[0.9] sm:text-7xl">
          {t(ui.footer.title)}
        </h2>
        <p className="mt-4 text-lg text-muted">{t(ui.footer.text)}</p>

        <div className="mt-8 flex flex-wrap gap-3 font-mono text-xs">
          <a
            href={`mailto:${profile.email}`}
            className="flex items-center gap-2 rounded bg-safety px-4 py-3 font-semibold uppercase text-black"
          >
            <Mail className="h-4 w-4" /> {profile.email}
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded border border-line px-4 py-3 uppercase hover:border-safety hover:text-safety"
          >
            <Linkedin className="h-4 w-4" /> LinkedIn
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded border border-line px-4 py-3 uppercase hover:border-safety hover:text-safety"
          >
            <Github className="h-4 w-4" /> GitHub
          </a>
          <a
            href={profile.cv.es}
            download
            className="flex items-center gap-2 rounded border border-line px-4 py-3 uppercase hover:border-safety hover:text-safety"
          >
            <Download className="h-4 w-4" /> CV ES
          </a>
          <a
            href={profile.cv.en}
            download
            className="flex items-center gap-2 rounded border border-line px-4 py-3 uppercase hover:border-safety hover:text-safety"
          >
            <Download className="h-4 w-4" /> CV EN
          </a>
        </div>

        <p className="mt-16 font-mono text-[11px] uppercase tracking-wider text-muted">
          © {new Date().getFullYear()} {profile.name} · {t(ui.footer.built)}
        </p>
      </div>
    </footer>
  );
}
