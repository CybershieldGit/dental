"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BlogPost } from "@/data/blog";
import { ArrowLeft, Clock, ArrowRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function BlogListClient({ posts }: { posts: BlogPost[] }) {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pageRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".blog-page-header",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.1 }
      );

      gsap.fromTo(
        ".blog-page-card",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          delay: 0.25,
        }
      );
    }, pageRef);

    return () => ctx.revert();
  }, [posts]);

  return (
    <div ref={pageRef} className="min-h-screen pt-32 sm:pt-36 pb-24 relative bg-[#FFFFF0] z-10 text-[#111816]">
      <div className="container-editorial">
        <div className="container-inner">
          {/* Back link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#475569] hover:text-[#008C84] font-bold transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </Link>

          {/* Page Header */}
          <div className="blog-page-header mb-12 sm:mb-14 max-w-3xl">
            <span className="text-xs sm:text-[13px] font-bold uppercase tracking-[0.16em] text-[#008C84] block mb-2">
              DENTAL JOURNAL & CLINICAL INSIGHTS
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#111816] font-medium leading-[1.08] tracking-tight">
              Blog & Clinical Guides
            </h1>
            <p className="text-base sm:text-lg text-[#334155] font-sans font-normal leading-relaxed mt-3 max-w-xl">
              Doctor-authored articles, orthodontic comparisons, implant guides, and preventative oral health recommendations.
            </p>
          </div>

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {posts.map((post, idx) => (
              <Link
                key={post.slug || "post-" + idx}
                href={"/blog/" + post.slug}
                className="blog-page-card group block bg-white/95 rounded-2xl sm:rounded-3xl overflow-hidden border border-black/8 hover:shadow-[0_12px_36px_rgba(0,168,158,0.14)] hover:border-[#00A89E]/50 transition-all duration-300"
              >
                {/* Image */}
                <div className="relative h-[220px] md:h-[260px] overflow-hidden bg-slate-100">
                  {post.image ? (
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-400 text-sm">
                      Article Image
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-[#008C84] shadow-xs border border-black/5">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8">
                  <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#111816] leading-snug mb-2.5 group-hover:text-[#008C84] transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-sm text-[#334155] leading-relaxed mb-6 font-sans font-normal line-clamp-2">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-black/8 text-xs sm:text-[13px] text-[#475569]">
                    <div className="flex items-center gap-4 font-semibold">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#00A89E]" />
                        {post.readTime}
                      </span>
                      <span>{post.date}</span>
                    </div>

                    <span className="inline-flex items-center gap-1.5 font-bold text-[#008C84] group-hover:translate-x-1 transition-all duration-300">
                      <span>Read Article</span>
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
