"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/lib/i18n";
import { ui } from "@/content/ui";

const SESSION_KEY = "portfolio-visit-counted";

/** Sensor de barrera óptica: cuenta una visita por sesión de navegador. */
export function VisitCounter() {
  const { t } = useLang();
  const [count, setCount] = useState<number | null>(null);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    let counted = false;
    try {
      counted = sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {}
    fetch("/api/visits", { method: counted ? "GET" : "POST" })
      .then((r) => r.json())
      .then((d: { count: number | null }) => {
        if (typeof d.count === "number") {
          setCount(d.count);
          setPulse(true);
          setTimeout(() => setPulse(false), 900);
          try {
            sessionStorage.setItem(SESSION_KEY, "1");
          } catch {}
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-muted">
      <span
        className={`inline-block h-2 w-2 rounded-full transition-all ${
          pulse ? "scale-150 bg-safety shadow-[0_0_10px_var(--yellow)]" : "bg-led led-blink shadow-[0_0_6px_var(--green)]"
        }`}
      />
      {count === null ? (
        <span>{t(ui.sensorOnline)}</span>
      ) : (
        <span>
          {t(ui.sensor)} <span className="text-ink tabular-nums">{String(count).padStart(6, "0")}</span>
        </span>
      )}
    </div>
  );
}
