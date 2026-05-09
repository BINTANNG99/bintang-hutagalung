"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { t } from "@/lib/i18n";

export default function Footer() {
  const { lang } = useLanguage();
  const tx = t[lang].footer;

  return (
    <footer className="border-t border-gray-200 dark:border-white/8 py-6 relative z-10 bg-white dark:bg-[#080808]">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-sm text-gray-400 dark:text-white/30"
        >
          Bintang Hutagalung &copy; 2026. {tx.rights}
        </motion.p>
      </div>
    </footer>
  );
}
