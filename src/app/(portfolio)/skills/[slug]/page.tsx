import Link from "next/link";
import { notFound } from "next/navigation";
import { findSkillBySlug, SKILL_CATEGORIES } from "@/lib/skills-data";
import SkillPageClient from "./SkillPageClient";

export function generateStaticParams() {
  const slugs: { slug: string }[] = [];
  const seen = new Set<string>();
  for (const cat of SKILL_CATEGORIES) {
    for (const skill of cat.items) {
      if (!seen.has(skill.slug)) {
        slugs.push({ slug: skill.slug });
        seen.add(skill.slug);
      }
    }
  }
  return slugs;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const skill = findSkillBySlug(slug);
  return {
    title: skill
      ? `${skill.name} -- Bintang Hutagalung`
      : "Skill -- Bintang Hutagalung",
  };
}

export default async function SkillPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const skill = findSkillBySlug(slug);
  if (!skill) notFound();

  const category = SKILL_CATEGORIES.find((c) => c.title === skill.category);
  const related = category?.items.filter((s) => s.slug !== skill.slug) ?? [];

  return <SkillPageClient skill={skill} related={related} />;
}
