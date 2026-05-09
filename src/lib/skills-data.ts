export interface Skill {
  name: string;
  slug: string;
  category: string;
}

export interface SkillCategory {
  title: string;
  items: Skill[];
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Machine Learning",
    items: [
      { name: "Supervised Learning",     slug: "supervised-learning",      category: "Machine Learning" },
      { name: "Unsupervised Learning",   slug: "unsupervised-learning",    category: "Machine Learning" },
      { name: "Semi-Supervised",         slug: "semi-supervised-learning", category: "Machine Learning" },
      { name: "Reinforcement Learning",  slug: "reinforcement-learning",   category: "Machine Learning" },
    ],
  },
  {
    title: "Deep Learning",
    items: [
      { name: "MLP / Feedforward",  slug: "mlp-feedforward",    category: "Deep Learning" },
      { name: "CNN",                slug: "cnn",                 category: "Deep Learning" },
      { name: "RNN & LSTM",         slug: "rnn-lstm",            category: "Deep Learning" },
      { name: "Autoencoders",       slug: "autoencoders",        category: "Deep Learning" },
      { name: "Deep Belief Nets",   slug: "deep-belief-nets",    category: "Deep Learning" },
      { name: "RBM",                slug: "rbm",                 category: "Deep Learning" },
    ],
  },
  {
    title: "Generative AI",
    items: [
      { name: "GAN",               slug: "gan",              category: "Generative AI" },
      { name: "VAE",               slug: "vae",              category: "Generative AI" },
      { name: "Diffusion Models",  slug: "diffusion-models", category: "Generative AI" },
      { name: "Transformers / LLM", slug: "transformers-llm", category: "Generative AI" },
    ],
  },
  {
    title: "Deployment",
    items: [
      { name: "Online & Batch Prediction", slug: "online-batch-prediction", category: "Deployment" },
      { name: "Cloud & Edge",              slug: "cloud-edge",              category: "Deployment" },
      { name: "Shadow Deploy",             slug: "shadow-deploy",           category: "Deployment" },
      { name: "A/B Testing",              slug: "ab-testing",              category: "Deployment" },
      { name: "Canary Release",            slug: "canary-release",          category: "Deployment" },
      { name: "REST API",                  slug: "rest-api",                category: "Deployment" },
      { name: "Docker",                    slug: "docker",                  category: "Deployment" },
    ],
  },
  {
    title: "Monitoring",
    items: [
      { name: "Operational Metrics",   slug: "operational-metrics",   category: "Monitoring" },
      { name: "ML-Specific Metrics",   slug: "ml-specific-metrics",   category: "Monitoring" },
      { name: "Observability",         slug: "observability",         category: "Monitoring" },
      { name: "Retraining",            slug: "retraining",            category: "Monitoring" },
      { name: "Fine-tuning",           slug: "fine-tuning",           category: "Monitoring" },
      { name: "Drift Triggers",        slug: "drift-triggers",        category: "Monitoring" },
    ],
  },
  {
    title: "Tools & Platforms",
    items: [
      { name: "Python",     slug: "python",     category: "Tools & Platforms" },
      { name: "R",          slug: "r-language", category: "Tools & Platforms" },
      { name: "SQL",        slug: "sql",        category: "Tools & Platforms" },
      { name: "Git",        slug: "git",        category: "Tools & Platforms" },
      { name: "Docker",     slug: "docker",     category: "Tools & Platforms" },
      { name: "MLflow",     slug: "mlflow",     category: "Tools & Platforms" },
      { name: "DVC",        slug: "dvc",        category: "Tools & Platforms" },
      { name: "W&B",        slug: "weights-biases", category: "Tools & Platforms" },
      { name: "Jupyter",    slug: "jupyter",    category: "Tools & Platforms" },
      { name: "Azure",      slug: "azure",      category: "Tools & Platforms" },
      { name: "Streamlit",  slug: "streamlit",  category: "Tools & Platforms" },
    ],
  },
];

export function findSkillBySlug(slug: string): Skill | undefined {
  for (const cat of SKILL_CATEGORIES) {
    const found = cat.items.find((s) => s.slug === slug);
    if (found) return found;
  }
  return undefined;
}
