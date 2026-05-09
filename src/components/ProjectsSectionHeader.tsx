"use client";

import SectionHeader from "./SectionHeader";
import { useLanguage } from "@/context/LanguageContext";
import { t } from "@/lib/i18n";

export default function ProjectsSectionHeader() {
  const { lang } = useLanguage();
  const tx = t[lang].sections.projects;
  return <SectionHeader num="02" title={tx.title} subtitle={tx.sub} />;
}
