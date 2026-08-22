"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, Calendar, User, BookOpen, Sparkles } from "lucide-react";

export default function BlogSection() {
  const [activeBlogIdx, setActiveBlogIdx] = useState(0);

  const blogsList = [
    {
      id: "blog-1",
      slug: "navigating-your-invisalign-journey",
      tag: "Orthodontics",
      badge: "ALIGNERS",
      title: "Clear Aligners vs Braces: Which is Right for You?",
      excerpt: "A comprehensive orthodontic guide comparing digital clear aligners with traditional bracket systems to help you choose the ideal pathway for your smile.",
      fullSummary: "Discover the key clinical differences between custom clear aligners and conventional orthodontics. We analyze treatment duration, aesthetic visibility, lifestyle flexibility, hygiene maintenance, and cost considerations to empower your decision.",
      readTime: "5 min read",
      date: "Aug 18, 2026",
      author: "Dr. Kevin Mathew",
      image: "/images/blog-invisalign.jpg",
      keyTakeaways: ["Virtually invisible aligner trays", "Removable for meals and oral hygiene", "3D digital smile simulation"],
    },
    {
      id: "blog-2",
      slug: "demystifying-dental-implants-process",
      tag: "Implantology",
      badge: "IMPLANTS",
      title: "Everything You Need to Know Before Dental Implants",
      excerpt: "Step-by-step clinical breakdown of guided 3D titanium implant surgery, bone grafting options, and immediate-load restoration.",
      fullSummary: "Dental implants are the gold standard for replacing missing teeth. Learn about the complete surgical timeline, CT bone density evaluation, 3D surgical guides, recovery timelines, and lifetime maintenance protocols from our chief implantologist.",
      readTime: "6 min read",
      date: "Aug 12, 2026",
      author: "Dr. Ananya Sharma",
      image: "/images/blog-implants.jpg",
      keyTakeaways: ["Titanium osseointegration technology", "Permanent chew and speech restoration", "Preserves natural facial bone volume"],
    },
    {
      id: "blog-3",
      slug: "truth-about-gum-disease",
      tag: "Periodontics",
      badge: "ORAL CARE",
      title: "The Truth About Gum Disease & Prevention",
      excerpt: "Early warning signs of gingivitis and periodontitis, laser therapy solutions, and evidence-based daily routines for healthy gums.",
      fullSummary: "Periodontal disease is often silent and pain-free in early stages. We explore how bacterial plaque hardens into tartar, the role of ultrasonic deep scaling, painless laser gum therapy, and proven at-home habits to reverse early inflammation.",
      readTime: "4 min read",
      date: "Aug 08, 2026",
      author: "Dr. Karan Anand",
      image: "/images/blog-gum-disease.jpg",
      keyTakeaways: ["Early detection stops bone loss", "Minimally invasive laser therapy", "Daily flossing and ultrasonic care"],
    },
    {
      id: "blog-4",
      slug: "precision-diagnostics-with-ai",
      tag: "Technology",
      badge: "AI & 3D CBCT",
      title: "Precision Diagnostics with AI & 3D Imaging",
      excerpt: "How 3D cone beam computed tomography and artificial intelligence are revolutionizing dental diagnostics and painless treatment planning.",
      fullSummary: "Explore how our clinic leverages sub-millimeter 3D CBCT imaging and neural network diagnostic algorithms to detect hidden micro-fractures, nerve canal pathways, and early interproximal caries before symptoms occur.",
      readTime: "5 min read",
      date: "Aug 02, 2026",
      author: "Dr. Karan Mehta",
      image: "/images/blog-dental-checkup.jpg",
      keyTakeaways: ["Sub-millimeter 3D anatomical accuracy", "Early AI pathology detection", "Zero-guesswork computer-guided plans"],
    },
  ];

  const activeBlog = blogsList[activeBlogIdx];

  return (
    <section id="journal" className="py-20 md:py-28 relative z-10 border-t border-black/5 bg-[#FFFFF0]/40">
      <div className="w-full max-w-[1740px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 pr-6 sm:pr-8 lg:pr-16 xl:pr-20">
        
        {/* Section Header: Matches Wireframe "blogs" banner */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-12 max-w-3xl pl-0 sm:pl-2 lg:pl-4">
          <div>
            <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.24em] text-[#00A89E] block mb-2">
              DENTAL JOURNAL & INSIGHTS
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] xl:text-[48px] font-serif text-[#111816] font-medium leading-[1.08] tracking-tight">
              Blogs
            </h2>
            <p className="text-sm sm:text-base md:text-[17px] text-[#4A5568] font-sans font-normal leading-relaxed max-w-xl mt-2">
              Explore evidence-based dental guides and technology insights. Click any blog card to inspect the full overview.
            </p>
          </div>

          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#00A89E] hover:text-[#008C84] font-semibold transition-colors group self-start sm:self-end"
          >
            <span>View All Articles</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Wireframe Layout: 2x2 Blog Cards on Left + Full Detail Blog Showcase on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          
          {/* LEFT: 2x2 Grid of 4 Blog Cards (7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {blogsList.map((item, idx) => {
              const isSelected = activeBlogIdx === idx;
              return (
                <div
                  key={item.id}
                  onClick={() => setActiveBlogIdx(idx)}
                  className={`group relative rounded-2xl sm:rounded-3xl p-4 sm:p-5 transition-all duration-300 cursor-pointer flex flex-col justify-between min-h-[220px] sm:min-h-[240px] border ${
                    isSelected
                      ? "bg-white border-[#00A89E] shadow-[0_12px_36px_rgba(0,168,158,0.18)] ring-2 ring-[#00A89E]/20"
                      : "bg-white/80 border-black/8 hover:border-[#00A89E]/40 hover:bg-white shadow-[0_4px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)]"
                  }`}
                >
                  {/* Top: Category Tag & Read Time */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className={`text-[10px] sm:text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                      isSelected
                        ? "bg-[#E6F7F5] text-[#00A89E]"
                        : "bg-black/5 text-[#5A6B66] group-hover:bg-[#E6F7F5] group-hover:text-[#00A89E]"
                    }`}>
                      {item.tag}
                    </span>
                    <span className="text-[10px] text-[#718096] font-medium flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#00A89E]" />
                      {item.readTime}
                    </span>
                  </div>

                  {/* Center: Image Thumbnail + Headline */}
                  <div className="flex items-start gap-3.5 my-2">
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0 border border-black/5">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="80px"
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <h4 className="text-xs sm:text-sm font-serif font-bold text-[#111816] group-hover:text-[#00A89E] transition-colors leading-snug line-clamp-2">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-[#5A6B66] line-clamp-2 mt-1 leading-tight font-sans">
                        {item.excerpt}
                      </p>
                    </div>
                  </div>

                  {/* Bottom: Author & Inspect link */}
                  <div className="flex items-center justify-between pt-2.5 border-t border-black/5 text-[11px]">
                    <span className="text-[#718096] font-medium truncate">
                      {item.author}
                    </span>
                    <span className={`font-semibold transition-all ${
                      isSelected ? "text-[#00A89E]" : "text-[#718096] group-hover:text-[#00A89E]"
                    }`}>
                      {isSelected ? "Active ●" : "Inspect →"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* RIGHT: Full Detail Blog Showcase (5 cols, triggered on hover) */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="w-full h-full rounded-2xl sm:rounded-3xl bg-white border border-black/8 shadow-[0_16px_40px_rgba(0,0,0,0.06)] p-6 sm:p-7 flex flex-col justify-between">
              
              {/* Featured Visual Image */}
              <div className="relative w-full h-[200px] sm:h-[220px] rounded-xl sm:rounded-2xl overflow-hidden border border-black/10 bg-slate-100 mb-5 group">
                <Image
                  src={activeBlog.image}
                  alt={activeBlog.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute top-3 left-3 bg-black/65 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white border border-white/10 shadow-sm">
                  {activeBlog.badge}
                </span>
                <span className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-semibold text-[#111816] border border-black/10 shadow-sm flex items-center gap-1.5">
                  <Calendar className="w-3 h-3 text-[#00A89E]" />
                  {activeBlog.date}
                </span>
              </div>

              {/* Title & Full Clinical Detail */}
              <div className="flex flex-col mb-4">
                <div className="flex items-center gap-2 mb-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#00A89E]" />
                  <span className="text-[11px] font-semibold text-[#00A89E] uppercase tracking-wider">
                    {activeBlog.tag} · {activeBlog.readTime}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-serif text-[#111816] font-bold mb-2.5 leading-snug">
                  {activeBlog.title}
                </h3>
                <p className="text-xs sm:text-[13px] text-[#4A5568] leading-relaxed mb-3">
                  {activeBlog.fullSummary}
                </p>

                {/* Key Takeaways list */}
                <div className="bg-[#F8FAF9] rounded-xl p-3 border border-black/5 mt-1">
                  <span className="text-[10px] font-bold text-[#111816] uppercase tracking-wider block mb-1.5">
                    Key Clinical Highlights:
                  </span>
                  <ul className="space-y-1">
                    {activeBlog.keyTakeaways.map((point, kIdx) => (
                      <li key={kIdx} className="text-[11px] text-[#5A6B66] flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00A89E] flex-shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Author & Read Full Article Button */}
              <div className="pt-4 border-t border-black/5 flex flex-col gap-3">
                <div className="flex items-center justify-between text-xs text-[#718096]">
                  <span className="flex items-center gap-1.5 font-medium">
                    <User className="w-3.5 h-3.5 text-[#00A89E]" />
                    Written by {activeBlog.author}
                  </span>
                  <span className="font-semibold text-[#00A89E]">
                    Verified Clinical Guide
                  </span>
                </div>

                <Link
                  href={`/blog/${activeBlog.slug}`}
                  className="w-full py-3.5 px-6 min-h-[46px] rounded-xl bg-[#00A89E] hover:bg-[#008C84] text-white text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 inline-flex items-center justify-center gap-2 cursor-pointer shadow-[0_4px_16px_rgba(0,168,158,0.2)] hover:shadow-[0_6px_22px_rgba(0,168,158,0.35)]"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Read Full Article</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
