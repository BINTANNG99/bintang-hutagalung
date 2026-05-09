export const t = {
  en: {
    nav: {
      skills: "Skills", projects: "Projects", experience: "Experience",
      education: "Education", askai: "Ask AI",
    },
    hero: {
      badge: "Hello! I'm...",
      bio: "3 years of experience building, deploying, and monitoring AI models. Turning raw data into scalable, intelligent solutions.",
      cta: "See my work",
      ctaAI: "Ask AI about me",
      stats: ["Years Exp.", "GitHub Projects", "Skill Domains", "Courses"],
    },
    sections: {
      skills: { title: "Skills", sub: "Technical domains and tools I actively work with." },
      projects: { title: "Projects", sub: "Live from GitHub. Click any card to view the repository." },
      experience: { title: "Experience", sub: "" },
      education: { title: "Education", sub: "" },
      askai: { title: "Ask AI", sub: "Questions about my background? The AI assistant knows." },
      cvparser: { title: "CV Parser", sub: "" },
      playground: { title: "ML Playground", sub: "" },
      contact: { title: "Contact", sub: "Open for collaborations, research, and project discussions." },
      stats: { title: "GitHub Stats", sub: "Live activity pulled from my GitHub profile." },
    },
    projects: {
      viewAll: "View all repositories on GitHub",
      noRepos: "Could not load repositories.",
      filterAll: "All",
      search: "Search projects...",
    },
    contact: {
      headline: "Let us work together",
      body: "Interested in ML projects, research collaborations, or just want to connect?",
      sendVia: "Send via",
      send: "Send message",
      fields: { name: "Name", email: "Email", subject: "Subject", message: "Message" },
    },
    cv: { download: "Download CV" },
    footer: {
      tagline: "Machine Learning Engineer & Data Scientist",
      rights: "All rights reserved.",
    },
  },
  id: {
    nav: {
      skills: "Keahlian", projects: "Proyek", experience: "Pengalaman",
      education: "Pendidikan", askai: "Tanya AI",
    },
    hero: {
      badge: "Halo! Saya...",
      bio: "3 tahun pengalaman membangun, men-deploy, dan memantau model AI. Mengubah data mentah menjadi solusi cerdas yang skalabel.",
      cta: "Lihat karya saya",
      ctaAI: "Tanya AI tentang saya",
      stats: ["Tahun Pengalaman", "Proyek GitHub", "Domain Keahlian", "Mata Kuliah"],
    },
    sections: {
      skills: { title: "Keahlian", sub: "Domain teknis dan tools yang aktif saya gunakan." },
      projects: { title: "Proyek", sub: "Langsung dari GitHub. Klik kartu untuk membuka repository." },
      experience: { title: "Pengalaman", sub: "" },
      education: { title: "Pendidikan", sub: "" },
      askai: { title: "Tanya AI", sub: "Pertanyaan tentang latar belakang saya? Asisten AI siap menjawab." },
      cvparser: { title: "Parser CV", sub: "" },
      playground: { title: "ML Playground", sub: "" },
      contact: { title: "Kontak", sub: "Terbuka untuk kolaborasi, penelitian, dan diskusi proyek." },
      stats: { title: "Statistik GitHub", sub: "Aktivitas langsung dari profil GitHub saya." },
    },
    projects: {
      viewAll: "Lihat semua repository di GitHub",
      noRepos: "Gagal memuat repository.",
      filterAll: "Semua",
      search: "Cari proyek...",
    },
    contact: {
      headline: "Mari bekerja sama",
      body: "Tertarik dengan proyek ML, kolaborasi penelitian, atau sekadar ingin terhubung?",
      sendVia: "Kirim via",
      send: "Kirim pesan",
      fields: { name: "Nama", email: "Email", subject: "Subjek", message: "Pesan" },
    },
    cv: { download: "Unduh CV" },
    footer: {
      tagline: "Machine Learning Engineer & Data Scientist",
      rights: "Hak cipta dilindungi.",
    },
  },
} as const;

export type LangDict = typeof t.en;
