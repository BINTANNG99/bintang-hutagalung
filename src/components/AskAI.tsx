"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeader from "./SectionHeader";
import { useLanguage } from "@/context/LanguageContext";
import { t } from "@/lib/i18n";

interface Message { role: "user" | "assistant"; content: string; id: string; }

const SUGGESTIONS: Record<string, string[]> = {
  en: [
    "What are Bintang's core ML skills?",
    "Tell me about the voice classification project",
    "What deployment techniques does Bintang know?",
    "What is the educational background?",
  ],
  id: [
    "Apa keahlian ML utama Bintang?",
    "Ceritakan tentang proyek klasifikasi suara",
    "Teknik deployment apa yang dikuasai Bintang?",
    "Apa latar belakang pendidikan Bintang?",
  ],
};

const INIT = (lang: string): Message => ({
  role: "assistant",
  content: lang === "id"
    ? "Halo. Saya asisten AI yang mengetahui portofolio Bintang. Tanyakan apa saja tentang keahlian, proyek, atau pengalaman."
    : "Hi. I'm an AI trained on Bintang's portfolio. Ask me anything about skills, projects, or experience.",
  id: "init",
});

export default function AskAI() {
  const { lang } = useLanguage();
  const tx = t[lang];
  const [messages, setMessages] = useState<Message[]>([INIT(lang)]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { setMessages([INIT(lang)]); }, [lang]);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, loading]);

  const send = async (text?: string) => {
    const content = (text ?? input).trim();
    if (!content || loading) return;
    setInput("");
    setError("");
    const userMsg: Message = { role: "user", content, id: `u${Date.now()}` };
    const newMsgs = [...messages, userMsg];
    setMessages(newMsgs);
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMsgs }),
      });
      const data = await res.json();
      if (data.error) {
        setError(data.error);
        setMessages((prev) => [...prev, { role: "assistant", content: "Sorry, something went wrong. Please try again.", id: `a${Date.now()}` }]);
      } else {
        setMessages((prev) => [...prev, { role: "assistant", content: data.message, id: `a${Date.now()}` }]);
      }
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: "Connection error. Please try again.", id: `a${Date.now()}` }]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  return (
    <section className="py-24 px-6 relative z-10">
      <div className="max-w-5xl mx-auto">
        <SectionHeader num="05" title={tx.sections.askai.title} subtitle={tx.sections.askai.sub} />

        {error && (
          <div className="mb-4 border border-red-200 bg-red-50 dark:bg-red-900/10 dark:border-red-500/20 px-4 py-2.5 text-sm text-red-600 dark:text-red-400">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Suggestions — framed card, no dashes */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="card p-5 flex flex-col gap-2 h-fit"
          >
            <p className="text-sm uppercase tracking-widest text-gray-400 dark:text-white/30 mb-3 font-bold">
              Try asking
            </p>
            {SUGGESTIONS[lang].map((s) => (
              <motion.button
                key={s}
                whileHover={{ x: 4 }}
                onClick={() => send(s)}
                disabled={loading}
                className="text-left text-base px-4 py-3 text-gray-600 dark:text-white/50 hover:text-black dark:hover:text-white/80 border border-gray-100 dark:border-white/6 hover:border-gray-300 dark:hover:border-white/20 transition-all disabled:opacity-30 bg-gray-50 dark:bg-white/2 hover:bg-white dark:hover:bg-white/5"
              >
                {s}
              </motion.button>
            ))}
          </motion.div>

          {/* Chat panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 flex flex-col bg-white dark:bg-white/3 border border-gray-200 dark:border-white/10 shadow-md ai-glow"
            style={{ height: 500 }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-5 py-3.5 border-b border-gray-100 dark:border-white/8">
              <motion.div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-white/40" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 2, repeat: Infinity }} />
              <span className="text-sm tracking-widest uppercase text-gray-500 dark:text-white/40 font-bold">AI Assistant</span>
              <span className="ml-auto text-sm text-gray-300 dark:text-white/20">Powered by Gemini</span>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4">
              <AnimatePresence initial={false}>
                {messages.map((msg) => (
                  <motion.div key={msg.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    {msg.role === "assistant" && (
                      <div className="flex flex-col gap-2 max-w-xs lg:max-w-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-white/40" />
                          <span className="text-xs text-gray-500 dark:text-white/40 tracking-widest uppercase font-bold">AI</span>
                        </div>
                        <div className="border border-gray-200 dark:border-white/12 bg-gray-50 dark:bg-white/4 px-4 py-3 text-base text-gray-700 dark:text-white/70 leading-relaxed shadow-sm">
                          {msg.content}
                        </div>
                      </div>
                    )}
                    {msg.role === "user" && (
                      <div className="max-w-xs lg:max-w-sm bg-gray-900 dark:bg-white/10 px-4 py-3 text-base text-white leading-relaxed shadow-sm">
                        {msg.content}
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>

              {loading && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                  <div className="border border-gray-200 dark:border-white/12 bg-gray-50 dark:bg-white/4 px-4 py-3">
                    <div className="flex gap-1.5">
                      {[0, 1, 2].map((i) => (
                        <motion.div key={i} className="w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-white/40"
                          animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }} />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="border-t border-gray-100 dark:border-white/8 flex items-center">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), send())}
                placeholder={lang === "id" ? "Tanya tentang Bintang..." : "Ask about Bintang..."}
                className="flex-1 bg-transparent px-5 py-4 text-base outline-none text-gray-800 dark:text-white/80 placeholder-gray-300 dark:placeholder-white/20"
              />
              <motion.button
                onClick={() => send()}
                disabled={loading || !input.trim()}
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                className="px-5 py-4 text-sm font-bold tracking-widest uppercase text-gray-400 dark:text-white/40 hover:text-black dark:hover:text-white border-l border-gray-100 dark:border-white/8 transition-colors disabled:opacity-20"
              >
                {lang === "id" ? "Kirim" : "Send"}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
