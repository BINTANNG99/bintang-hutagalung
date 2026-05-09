export interface GithubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  topics: string[];
}

export async function fetchGithubRepos(username: string): Promise<GithubRepo[]> {
  try {
    const res = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=30&sort=updated`,
      {
        next: { revalidate: 3600 },
        headers: { Accept: "application/vnd.github+json" },
      }
    );
    if (!res.ok) return [];
    const data: GithubRepo[] = await res.json();
    return data.filter((r) => !r.name.startsWith(".") && r.name.toLowerCase() !== username.toLowerCase());
  } catch {
    return [];
  }
}

// Broad ML/AI category tags — shown as filter options
export type RepoCategory = "Artificial Intelligence" | "Machine Learning" | "Deep Learning" | "Generative AI";

export function getRepoTags(repo: GithubRepo): RepoCategory[] {
  const name = repo.name.toLowerCase();
  const desc = (repo.description ?? "").toLowerCase();
  const combined = name + " " + desc;

  const tags: RepoCategory[] = [];

  // Generative AI: GANs, VAEs, diffusion, transformers, LLMs
  if (/gan|vae|diffusion|transformer|llm|generative/.test(combined)) {
    tags.push("Generative AI");
  }

  // Deep Learning: neural nets, CNN, RNN, LSTM, deep
  if (/deep.?learn|neural|cnn|rnn|lstm|autoencoder/.test(combined)) {
    tags.push("Deep Learning");
  }

  // Artificial Intelligence: search, pathfinding, planning, heuristic
  if (/astar|a\*|path|flood|evacu|search|heuristic/.test(combined)) {
    tags.push("Artificial Intelligence");
  }

  // Machine Learning: classification, regression, clustering, supervised etc.
  if (/classif|knn|xgboost|random.?forest|svm|regress|cluster|feature|calibr|imbalance|income|predict|smote|boruta/.test(combined)) {
    tags.push("Machine Learning");
  }

  // Default: if nothing matched, it's generic ML
  if (tags.length === 0) tags.push("Machine Learning");

  return [...new Set(tags)];
}

export function formatRepoName(name: string): string {
  return name
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ")
    .replace(/\bV2\b/, "v2")
    .replace(/\bKnn\b/, "KNN")
    .replace(/\bXgboost\b/, "XGBoost")
    .replace(/\bAstar\b/, "A* Algorithm")
    .replace(/\bIot\b/, "IoT");
}
