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
    <article className="pt-32 sm:pt-36 pb-24 relative bg-[#FFFFF0] min-h-screen text-[#111816]">
      <div className="container-editorial">
        <div className="container-inner max-w-4xl">
          
          {/* Back Link */}
          <div className="mb-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#475569] hover:text-[#008C84] transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Back to all articles</span>
            </Link>
          </div>

          {/* Header Details */}
          <div className="flex flex-col gap-4 mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-[#008C84] bg-[#E6F7F5] px-3 py-1 rounded-full self-start">
              {post.category}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#111816] font-bold leading-tight">
              {post.title}
            </h1>

            {/* Meta rows */}
            <div className="flex flex-wrap gap-6 items-center text-xs sm:text-sm text-[#475569] font-medium border-t border-b border-black/8 py-4 mt-2">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#00A89E]" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-[#00A89E]" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#00A89E]" />
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>

          {/* Content body with custom styling */}
          <div className="text-base md:text-lg text-[#1E293B] leading-relaxed flex flex-col gap-6 pt-2 font-sans">
            {post.content.split("\n\n").map((paragraph, index) => {
              const trimmed = paragraph.trim();
              if (trimmed.startsWith("###")) {
                return (
                  <h3 key={index} className="text-xl sm:text-2xl md:text-3xl font-serif text-[#111816] font-bold mt-6 mb-1 leading-snug">
                    {trimmed.replace("###", "").trim()}
                  </h3>
                );
              }
              return (
                <p key={index} className="text-[#334155] leading-relaxed font-normal">
                  {trimmed}
                </p>
              );
            })}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-12 pt-6 border-t border-black/8">
            {post.tags.map((tag) => (
              <span key={tag} className="text-xs font-bold bg-white text-[#334155] border border-black/8 px-3 py-1.5 rounded-lg shadow-2xs">
                #{tag}
              </span>
            ))}
          </div>

        </div>
      </div>
    </article>
  );
}
