"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type Lang = "en" | "id";

interface LangCtx {
  lang: Lang;
  toggle: () => void;
}

const Ctx = createContext<LangCtx>({ lang: "en", toggle: () => {} });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const toggle = () => setLang((l) => (l === "en" ? "id" : "en"));
  return <Ctx.Provider value={{ lang, toggle }}>{children}</Ctx.Provider>;
}

export const useLanguage = () => useContext(Ctx);
