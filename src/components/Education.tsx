"use client";

import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";
import { useLanguage } from "@/context/LanguageContext";
import { t } from "@/lib/i18n";

const COURSES: Record<string, string[]> = {
  en: [
    "Machine Learning",
    "Artificial Intelligence",
    "Neural Networks",
    "Data Mining",
    "Data Science",
    "Computer Vision",
    "Image Processing",
    "Databases",
    "Operating Systems",
    "Computer Networks",
    "Cryptography",
  ],
  id: [
    "Pembelajaran Mesin",
    "Kecerdasan Buatan",
    "Jaringan Saraf Tiruan",
    "Penambangan Data",
    "Sains Data",
    "Computer Vision",
    "Pengolahan Citra",
    "Basis Data",
    "Sistem Operasi",
    "Jaringan Komputer",
    "Kriptografi",
  ],
};

const THESIS: Record<string, string> = {
  en: "Analysis of the K-Nearest Neighbor (KNN) Algorithm for Gender Classification Based on Voice Characteristics",
  id: "Analisis Algoritma K-Nearest Neighbor (KNN) Untuk Klasifikasi Jenis Kelamin Berdasarkan Karakteristik Suara",
};

const UI: Record<string, Record<string, string>> = {
  en: {
    degree: "Bachelor of Computer Science",
    thesis: "Thesis",
    courses: "Relevant Courses",
  },
  id: {
    degree: "S1 Ilmu Komputer",
    thesis: "Tugas Akhir",
    courses: "Mata Kuliah Relevan",
  },
};

export default function Education() {
  const { lang } = useLanguage();
  const tx = t[lang].sections.education;
  const ui = UI[lang];
  const courses = COURSES[lang];

  return (
    <section className="py-24 px-6 relative z-10">
      <div className="max-w-5xl mx-auto">
        <SectionHeader num="04" title={tx.title} />

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6 }}
          className="card p-8 md:p-10"
        >
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-1">
            <h3 className="font-bold text-xl text-gray-900 dark:text-white/90">
              Universitas Islam Negeri Sumatera Utara
            </h3>
            <span className="text-sm text-gray-500 dark:text-white/40 border border-gray-200 dark:border-white/15 px-2.5 py-1 self-start shrink-0">
              2021 -- 2026
            </span>
          </div>
          <p className="text-gray-500 dark:text-white/40 italic mb-8 text-base">{ui.degree}</p>

          <div className="w-full h-px divider mb-8" />

          <div className="mb-8">
            <p className="text-sm font-bold tracking-widest uppercase text-gray-400 dark:text-white/30 mb-3">
              {ui.thesis}
            </p>
            <a
              href="https://ejurnal.stmik-budidarma.ac.id/index.php/jurikom/article/view/9117"
              target="_blank"
              rel="noopener noreferrer"
              className="text-base leading-relaxed text-gray-700 dark:text-white/60 hover:text-black dark:hover:text-white underline underline-offset-4 transition-colors"
            >
              {THESIS[lang]}
            </a>
          </div>

          <div>
            <p className="text-sm font-bold tracking-widest uppercase text-gray-400 dark:text-white/30 mb-4">
              {ui.courses}
            </p>
            <div className="flex flex-wrap gap-2">
              {courses.map((course, i) => (
                <motion.span
                  key={course}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                  className="text-sm border border-gray-200 dark:border-white/15 px-3 py-1.5 text-gray-600 dark:text-white/50 hover:border-gray-500 dark:hover:border-white/40 hover:text-black dark:hover:text-white transition-all duration-200"
                >
                  {course}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
