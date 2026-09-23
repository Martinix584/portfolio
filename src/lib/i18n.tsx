"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { L, Lang, Tag } from "@/content/data";

const STORAGE_KEY = "portfolio-lang";

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (text: L) => string };

const LangContext = createContext<Ctx | null>(null);

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("es");

  // El servidor siempre renderiza en español; al montar aplicamos la preferencia guardada o la del navegador.
  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem(STORAGE_KEY);
    } catch {}
    const initial: Lang =
      saved === "es" || saved === "en" ? saved : navigator.language.toLowerCase().startsWith("es") ? "es" : "en";
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLangState(initial);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {}
  }, []);

  const t = useCallback((text: L) => text[lang], [lang]);

  return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang debe usarse dentro de <LangProvider>");
  return ctx;
}

/** Resuelve una etiqueta que puede venir sin traducir. */
export function tag(t: (text: L) => string, item: Tag) {
  return typeof item === "string" ? item : t(item);
}
