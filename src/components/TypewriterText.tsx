"use client";

import { useState, useEffect } from "react";
import { Lang } from "@/context/LanguageContext";

const PHRASES: Record<Lang, string[]> = {
  en: ["Machine Learning Engineer", "Data Scientist"],
  id: ["Machine Learning Engineer", "Data Scientist"],
};

export default function TypewriterText({ lang }: { lang: Lang }) {
  const phrases = PHRASES[lang];
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    setDisplayed("");
    setDeleting(false);
    setIndex(0);
  }, [lang]);

  useEffect(() => {
    const full = phrases[index];
    if (!deleting && displayed === full) {
      const t = setTimeout(() => setDeleting(true), 2500);
      return () => clearTimeout(t);
    }
    if (deleting && displayed === "") {
      setDeleting(false);
      setIndex((i) => (i + 1) % phrases.length);
      return;
    }
    const t = setTimeout(
      () => setDisplayed(deleting ? full.slice(0, displayed.length - 1) : full.slice(0, displayed.length + 1)),
      deleting ? 40 : 80
    );
    return () => clearTimeout(t);
  }, [displayed, deleting, index, phrases]);

  return (
    <span>
      {displayed}
      <span className="cursor-blink ml-0.5 opacity-70">|</span>
    </span>
  );
}
