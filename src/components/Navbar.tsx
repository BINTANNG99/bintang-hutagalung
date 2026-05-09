"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { useLanguage } from "@/context/LanguageContext";
import { t } from "@/lib/i18n";

const NAV_KEYS = ["skills", "projects", "experience", "education", "askai"] as const;
const NAV_HREFS: Record<string, string> = {
  skills: "/skills",
  projects: "/projects",
  experience: "/experience",
  education: "/education",
  askai: "/askai",
};

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1" x2="12" y2="3"/>
      <line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/>
      <line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const { lang, toggle: toggleLang } = useLanguage();
  const pathname = usePathname();
  const tx = t[lang].nav;

  const navLinks = NAV_KEYS.map((key) => ({
    href: NAV_HREFS[key],
    label: tx[key],
    key,
  }));

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const isDark = mounted && theme === "dark";

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 dark:bg-[#080808]/95 backdrop-blur-sm border-b border-gray-200 dark:border-white/8 shadow-sm"
          : "bg-white/80 dark:bg-transparent backdrop-blur-sm"
      }`}>
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}>
            <Link href="/" className="text-xl font-bold tracking-tight">BH</Link>
          </motion.div>

          {/* Desktop */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
            className="hidden md:flex items-center gap-7 text-base">
            {navLinks.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                className={`relative transition-colors duration-200 ${
                  isActive(link.href)
                    ? "font-bold text-gray-900 dark:text-white"
                    : "text-gray-500 dark:text-white/50 hover:text-black dark:hover:text-white"
                }`}
              >
                {link.label}
                {isActive(link.href) && (
                  <motion.span layoutId="nav-ul" className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-gray-900 dark:bg-white" />
                )}
              </Link>
            ))}
          </motion.div>

          {/* Actions */}
          <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}
            className="hidden md:flex items-center gap-2">
            <button
              onClick={toggleLang}
              className="text-sm border border-gray-200 dark:border-white/15 px-3 py-1.5 text-gray-600 dark:text-white/60 hover:border-gray-500 dark:hover:border-white/40 transition-all font-bold"
            >
              {lang === "en" ? "ID" : "EN"}
            </button>
            {mounted && (
              <button
                onClick={() => setTheme(isDark ? "light" : "dark")}
                className="border border-gray-200 dark:border-white/15 px-3 py-1.5 text-gray-600 dark:text-white/60 hover:border-gray-500 dark:hover:border-white/40 transition-all"
                aria-label="Toggle theme"
              >
                {isDark ? <SunIcon /> : <MoonIcon />}
              </button>
            )}
            <a href="https://github.com/BINTANNG99" target="_blank" rel="noopener noreferrer"
              className="text-sm border border-gray-200 dark:border-white/15 px-3 py-1.5 text-gray-600 dark:text-white/60 hover:border-gray-500 dark:hover:border-white/40 transition-all">
              GitHub
            </a>
            <a href="/Bintang-Hutagalung.pdf" download
              className="text-sm bg-gray-900 dark:bg-white text-white dark:text-black px-3 py-1.5 hover:opacity-80 transition-all font-bold">
              {t[lang].cv.download}
            </a>
          </motion.div>

          {/* Hamburger */}
          <button className="md:hidden flex flex-col gap-1.5 p-1" onClick={() => setOpen((v) => !v)} aria-label="Menu">
            <motion.span animate={open ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }} className="block w-5 h-px bg-gray-800 dark:bg-white/80 origin-center" />
            <motion.span animate={open ? { opacity: 0 } : { opacity: 1 }} className="block w-5 h-px bg-gray-800 dark:bg-white/80" />
            <motion.span animate={open ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }} className="block w-5 h-px bg-gray-800 dark:bg-white/80 origin-center" />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[61px] left-0 right-0 z-40 bg-white dark:bg-[#0e0e0e] border-b border-gray-200 dark:border-white/10 shadow-lg"
          >
            <div className="max-w-5xl mx-auto px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link, i) => (
                <motion.div key={link.key} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                  <Link href={link.href} onClick={() => setOpen(false)}
                    className={`text-xl font-bold transition-colors ${isActive(link.href) ? "text-black dark:text-white" : "text-gray-600 dark:text-white/60 hover:text-black dark:hover:text-white"}`}>
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <div className="flex flex-wrap gap-2 pt-3 border-t border-gray-100 dark:border-white/10">
                <button onClick={toggleLang} className="text-sm border border-gray-300 dark:border-white/20 px-3 py-2 font-bold">{lang === "en" ? "ID" : "EN"}</button>
                {mounted && (
                  <button onClick={() => setTheme(isDark ? "light" : "dark")} className="border border-gray-300 dark:border-white/20 px-3 py-2 text-gray-600 dark:text-white/60" aria-label="Toggle theme">
                    {isDark ? <SunIcon /> : <MoonIcon />}
                  </button>
                )}
                <a href="https://github.com/BINTANNG99" target="_blank" rel="noopener noreferrer" className="text-sm border border-gray-300 dark:border-white/20 px-4 py-2 text-gray-600 dark:text-white/60">GitHub</a>
                <a href="/Bintang-Hutagalung.pdf" download className="text-sm bg-gray-900 dark:bg-white text-white dark:text-black px-4 py-2 font-bold">{t[lang].cv.download}</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
