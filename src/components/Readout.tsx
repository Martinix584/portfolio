"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";

/**
 * Display numérico tipo tablero: si el valor contiene un número, cuenta desde 0 al entrar en pantalla.
 * Conserva prefijos/sufijos ("−50%", "600+", "3600+", "24/7") y agrega separador de miles según el idioma.
 */
export function Readout({ value, locale }: { value: string; locale: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduce = useReducedMotion();
  const match = value.match(/^([^\d]*)(\d+)(.*)$/);
  const animatable = match && !value.includes("/");
  const target = animatable ? Number(match[2]) : 0;
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!animatable || !inView || reduce) return;
    const start = performance.now();
    const dur = 1100;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [animatable, inView, reduce, target]);

  if (!animatable) return <span ref={ref}>{value}</span>;
  const shown = reduce ? target : inView ? n : 0;
  const formatted = shown.toLocaleString(locale);
  return (
    <span ref={ref} className="tabular-nums">
      {match[1]}
      {formatted}
      {match[3]}
    </span>
  );
}
