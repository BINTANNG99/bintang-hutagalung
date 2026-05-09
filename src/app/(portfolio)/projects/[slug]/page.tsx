import Link from "next/link";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 relative z-10">
      <div className="max-w-xl w-full text-center">
        <p className="text-xs text-gray-400 dark:text-white/25 mb-6 tracking-[0.25em] uppercase font-bold">
          {slug.replace(/-/g, " ")}
        </p>
        <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white/90">
          Demo Coming Soon
        </h1>
        <p className="text-gray-500 dark:text-white/40 text-base mb-10 leading-relaxed">
          An interactive model demo will be available here.
        </p>
        <Link
          href="/projects"
          className="text-sm border border-gray-300 dark:border-white/20 px-6 py-2.5 text-gray-600 dark:text-white/60 hover:border-gray-900 dark:hover:border-white/50 hover:text-black dark:hover:text-white transition-all"
        >
          Back to projects
        </Link>
      </div>
    </div>
  );
}
