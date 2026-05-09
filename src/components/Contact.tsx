"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

type Status = "idle" | "sending" | "sent" | "error";

const CONTACT_CARDS = [
  {
    key: "email",
    label: "Email",
    value: "bintanghutagalung232@gmail.com",
    short: "Gmail",
    href: "mailto:bintanghutagalung232@gmail.com",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2"/>
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
      </svg>
    ),
  },
  {
    key: "whatsapp",
    label: "WhatsApp",
    value: "+62 812-9990-2313",
    short: "Chat",
    href: "https://wa.me/6281299902313",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
      </svg>
    ),
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    value: "bintang-hutagalung",
    short: "Connect",
    href: "https://linkedin.com/in/bintang-hutagalung",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
];

const TEXT: Record<string, Record<string, string>> = {
  en: {
    available: "Available for projects",
    headline1: "Let's build something",
    headline2: "together.",
    sub: "Open for ML collaborations, research projects, internship opportunities, and technical discussions.",
    orSend: "Or send a direct message",
    name: "Your name",
    email: "Your email",
    message: "Your message...",
    send: "Send message",
    sending: "Sending...",
    sent: "Message sent",
    error: "Something went wrong. Please try again.",
  },
  id: {
    available: "Terbuka untuk proyek",
    headline1: "Mari membangun sesuatu",
    headline2: "bersama.",
    sub: "Terbuka untuk kolaborasi ML, proyek penelitian, peluang magang, dan diskusi teknis.",
    orSend: "Atau kirim pesan langsung",
    name: "Nama kamu",
    email: "Email kamu",
    message: "Pesanmu...",
    send: "Kirim pesan",
    sending: "Mengirim...",
    sent: "Pesan terkirim",
    error: "Terjadi kesalahan. Silakan coba lagi.",
  },
};

const MAX_CHARS = 500;

export default function Contact() {
  const { lang } = useLanguage();
  const tx = TEXT[lang];

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
      window.location.href = `mailto:bintanghutagalung232@gmail.com?subject=Portfolio Contact from ${encodeURIComponent(name)}&body=${encodeURIComponent(body)}`;
      setStatus("sent");
      setName("");
      setEmail("");
      setMessage("");
      setTimeout(() => setStatus("idle"), 4000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  const inputBase =
    "w-full bg-transparent border-b border-gray-200 dark:border-white/15 py-3 text-base outline-none focus:border-gray-900 dark:focus:border-white/60 transition-colors placeholder-gray-300 dark:placeholder-white/20 text-gray-900 dark:text-white/90";

  return (
    <section className="py-24 px-6 relative z-10">
      <div className="max-w-5xl mx-auto">

        {/* Top: headline + availability */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-gray-400 dark:bg-white/40 animate-pulse" />
            <span className="text-sm font-bold tracking-widest uppercase text-gray-400 dark:text-white/30">
              {tx.available}
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold leading-none text-gray-900 dark:text-white/90 mb-6">
              {tx.headline1}
              <br />
              <span className="text-gray-300 dark:text-white/25">{tx.headline2}</span>
            </h1>
            <p className="text-base md:text-lg text-gray-500 dark:text-white/40 max-w-lg leading-relaxed">
              {tx.sub}
            </p>
          </motion.div>
        </div>

        {/* Contact cards */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.25 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-20"
        >
          {CONTACT_CARDS.map((card, i) => (
            <motion.a
              key={card.key}
              href={card.href}
              target={card.key !== "email" ? "_blank" : undefined}
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
              whileHover={{ y: -6 }}
              className="card p-6 flex flex-col gap-4 group cursor-pointer"
            >
              <div className="flex items-start justify-between">
                <span className="text-gray-400 dark:text-white/30 group-hover:text-gray-900 dark:group-hover:text-white/90 transition-colors duration-300">
                  {card.icon}
                </span>
                <motion.span
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="text-xs text-gray-400 dark:text-white/25 font-bold tracking-widest uppercase"
                >
                  {card.short} &rarr;
                </motion.span>
              </div>

              <div className="flex flex-col gap-0.5 mt-2">
                <span className="text-xs font-bold tracking-widest uppercase text-gray-400 dark:text-white/25">
                  {card.label}
                </span>
                <span className="text-sm text-gray-700 dark:text-white/60 group-hover:text-gray-900 dark:group-hover:text-white/90 transition-colors break-all">
                  {card.value}
                </span>
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          style={{ originX: 0 }}
          transition={{ duration: 0.8 }}
          className="h-px divider mb-16"
        />

        {/* Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-lg font-bold text-gray-900 dark:text-white/90 mb-2">
              {tx.orSend}
            </p>
            <p className="text-sm text-gray-400 dark:text-white/25">
              bintanghutagalung232@gmail.com
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-8"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="flex flex-col gap-1">
                <input
                  type="text"
                  placeholder={tx.name}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className={inputBase}
                />
              </div>
              <div className="flex flex-col gap-1">
                <input
                  type="email"
                  placeholder={tx.email}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={inputBase}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1 relative">
              <textarea
                placeholder={tx.message}
                value={message}
                onChange={(e) => {
                  if (e.target.value.length <= MAX_CHARS) setMessage(e.target.value);
                }}
                required
                rows={5}
                className={`${inputBase} resize-none`}
              />
              <span className={`absolute bottom-3 right-0 text-xs tabular-nums transition-colors ${message.length > MAX_CHARS * 0.9 ? "text-gray-500 dark:text-white/40" : "text-gray-300 dark:text-white/15"}`}>
                {message.length}/{MAX_CHARS}
              </span>
            </div>

            {/* Submit */}
            <div className="flex items-center gap-6">
              <motion.button
                type="submit"
                disabled={status === "sending" || status === "sent"}
                whileHover={status === "idle" ? { x: 4 } : {}}
                whileTap={status === "idle" ? { scale: 0.97 } : {}}
                className="flex items-center gap-3 text-base font-bold text-gray-900 dark:text-white/90 disabled:opacity-50 transition-all"
              >
                <AnimatePresence mode="wait">
                  {status === "idle" && (
                    <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      {tx.send}
                    </motion.span>
                  )}
                  {status === "sending" && (
                    <motion.span key="sending" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                      <span>{tx.sending}</span>
                      <span className="flex gap-1">
                        {[0, 1, 2].map((i) => (
                          <motion.span key={i} className="w-1 h-1 rounded-full bg-gray-500 dark:bg-white/40 block"
                            animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }} />
                        ))}
                      </span>
                    </motion.span>
                  )}
                  {status === "sent" && (
                    <motion.span key="sent" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-2 text-gray-500 dark:text-white/40">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      {tx.sent}
                    </motion.span>
                  )}
                </AnimatePresence>

                {status === "idle" && (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"/>
                    <polyline points="12 5 19 12 12 19"/>
                  </svg>
                )}
              </motion.button>

              {status === "error" && (
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-gray-400 dark:text-white/30">
                  {tx.error}
                </motion.span>
              )}
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
