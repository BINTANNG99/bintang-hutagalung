"use client";

import { motion } from "framer-motion";
import { GithubRepo } from "@/lib/github";
import { useLanguage } from "@/context/LanguageContext";
import { t } from "@/lib/i18n";
import SectionHeader from "./SectionHeader";

function buildLangStats(repos: GithubRepo[]) {
  const counts: Record<string, number> = {};
  for (const r of repos) {
    const lang = r.language ?? "Other";
    counts[lang] = (counts[lang] ?? 0) + 1;
  }
  const total = Object.values(counts).reduce((a, b) => a + b, 0);
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, count]) => ({ name, count, pct: Math.round((count / total) * 100) }));
}

const LANG_COLORS: Record<string, string> = {
  "Jupyter Notebook": "#DA5B0B",
  Python: "#3572A5",
  R: "#198CE7",
  JavaScript: "#F1E05A",
  TypeScript: "#3178C6",
  Other: "#888888",
};

export default function GitHubStats({ repos }: { repos: GithubRepo[] }) {
  const { lang } = useLanguage();
  const tx = t[lang].sections.stats;

  const totalStars = repos.reduce((s, r) => s + r.stargazers_count, 0);
  const totalForks = repos.reduce((s, r) => s + r.forks_count, 0);
  const langStats = buildLangStats(repos);

  const LABELS: Record<string, Record<string, string>> = {
    en: {
      overview: "Overview",
      breakdown: "Language Breakdown",
      repos: "Public Repos",
      stars: "Total Stars",
      forks: "Total Forks",
      langs: "Languages",
    },
    id: {
      overview: "Ringkasan",
      breakdown: "Bahasa Pemrograman",
      repos: "Repo Publik",
      stars: "Total Bintang",
      forks: "Total Fork",
      langs: "Bahasa",
    },
  };

  const lb = LABELS[lang];

  const metrics = [
    { label: lb.repos, value: repos.length },
    { label: lb.stars, value: totalStars },
    { label: lb.forks, value: totalForks },
    { label: lb.langs, value: langStats.length },
  ];

  return (
    <section className="py-24 px-6 relative z-10 section-alt">
      <div className="max-w-5xl mx-auto">
        <SectionHeader num="02.1" title={tx.title} subtitle={tx.sub} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Metrics */}
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="card p-6">
            <p className="text-sm font-bold tracking-widest uppercase text-gray-400 dark:text-white/30 mb-6">{lb.overview}</p>
            <div className="grid grid-cols-2 gap-5">
              {metrics.map((m, i) => (
                <motion.div key={m.label} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="flex flex-col gap-1">
                  <span className="text-3xl font-bold">{m.value}</span>
                  <span className="text-sm text-gray-500 dark:text-white/40">{m.label}</span>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-100 dark:border-white/8">
              <a href="https://github.com/BINTANNG99" target="_blank" rel="noopener noreferrer"
                className="text-sm text-gray-500 dark:text-white/40 hover:text-black dark:hover:text-white transition-colors underline underline-offset-4">
                github.com/BINTANNG99
              </a>
            </div>
          </motion.div>

          {/* Language breakdown */}
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="card p-6">
            <p className="text-sm font-bold tracking-widest uppercase text-gray-400 dark:text-white/30 mb-6">{lb.breakdown}</p>

            {/* Bar */}
            <div className="flex h-3 rounded-none overflow-hidden mb-6 gap-px">
              {langStats.map((l) => (
                <motion.div
                  key={l.name}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${l.pct}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  style={{ background: LANG_COLORS[l.name] ?? LANG_COLORS.Other }}
                  title={`${l.name}: ${l.pct}%`}
                />
              ))}
            </div>

            <div className="flex flex-col gap-3">
              {langStats.map((l, i) => (
                <motion.div key={l.name} initial={{ opacity: 0, x: 10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} className="flex items-center gap-3">
                  <span className="w-3 h-3 shrink-0" style={{ background: LANG_COLORS[l.name] ?? LANG_COLORS.Other }} />
                  <span className="text-base flex-1">{l.name}</span>
                  <span className="text-sm text-gray-500 dark:text-white/40 tabular-nums">{l.pct}%</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
