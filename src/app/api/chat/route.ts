import https from "node:https";
import { NextRequest, NextResponse } from "next/server";

const SYSTEM = `You are an AI assistant embedded in Bintang Hutagalung's portfolio website.

About Bintang:
- Machine Learning Engineer and Data Scientist, Medan, Indonesia
- 3+ years experience in ML development, deployment, and monitoring
- Education: S1 Ilmu Komputer, UIN Sumatera Utara, 2021-2026
- Thesis: KNN Algorithm for Gender Classification by Voice (published in JURIKOM journal)

Technical Skills:
- ML: Supervised, Unsupervised, Semi-supervised, Reinforcement Learning
- Deep Learning: MLP, CNN, RNN, LSTM, Autoencoders, Deep Belief Nets, RBM
- Generative AI: GANs, VAEs, Diffusion Models, Transformers, LLMs
- Deployment: Docker, REST API, Cloud/Edge, A/B Testing, Canary Release, Shadow Deployment
- Monitoring: Drift Detection, Fine-tuning, Retraining, Observability
- Tools: Python, R, SQL, Git, Docker, MLflow, DVC, Weights & Biases, Jupyter, Azure, Streamlit

GitHub Projects (github.com/BINTANNG99):
1. knn-gender-classification-voice — KNN gender classification from voice. Published.
2. adult-income-classification-xgboost — XGBoost income classification on UCI Adult.
3. adult-income-imbalance-comparison-xgboost — SMOTE vs class weighting comparison.
4. adult-income-feature-selection-boruta — Boruta feature selection with XGBoost.
5. adult-income-probability-calibration — Isotonic Regression calibration.
6. astar-flood-evacuation-medan — A* pathfinding for flood evacuation routing.

Experience:
- Staf Operasional & Inventaris Retail, J'M Beauty, Medan (Mar 2022 - Dec 2025)
- Asisten Laboratorium, UIN Sumatera Utara (Feb 2022 - Jan 2024)
- IT Support, Kantor Desa Perkotaan, Batu Bara (Aug 2024)
- Administrasi & IT Support Intern, RSUD Dr. R.M. Djoelham, Binjai (Oct-Nov 2024)

Rules:
- Be concise and professional. Respond in the user's language (ID or EN).
- Do not make up information not listed above.`;

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface GeminiResponse {
  candidates?: { content?: { parts?: { text?: string }[] } }[];
  error?: { message: string };
}

function httpsPost(url: string, body: string): Promise<GeminiResponse> {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    const req = https.request(
      {
        hostname: parsed.hostname,
        path: parsed.pathname + parsed.search,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(body),
        },
        rejectUnauthorized: false,
        timeout: 30000,
      },
      (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          try {
            resolve(JSON.parse(data) as GeminiResponse);
          } catch {
            reject(new Error("Invalid JSON: " + data.slice(0, 200)));
          }
        });
      }
    );
    req.on("error", reject);
    req.on("timeout", () => {
      req.destroy();
      reject(new Error("Request timed out"));
    });
    req.write(body);
    req.end();
  });
}

export async function POST(req: NextRequest) {
  try {
    const { messages }: { messages: ChatMessage[] } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY is not configured." },
        { status: 500 }
      );
    }

    // Drop leading assistant messages — Gemini requires history to start with user
    const prior = messages.slice(0, -1);
    const firstUserIdx = prior.findIndex((m) => m.role === "user");
    const cleanPrior = firstUserIdx === -1 ? [] : prior.slice(firstUserIdx);

    const contents = [
      ...cleanPrior.map((m) => ({
        role: m.role === "user" ? "user" : "model",
        parts: [{ text: m.content }],
      })),
      {
        role: "user",
        parts: [{ text: messages[messages.length - 1].content }],
      },
    ];

    const body = JSON.stringify({
      system_instruction: { parts: [{ text: SYSTEM }] },
      contents,
      generationConfig: { temperature: 0.7, maxOutputTokens: 800 },
    });

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
    const result = await httpsPost(url, body);

    if (result.error) {
      const msg = result.error.message ?? "";
      const isRateLimit = msg.toLowerCase().includes("quota") || msg.toLowerCase().includes("rate");
      return NextResponse.json(
        {
          error: isRateLimit
            ? "Rate limit reached. Please wait a moment and try again."
            : msg,
        },
        { status: isRateLimit ? 429 : 500 }
      );
    }

    const text =
      result.candidates?.[0]?.content?.parts?.[0]?.text ??
      "No response generated.";

    return NextResponse.json({ message: text });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("Chat route error:", msg);
    return NextResponse.json({ error: `AI error: ${msg}` }, { status: 500 });
  }
}
