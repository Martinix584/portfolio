"use client";

import { areaLabels, areaPitch, credentials, experience, profile } from "@/content/data";
import { ui } from "@/content/ui";
import { tag, useLang } from "@/lib/i18n";
import type { BuiltCv } from "./buildCv";

/** Hoja de CV en formato papel. Se usa en pantalla y como copia para imprimir/guardar en PDF. */
export function CvSheet({ cv }: { cv: BuiltCv }) {
  const { t, lang } = useLang();
  const { order } = cv;
  const pitch = order.areas.map((a) => t(areaPitch[a]));
  const pitchText =
    pitch.length === 1
      ? pitch[0]
      : `${pitch.slice(0, -1).join("; ")}${lang === "es" ? " y " : " and "}${pitch[pitch.length - 1]}`;

  return (
    <div className="relative bg-white px-8 py-9 font-sans text-[13px] leading-snug text-[#1b1b1b] sm:px-10 print:px-0 print:py-0">
      {/* Sello */}
      <div className="absolute top-6 right-6 rotate-[-8deg] rounded border-2 border-[#1f7a45] px-2 py-1 text-center font-mono text-[10px] font-semibold uppercase leading-tight text-[#1f7a45] print:top-0 print:right-0">
        ✓ {t(ui.order.qc)}
        <br />
        {t(ui.order.number)} {order.number}
      </div>

      <header className="border-b-2 border-[#1b1b1b] pb-3 pr-28">
        <h1 className="font-display text-4xl font-black uppercase leading-none tracking-tight">{profile.name}</h1>
        <p className="mt-1 font-semibold text-[#444]">{order.position || t(profile.role)}</p>
        <p className="mt-2 font-mono text-[11px] text-[#444]">
          {profile.email} · {profile.phone} · {profile.location}
          <br />
          {profile.linkedin.replace("https://", "")} · {profile.github.replace("https://", "")}
        </p>
      </header>

      {order.client && (
        <p className="mt-3 font-mono text-[11px] uppercase tracking-wider text-[#8a6a00]">
          {t(ui.order.madeFor)}: {order.client}
          {order.position ? ` · ${order.position}` : ""}
        </p>
      )}

      <Section title={t(ui.cv.summary)}>
        <p>{t(profile.summary)}</p>
        <p className="mt-1.5">
          <strong>{t(ui.cv.focus)}:</strong> {pitchText}.
        </p>
      </Section>

      <Section title={t(ui.cv.experience)}>
        <div className="flex flex-wrap items-baseline justify-between gap-x-4">
          <p className="font-semibold">
            {t(experience.role)} · <span className="font-normal italic">{t(experience.company)}</span>
          </p>
          <p className="font-mono text-[11px] text-[#555]">
            {t(experience.period)} · {profile.location}
          </p>
        </div>
        <ul className="mt-1.5 list-disc space-y-1 pl-5">
          {cv.stations.map((s) => (
            <li key={s.id}>
              {t(s.cvLine)}
            </li>
          ))}
          {cv.extraLines.map((e, i) => (
            <li key={i}>{t(e.line)}</li>
          ))}
        </ul>
      </Section>

      <Section title={t(ui.cv.skills)}>
        <div className="grid grid-cols-1 gap-x-6 gap-y-1 sm:grid-cols-2 print:grid-cols-2">
          {cv.skills.map(({ group, relevant }, i) => (
            <p key={i} className={relevant ? "" : "text-[#666]"}>
              <strong className={relevant ? "text-[#1b1b1b]" : "text-[#555]"}>{t(group.title)}:</strong>{" "}
              {group.items.map((it) => tag(t, it)).join(", ")}
            </p>
          ))}
        </div>
      </Section>

      <Section title={t(ui.cv.education)}>
        <ul className="space-y-0.5">
          {credentials.map((c, i) => (
            <li key={i}>
              <strong>{t(c.title)}</strong> · <span className="text-[#555]">{t(c.detail)}</span>
            </li>
          ))}
        </ul>
      </Section>

      <p className="mt-6 border-t border-dashed border-[#bbb] pt-2 font-mono text-[9px] uppercase tracking-wider text-[#888]">
        MP·WORKS · {order.areas.map((a) => t(areaLabels[a])).join(" · ")}
      </p>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-5 break-inside-avoid">
      <h2 className="mb-1.5 border-b border-[#ccc] pb-0.5 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8a6a00]">
        {title}
      </h2>
      {children}
    </section>
  );
}
