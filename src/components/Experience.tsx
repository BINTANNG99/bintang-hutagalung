"use client";

import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";
import { useLanguage } from "@/context/LanguageContext";
import { t } from "@/lib/i18n";

interface Experience {
  position: string;
  company: string;
  city: string;
  period: string;
  bullets: string[];
}

const EXPERIENCES: Record<string, Experience[]> = {
  en: [
    {
      position: "Retail Operations & Inventory Staff",
      company: "J'M Beauty",
      city: "Medan",
      period: "Mar 2022 - Dec 2025",
      bullets: [
        "Managed daily store operations including cashier transactions, sales recording, and monthly reporting.",
        "Monitored incoming and outgoing goods, reconciling stock data against physical product counts.",
        "Maintained inventory availability through warehouse coordination, display arrangement, and restock checks.",
        "Supported sales through social media management, product content creation, and direct customer communication.",
      ],
    },
    {
      position: "Laboratory Assistant",
      company: "UIN Sumatera Utara",
      city: "Medan",
      period: "Feb 2022 - Jan 2024",
      bullets: [
        "Prepared computers, software, and technical lab equipment before practical sessions.",
        "Guided students during hands-on sessions, assisting with programming tools and resolving technical issues throughout the learning process.",
        "Maintained lab readiness through software installation, device inspection, and network maintenance.",
        "Coordinated with lecturers and the lab team to ensure practical sessions ran smoothly and the learning environment remained stable.",
      ],
    },
    {
      position: "IT Support (Community Service)",
      company: "Kantor Desa Perkotaan",
      city: "Batu Bara",
      period: "August 2024",
      bullets: [
        "Provided technical support for office devices to keep village administrative services running smoothly.",
        "Handled computer and network troubleshooting, including connectivity checks, device configuration, and basic issue resolution.",
        "Assisted with village website maintenance through content updates and functionality checks to keep public information accessible.",
      ],
    },
    {
      position: "Administration & IT Support (Internship)",
      company: "RSUD Dr. R.M. Djoelham",
      city: "Binjai",
      period: "October - November 2024",
      bullets: [
        "Supported administrative tasks through data entry, document filing, and patient file organization for easier retrieval.",
        "Prepared daily work devices through installation, configuration, and readiness checks.",
        "Resolved minor technical issues on computers and operational support equipment.",
        "Collaborated with unit staff to ensure administrative and technical needs were met in a timely manner.",
      ],
    },
  ],
  id: [
    {
      position: "Staf Operasional & Inventaris Retail",
      company: "J'M Beauty",
      city: "Medan",
      period: "Mar 2022 - Dec 2025",
      bullets: [
        "Menangani operasional harian toko, mulai dari transaksi kasir, pencatatan penjualan, hingga penyusunan rekap dan laporan.",
        "Memantau arus barang masuk dan keluar serta mencocokkan data stok dengan kondisi fisik produk di toko.",
        "Menjaga ketersediaan barang melalui koordinasi pengambilan stok dari gudang dan penataan display.",
        "Mendukung penjualan melalui pengelolaan media sosial, pembuatan konten produk, dan komunikasi dengan pelanggan secara langsung maupun digital.",
      ],
    },
    {
      position: "Asisten Laboratorium",
      company: "UIN Sumatera Utara",
      city: "Medan",
      period: "Feb 2022 - Jan 2024",
      bullets: [
        "Menyiapkan komputer, software, dan kebutuhan teknis laboratorium sebelum praktikum berlangsung.",
        "Mendampingi mahasiswa saat praktik dengan membantu penggunaan tools pemrograman dan menyelesaikan kendala teknis selama pembelajaran.",
        "Menjaga kesiapan laboratorium melalui instalasi software yang dibutuhkan, pemeriksaan perangkat, dan pemeliharaan jaringan.",
        "Berkoordinasi dengan dosen dan tim laboratorium agar kegiatan praktikum berjalan lancar dan lingkungan belajar tetap stabil.",
      ],
    },
    {
      position: "IT Support (Pengabdian Masyarakat)",
      company: "Kantor Desa Perkotaan",
      city: "Batu Bara",
      period: "Agustus 2024",
      bullets: [
        "Memberikan dukungan teknis untuk perangkat kerja kantor agar layanan administrasi desa tetap berjalan dengan baik.",
        "Menangani troubleshooting komputer dan jaringan, termasuk pengecekan konektivitas, konfigurasi perangkat, dan penanganan gangguan dasar.",
        "Membantu pemeliharaan website desa melalui pembaruan konten dan pengecekan fungsi agar informasi publik tetap terakses.",
      ],
    },
    {
      position: "Administrasi & IT Support (Magang)",
      company: "RSUD Dr. R.M. Djoelham",
      city: "Binjai",
      period: "Oktober - November 2024",
      bullets: [
        "Mendukung pekerjaan administrasi unit melalui input data, pengarsipan dokumen, dan penataan file pasien agar lebih rapi dan mudah ditelusuri.",
        "Menyiapkan perangkat kerja harian dengan melakukan instalasi, konfigurasi, dan pengecekan kesiapan penggunaan.",
        "Membantu menyelesaikan kendala teknis ringan pada komputer dan perangkat pendukung operasional.",
        "Bekerja sama dengan staf unit untuk memastikan kebutuhan administrasi dan teknis dapat dipenuhi tepat waktu.",
      ],
    },
  ],
};

export default function Experience() {
  const { lang } = useLanguage();
  const tx = t[lang].sections.experience;
  const experiences = EXPERIENCES[lang];

  return (
    <section className="py-24 px-6 relative z-10 section-alt">
      <div className="max-w-5xl mx-auto">
        <SectionHeader num="03" title={tx.title} />

        <div className="relative">
          <motion.div
            className="absolute left-[11px] top-3 bottom-3 w-px bg-gray-200 dark:bg-white/15 hidden md:block"
            initial={{ scaleY: 0, originY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
          />

          <div className="flex flex-col gap-8">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.position}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex gap-6"
              >
                <div className="hidden md:flex flex-col items-center pt-1 shrink-0">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.1 + 0.2 }}
                    className="w-6 h-6 border-2 border-gray-900 dark:border-white/50 bg-white dark:bg-[#0a0a0a] flex items-center justify-center shrink-0"
                  >
                    <div className="w-2 h-2 bg-gray-900 dark:bg-white/60" />
                  </motion.div>
                </div>

                <div className="card p-6 flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 dark:text-white/90 leading-snug">
                        {exp.position}
                      </h3>
                      <p className="text-base text-gray-500 dark:text-white/40 italic mt-0.5">
                        {exp.company}, {exp.city}
                      </p>
                    </div>
                    <span className="text-sm text-gray-400 dark:text-white/30 border border-gray-200 dark:border-white/15 px-2.5 py-1 self-start shrink-0 whitespace-nowrap">
                      {exp.period}
                    </span>
                  </div>

                  <div className="w-full h-px divider mb-4" />

                  <ul className="space-y-2">
                    {exp.bullets.map((b, j) => (
                      <li key={j} className="text-base text-gray-600 dark:text-white/55 leading-relaxed flex gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-white/25 shrink-0 mt-2" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
