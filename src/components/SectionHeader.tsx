"use client";

import { motion } from "framer-motion";

interface Props { num: string; title: string; subtitle?: string; }

export default function SectionHeader({ num, title, subtitle }: Props) {
  return (
    <motion.div className="relative mb-16" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.5 }}>
      <span className="ghost-num">{num}</span>
      <div className="relative flex items-end gap-5">
        <span className="text-sm font-bold tracking-widest text-gray-300 dark:text-white/20 mb-1">{num}</span>
        <h2 className="text-4xl font-bold">{title}</h2>
        <motion.div className="flex-1 h-px divider mb-2" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} style={{ originX: 0 }} transition={{ duration: 0.9, ease: "easeInOut", delay: 0.2 }} />
      </div>
      {subtitle && <p className="mt-3 text-base text-gray-500 dark:text-white/40 max-w-xl">{subtitle}</p>}
    </motion.div>
  );
}
