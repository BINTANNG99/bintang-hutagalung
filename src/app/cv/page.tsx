"use client";

import Image from "next/image";

const SKILLS_LIST = ["Python","R","SQL","Git","Docker","MLflow","DVC","Weights & Biases","Azure","Streamlit","Jupyter"];
const ML_LIST = ["Supervised/Unsupervised/Reinforcement Learning","CNN, RNN, LSTM, Autoencoders","GANs, VAEs, Diffusion Models, LLM/Transformers","Online & Batch Prediction, A/B Testing, Canary Release","Model Monitoring, Drift Detection, Retraining"];
const EXPERIENCES = [
  { role: "Staf Operasional & Inventaris Retail", company: "J'M Beauty", period: "Mar 2022 -- Dec 2025" },
  { role: "Asisten Laboratorium", company: "UIN Sumatera Utara", period: "Feb 2022 -- Jan 2024" },
  { role: "IT Support (Pengabdian Masyarakat)", company: "Kantor Desa Perkotaan, Batu Bara", period: "Agustus 2024" },
  { role: "Administrasi & IT Support (Magang)", company: "RSUD Dr. R.M. Djoelham, Binjai", period: "Okt -- Nov 2024" },
];

export default function CVPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Print button */}
      <div className="no-print fixed top-4 right-4 z-50 flex gap-2">
        <button
          onClick={() => window.print()}
          className="bg-black text-white px-5 py-2 text-sm font-bold hover:bg-gray-800 transition-colors"
        >
          Print / Save PDF
        </button>
        <a href="/" className="border border-gray-300 px-5 py-2 text-sm hover:border-black transition-colors">
          Back
        </a>
      </div>

      <div className="max-w-3xl mx-auto px-10 py-16 text-black print-section">
        {/* Header */}
        <div className="flex items-start justify-between mb-8 pb-6 border-b-2 border-black">
          <div>
            <h1 className="text-5xl font-bold leading-none mb-2">Bintang Hutagalung</h1>
            <p className="text-lg text-gray-600 italic mb-3">Machine Learning Engineer &amp; Data Scientist</p>
            <div className="flex flex-wrap gap-3 text-sm text-gray-600">
              <span>bintanghutagalung232@gmail.com</span>
              <span>|</span>
              <a href="https://github.com/BINTANNG99" className="underline">github.com/BINTANNG99</a>
              <span>|</span>
              <a href="https://linkedin.com/in/bintang-hutagalung" className="underline">linkedin.com/in/bintang-hutagalung</a>
            </div>
          </div>
          <div className="relative w-24 h-24 border-2 border-black overflow-hidden shrink-0">
            <Image src="/profil.jpg" alt="Bintang Hutagalung" fill className="object-cover object-top" />
          </div>
        </div>

        {/* Summary */}
        <div className="mb-8 print-section">
          <h2 className="text-xl font-bold mb-3 uppercase tracking-widest text-sm text-gray-400">Summary</h2>
          <div className="w-full h-px bg-gray-200 mb-4" />
          <p className="text-base leading-relaxed text-gray-700">
            Machine Learning Engineer and Data Scientist with 3+ years of experience developing, deploying,
            and monitoring AI models. Specialized in supervised and deep learning, MLOps, and model deployment.
            Strong background in Python, XGBoost, KNN, and cloud-based ML pipelines.
          </p>
        </div>

        {/* Skills */}
        <div className="mb-8 print-section">
          <h2 className="text-sm font-bold mb-3 uppercase tracking-widest text-gray-400">Technical Skills</h2>
          <div className="w-full h-px bg-gray-200 mb-4" />
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-bold mb-2">Tools &amp; Platforms</p>
              <p className="text-sm text-gray-600">{SKILLS_LIST.join(", ")}</p>
            </div>
            <div>
              <p className="text-sm font-bold mb-2">ML &amp; AI Domains</p>
              <ul className="text-sm text-gray-600 space-y-1">
                {ML_LIST.map((s) => <li key={s} className="flex gap-2"><span className="opacity-40">--</span>{s}</li>)}
              </ul>
            </div>
          </div>
        </div>

        {/* Projects */}
        <div className="mb-8 print-section">
          <h2 className="text-sm font-bold mb-3 uppercase tracking-widest text-gray-400">Projects</h2>
          <div className="w-full h-px bg-gray-200 mb-4" />
          <div className="flex flex-col gap-4">
            {[
              { name: "KNN Voice Gender Classification", desc: "Published research. KNN-based classification of gender from acoustic voice features on the UCI Voice dataset.", link: "github.com/BINTANNG99/knn-gender-classification-voice", tags: "KNN, Python, Audio Analysis" },
              { name: "Adult Income Classification (XGBoost)", desc: "Income classification on UCI Adult dataset with class imbalance handling, probability calibration, and Boruta feature selection.", link: "github.com/BINTANNG99", tags: "XGBoost, SMOTE, Boruta, Feature Selection" },
              { name: "A* Flood Evacuation Routing -- Medan", desc: "Optimal evacuation route planning using A* pathfinding algorithm for flood scenarios in Medan city.", link: "github.com/BINTANNG99/astar-flood-evacuation-medan", tags: "A* Search, Pathfinding, Jupyter" },
            ].map((p) => (
              <div key={p.name} className="flex flex-col gap-1">
                <div className="flex items-start justify-between">
                  <strong className="text-base">{p.name}</strong>
                  <span className="text-xs text-gray-400 shrink-0 ml-4">{p.tags}</span>
                </div>
                <p className="text-sm text-gray-600">{p.desc}</p>
                <a href={`https://${p.link}`} className="text-xs text-gray-400 underline">{p.link}</a>
              </div>
            ))}
          </div>
        </div>

        {/* Experience */}
        <div className="mb-8 print-section">
          <h2 className="text-sm font-bold mb-3 uppercase tracking-widest text-gray-400">Experience</h2>
          <div className="w-full h-px bg-gray-200 mb-4" />
          <div className="flex flex-col gap-4">
            {EXPERIENCES.map((e) => (
              <div key={e.role} className="flex items-start justify-between gap-4">
                <div>
                  <strong className="text-base">{e.role}</strong>
                  <p className="text-sm text-gray-600 italic">{e.company}</p>
                </div>
                <span className="text-sm text-gray-400 whitespace-nowrap shrink-0">{e.period}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="print-section">
          <h2 className="text-sm font-bold mb-3 uppercase tracking-widest text-gray-400">Education</h2>
          <div className="w-full h-px bg-gray-200 mb-4" />
          <div className="flex items-start justify-between gap-4">
            <div>
              <strong className="text-base">S1 Ilmu Komputer</strong>
              <p className="text-sm text-gray-600 italic">Universitas Islam Negeri Sumatera Utara</p>
              <p className="text-sm text-gray-500 mt-1">
                Tugas Akhir: Analisis Algoritma KNN Untuk Klasifikasi Jenis Kelamin Berdasarkan Karakteristik Suara
              </p>
            </div>
            <span className="text-sm text-gray-400 whitespace-nowrap shrink-0">2021 -- 2026</span>
          </div>
        </div>
      </div>
    </div>
  );
}
