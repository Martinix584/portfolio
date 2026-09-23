"use client";

import { useState } from "react";
import { MoveHorizontal } from "lucide-react";
import type { L } from "@/content/data";
import { ui } from "@/content/ui";
import { useLang } from "@/lib/i18n";

/** Comparador antes/después: se arrastra el divisor para revelar el "después". */
export function BeforeAfter({ before, after }: { before: L; after: L }) {
  const { t } = useLang();
  const [pos, setPos] = useState(50);

  return (
    <div className="relative mt-5 h-28 select-none overflow-hidden rounded-md border border-line font-mono">
      {/* Antes */}
      <div className="absolute inset-0 flex flex-col justify-center bg-[#2a1614] px-5">
        <span className="text-[10px] uppercase tracking-widest text-alarm">{t(ui.line.before)}</span>
        <span className="mt-1 text-sm text-ink/80 line-through decoration-alarm/70 sm:text-base">{t(before)}</span>
      </div>
      {/* Después, recortado según el divisor */}
      <div
        className="absolute inset-0 flex flex-col items-end justify-center bg-[#12251a] px-5 text-right"
        style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
      >
        <span className="text-[10px] uppercase tracking-widest text-led">{t(ui.line.after)}</span>
        <span className="mt-1 text-sm font-semibold text-ink sm:text-base">{t(after)}</span>
      </div>
      {/* Divisor */}
      <div className="pointer-events-none absolute inset-y-0 w-1 -translate-x-1/2 bg-safety" style={{ left: `${pos}%` }}>
        <div className="absolute top-1/2 left-1/2 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-safety text-black shadow-lg">
          <MoveHorizontal className="h-4 w-4" />
        </div>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label={t(ui.line.drag)}
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
      />
    </div>
  );
}
