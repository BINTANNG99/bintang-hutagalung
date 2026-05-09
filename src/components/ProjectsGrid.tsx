"use client";

import { motion } from "framer-motion";
import { GithubRepo, getRepoTags, formatRepoName } from "@/lib/github";

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0) return "today";
  if (days < 7) return `${days}d ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  if (days < 365) return `${Math.floor(days / 30)}mo ago`;
  return `${Math.floor(days / 365)}y ago`;
}

export default function ProjectsGrid({ repos }: { repos: GithubRepo[] }) {
  if (repos.length === 0) {
    return (
      <p className="text-gray-400 text-base">
        Could not load repositories. Visit{" "}
        <a
          href="https://github.com/BINTANNG99"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-black"
        >
          github.com/BINTANNG99
        </a>{" "}
        directly.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {repos.map((repo, i) => {
        const tags = getRepoTags(repo);
        const name = formatRepoName(repo.name);

        return (
          <motion.a
            key={repo.id}
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            whileHover={{ y: -5 }}
            className="light-card p-7 flex flex-col group cursor-pointer"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <span className="text-sm text-gray-300 font-bold tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex items-center gap-2">
                {repo.stargazers_count > 0 && (
                  <span className="text-xs text-gray-400">
                    {repo.stargazers_count} star{repo.stargazers_count !== 1 ? "s" : ""}
                  </span>
                )}
                <span className="text-xs text-gray-400 border border-gray-200 px-2 py-0.5">
                  {timeAgo(repo.updated_at)}
                </span>
              </div>
            </div>

            {/* Name */}
            <h3 className="font-bold text-xl text-gray-900 mb-2 group-hover:text-black transition-colors leading-snug">
              {name}
            </h3>

            <div className="w-8 h-px bg-gray-200 mb-3" />

            {/* Description */}
            <p className="text-base text-gray-500 mb-5 flex-1 leading-relaxed">
              {repo.description ?? "No description provided."}
            </p>

            {/* Tags */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-5">
                {tags.map((t) => (
                  <span
                    key={t}
                    className="text-sm border border-gray-200 px-2.5 py-1 text-gray-500 group-hover:border-gray-400 transition-colors"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}

            {/* Footer */}
            <div className="flex items-center gap-2 mt-auto">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-gray-400 shrink-0"
              >
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
              <span className="text-sm text-gray-400 group-hover:text-gray-700 transition-colors underline underline-offset-4">
                View on GitHub
              </span>
            </div>
          </motion.a>
        );
      })}
    </div>
  );
}
