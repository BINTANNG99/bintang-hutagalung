"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";
import { useLanguage } from "@/context/LanguageContext";
import { t } from "@/lib/i18n";
import { SKILL_CATEGORIES } from "@/lib/skills-data";

export default function Skills() {
  const { lang } = useLanguage();
  const tx = t[lang].sections.skills;

  return (
    <section className="py-24 px-6 relative z-10 section-alt">
      <div className="max-w-5xl mx-auto">
        <SectionHeader num="01" title={tx.title} subtitle={tx.sub} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SKILL_CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              whileHover={{ y: -4 }}
              className="card p-6 cursor-default"
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="text-sm text-gray-300 dark:text-white/20 font-bold tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-base font-bold text-gray-900 dark:text-white/90">
                  {cat.title}
                </h3>
              </div>
              <div className="w-6 h-px divider mb-4" />
              <div className="flex flex-wrap gap-2">
                {cat.items.map((skill) => (
                  <Link
                    key={skill.slug}
                    href={`/skills/${skill.slug}`}
                    className="text-sm border border-gray-200 dark:border-white/10 px-3 py-1 text-gray-600 dark:text-white/50 hover:text-black dark:hover:text-white hover:border-gray-700 dark:hover:border-white/40 hover:shadow-sm transition-all duration-200"
                  >
                    {skill.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
