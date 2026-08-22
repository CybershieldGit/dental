import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts } from "@/data/blog";
import { ArrowLeft, Calendar, User, Clock } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};

  return {
    title: `${post.title} | Advance Dental Journal`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) {
    notFound();
  }

  return (
    <article className="pt-32 pb-24 relative bg-alabaster/95 min-h-screen">
      <div className="max-w-[800px] mx-auto px-5">
        
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-text-secondary hover:text-spruce transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to journal</span>
          </Link>
        </div>

        {/* Header Details */}
        <div className="flex flex-col gap-4 mb-8">
          <span className="text-xs font-semibold uppercase tracking-wider text-clinical-green bg-clinical-green/10 px-2.5 py-1 rounded self-start">
            {post.category}
          </span>
          <h1 className="text-3xl md:text-5xl font-serif text-spruce font-bold leading-tight">
            {post.title}
          </h1>

          {/* Meta rows */}
          <div className="flex flex-wrap gap-6 items-center text-xs text-text-secondary border-t border-b border-border/60 py-4 mt-2">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-text-muted" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <User className="w-4 h-4 text-text-muted" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-text-muted" />
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>

        {/* Content body with custom styling */}
        <div className="text-sm md:text-base text-text-primary leading-relaxed flex flex-col gap-6 pt-4">
          {post.content.split("\n\n").map((paragraph, index) => {
            const trimmed = paragraph.trim();
            if (trimmed.startsWith("###")) {
              return (
                <h3 key={index} className="text-xl md:text-2xl font-serif text-spruce font-bold mt-4 mb-1">
                  {trimmed.replace("###", "").trim()}
                </h3>
              );
            }
            return (
              <p key={index} className="text-text-secondary leading-relaxed">
                {trimmed}
              </p>
            );
          })}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-12 pt-6 border-t border-border/40">
          {post.tags.map((tag) => (
            <span key={tag} className="text-[10px] bg-paper text-text-secondary border border-border px-2.5 py-1 rounded">
              #{tag}
            </span>
          ))}
        </div>

      </div>
    </article>
  );
}
