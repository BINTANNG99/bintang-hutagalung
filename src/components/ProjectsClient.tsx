"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { GithubRepo, getRepoTags, formatRepoName, RepoCategory } from "@/lib/github";
import { useLanguage } from "@/context/LanguageContext";
import { t } from "@/lib/i18n";

const ALL_CATEGORIES: RepoCategory[] = [
  "Artificial Intelligence",
  "Machine Learning",
  "Deep Learning",
  "Generative AI",
];

function timeAgo(d: string) {
  const days = Math.floor((Date.now() - new Date(d).getTime()) / 86400000);
  if (days === 0) return "today";
  if (days < 7) return `${days}d ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  if (days < 365) return `${Math.floor(days / 30)}mo ago`;
  return `${Math.floor(days / 365)}y ago`;
}

export default function ProjectsClient({ repos }: { repos: GithubRepo[] }) {
  const { lang } = useLanguage();
  const tx = t[lang].projects;
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState<RepoCategory | null>(null);

  const filtered = useMemo(() => {
    let r = repos;
    if (search) r = r.filter((x) => (x.name + " " + (x.description ?? "")).toLowerCase().includes(search.toLowerCase()));
    if (activeTag) r = r.filter((x) => getRepoTags(x).includes(activeTag));
    return r;
  }, [repos, search, activeTag]);

  if (repos.length === 0) {
    return (
      <p className="text-gray-400 text-base">
        {tx.noRepos}{" "}
        <a href="https://github.com/BINTANNG99" target="_blank" rel="noopener noreferrer" className="underline hover:text-black dark:hover:text-white">
          github.com/BINTANNG99
        </a>
      </p>
    );
  }

  return (
    <>
      {/* Search + Category filters */}
      <div className="mb-8 flex flex-col gap-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={tx.search}
          className="w-full md:max-w-sm border border-gray-200 dark:border-white/12 bg-white dark:bg-white/5 px-4 py-2.5 text-base outline-none focus:border-gray-500 dark:focus:border-white/30 transition-colors"
        />
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTag(null)}
            className={`text-sm px-4 py-2 border transition-all ${
              !activeTag
                ? "bg-gray-900 dark:bg-white text-white dark:text-black border-gray-900 dark:border-white font-bold"
                : "border-gray-200 dark:border-white/12 text-gray-600 dark:text-white/50 hover:border-gray-500 dark:hover:border-white/30"
            }`}
          >
            {tx.filterAll}
          </button>
          {ALL_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTag(activeTag === cat ? null : cat)}
              className={`text-sm px-4 py-2 border transition-all ${
                activeTag === cat
                  ? "bg-gray-900 dark:bg-white text-white dark:text-black border-gray-900 dark:border-white font-bold"
                  : "border-gray-200 dark:border-white/12 text-gray-600 dark:text-white/50 hover:border-gray-500 dark:hover:border-white/30"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-gray-400 py-8 text-center text-base">
        {lang === "id" ? "Tidak ada proyek yang cocok dengan filter ini." : "No projects match this filter."}
      </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filtered.map((repo, i) => {
            const tags = getRepoTags(repo);
            const name = formatRepoName(repo.name);
            return (
              <motion.a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: (i % 6) * 0.06 }}
                whileHover={{ y: -5 }}
                className="card p-7 flex flex-col group cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-sm text-gray-300 dark:text-white/20 font-bold tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-xs text-gray-400 dark:text-white/30 border border-gray-200 dark:border-white/10 px-2 py-0.5">
                    {timeAgo(repo.updated_at)}
                  </span>
                </div>

                <h3 className="font-bold text-xl text-gray-900 dark:text-white/90 mb-2 group-hover:text-black dark:group-hover:text-white leading-snug">
                  {name}
                </h3>
                <div className="w-8 h-px divider mb-3" />
                <p className="text-base text-gray-500 dark:text-white/45 mb-5 flex-1 leading-relaxed">
                  {repo.description ?? "No description provided."}
                </p>

                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className={`text-sm border px-2.5 py-1 transition-colors ${
                          activeTag === tag
                            ? "border-gray-900 dark:border-white/60 text-gray-900 dark:text-white/90 font-bold"
                            : "border-gray-200 dark:border-white/10 text-gray-500 dark:text-white/40"
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center gap-2 mt-auto">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" className="text-gray-400 dark:text-white/30 shrink-0">
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                  </svg>
                  <span className="text-sm text-gray-400 dark:text-white/30 group-hover:text-gray-700 dark:group-hover:text-white/70 transition-colors underline underline-offset-4">
                    View on GitHub
                  </span>
                </div>
              </motion.a>
            );
          })}
        </div>
      )}
    </>
  );
}
