"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    fetch("https://api.countapi.xyz/hit/bintang-hutagalung/portfolio-v2")
      .then((r) => r.json())
      .then((d) => { if (typeof d.value === "number") setCount(d.value); })
      .catch(() => {});
  }, []);

  if (count === null) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
      className="fixed bottom-6 left-6 z-40 card px-4 py-2.5 flex items-center gap-2"
    >
      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
      <span className="text-sm text-gray-600 dark:text-white/50">
        <strong className="text-gray-900 dark:text-white/90">{count.toLocaleString()}</strong> views
      </span>
    </motion.div>
  );
}
