"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import NeuralCanvas from "./NeuralCanvas";
import TypewriterText from "./TypewriterText";
import CounterStat from "./CounterStat";
import { useLanguage } from "@/context/LanguageContext";
import { t } from "@/lib/i18n";

const STAT_VALS = [3, 7, 6, 11];
const STAT_SUFFIXES = ["+", "", "", ""];

export default function Hero() {
  const { lang } = useLanguage();
  const tx = t[lang].hero;

  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-20 pb-16 px-6 overflow-hidden bg-white dark:bg-[#080808]">
      <div className="absolute inset-0 z-0 opacity-50 dark:opacity-100">
        <NeuralCanvas />
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-32 z-[1] bg-gradient-to-t from-[#fafafa] dark:from-[#080808] to-transparent pointer-events-none" />

      <div className="relative z-[2] max-w-5xl mx-auto w-full">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-12 md:gap-16">

          {/* Profile photo */}
          <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7 }} className="flex-shrink-0">
            <div className="relative w-44 h-44 md:w-56 md:h-56">
              <div className="absolute inset-0 border border-gray-300 dark:border-white/20" style={{ transform: "translate(10px,10px)" }} />
              <div className="absolute inset-0 border border-gray-200 dark:border-white/10" style={{ transform: "translate(5px,5px)" }} />
              <div className="relative w-full h-full border-2 border-gray-900 dark:border-white/60 overflow-hidden bg-gray-100 shadow-lg">
                <Image src="/profil.jpg" alt="Bintang Hutagalung" fill sizes="(max-width: 768px) 176px, 224px" className="object-cover object-top" priority />
              </div>
            </div>
          </motion.div>

          {/* Text */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left flex-1">
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="text-sm tracking-[0.2em] uppercase text-gray-400 dark:text-white/30 mb-4 font-bold">
              {tx.badge}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold leading-none mb-3"
            >
              Bintang Hutagalung
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="text-xl md:text-2xl text-gray-500 dark:text-white/60 mb-5 italic">
              <TypewriterText lang={lang} />
            </motion.p>

            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} className="max-w-md text-gray-600 dark:text-white/50 mb-8 leading-relaxed text-base">
              {tx.bio}
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.52 }} className="flex flex-wrap gap-3">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link href="/projects"
                  className="inline-block border-2 border-gray-900 dark:border-white/60 bg-gray-900 dark:bg-white text-white dark:text-black px-8 py-3 text-base hover:bg-white dark:hover:bg-transparent hover:text-black dark:hover:text-white transition-all duration-300 font-bold shadow-md">
                  {tx.cta}
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link href="/askai"
                  className="inline-block border-2 border-gray-400 dark:border-white/40 text-gray-600 dark:text-white/60 px-8 py-3 text-base hover:border-gray-900 dark:hover:border-white hover:text-black dark:hover:text-white transition-all duration-300">
                  {tx.ctaAI}
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Stats */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }}
          className="mt-16 md:mt-20 border-t border-gray-200 dark:border-white/8 pt-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          {STAT_VALS.map((val, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 + i * 0.08 }} className="flex flex-col gap-1">
              <span className="text-4xl font-bold">
                <CounterStat value={val} suffix={STAT_SUFFIXES[i]} />
              </span>
              <span className="text-sm text-gray-500 dark:text-white/40">{tx.stats[i]}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
