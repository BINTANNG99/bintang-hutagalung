"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { Skill } from "@/lib/skills-data";

const UI: Record<string, Record<string, string>> = {
  en: {
    breadcrumbRoot: "Skills",
    comingSoon: "Article coming soon",
    comingDesc: "A detailed explanation, practical use cases, and references for",
    comingDesc2: "will be published here.",
    alsoIn: "Also in",
    backAll: "Back to all skills",
  },
  id: {
    breadcrumbRoot: "Keahlian",
    comingSoon: "Artikel segera hadir",
    comingDesc: "Penjelasan lengkap, kasus penggunaan, dan referensi untuk",
    comingDesc2: "akan diterbitkan di sini.",
    alsoIn: "Lainnya di",
    backAll: "Kembali ke semua keahlian",
  },
};

interface Props {
  skill: Skill;
  related: Skill[];
}

export default function SkillPageClient({ skill, related }: Props) {
  const { lang } = useLanguage();
  const ui = UI[lang];

  return (
    <div className="py-24 px-6 relative z-10 min-h-[80vh]">
      <div className="max-w-2xl mx-auto">

        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-sm text-gray-400 dark:text-white/30 mb-12"
        >
          <Link href="/skills" className="hover:text-black dark:hover:text-white transition-colors">
            {ui.breadcrumbRoot}
          </Link>
          <span>/</span>
          <span className="text-gray-500 dark:text-white/40">{skill.category}</span>
          <span>/</span>
          <span className="text-gray-800 dark:text-white/70">{skill.name}</span>
        </motion.div>

        {/* Main card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card p-10 mb-8"
        >
          <p className="text-sm font-bold tracking-widest uppercase text-gray-400 dark:text-white/25 mb-3">
            {skill.category}
          </p>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white/90 mb-4">
            {skill.name}
          </h1>
          <div className="w-12 h-px divider mb-8" />

          <div className="flex flex-col items-start gap-4">
            <div className="flex items-center gap-3">
              <motion.span
                className="w-2 h-2 rounded-full bg-gray-300 dark:bg-white/30"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-base text-gray-500 dark:text-white/40 italic">
                {ui.comingSoon}
              </span>
            </div>
            <p className="text-base text-gray-500 dark:text-white/40 leading-relaxed">
              {ui.comingDesc}{" "}
              <strong className="text-gray-700 dark:text-white/60">{skill.name}</strong>{" "}
              {ui.comingDesc2}
            </p>
          </div>
        </motion.div>

        {/* Related skills */}
        {related.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-10"
          >
            <p className="text-sm font-bold tracking-widest uppercase text-gray-400 dark:text-white/25 mb-4">
              {ui.alsoIn} {skill.category}
            </p>
            <div className="flex flex-wrap gap-2">
              {related.map((s) => (
                <Link
                  key={s.slug}
                  href={`/skills/${s.slug}`}
                  className="text-sm border border-gray-200 dark:border-white/15 px-3 py-1.5 text-gray-600 dark:text-white/50 hover:text-black dark:hover:text-white hover:border-gray-700 dark:hover:border-white/40 transition-all"
                >
                  {s.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}

        <Link
          href="/skills"
          className="text-sm text-gray-400 dark:text-white/30 hover:text-black dark:hover:text-white transition-colors underline underline-offset-4"
        >
          {ui.backAll}
        </Link>
      </div>
    </div>
  );
}
