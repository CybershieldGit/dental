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
    <section id="journal" className="min-h-screen flex flex-col justify-center py-12 sm:py-16 lg:py-20 relative z-10 border-t border-black/5 bg-[#FFFFF0]/40">
      <div className="container-editorial my-auto">
        <div className="container-inner">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-12">
            <div>
              <span className="text-xs sm:text-[13px] font-bold uppercase tracking-[0.16em] text-[#008C84] block mb-2">
                DENTAL JOURNAL & INSIGHTS
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-[44px] xl:text-[48px] font-serif text-[#111816] font-medium leading-[1.08] tracking-tight">
                Dental Knowledge & Insights
              </h2>
              <p className="text-base sm:text-lg text-[#334155] font-sans font-normal leading-relaxed max-w-2xl mt-2">
                Explore doctor-written guides on modern cosmetic dentistry, implants, and laser care.
              </p>
            </div>

            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm uppercase tracking-wider text-[#008C84] hover:text-[#005f59] font-bold transition-colors group self-start sm:self-end"
            >
              <span>View All Articles</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Grid Layout: 2x2 Clean Stack Cards on Left + Generous Detail Showcase on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
            
            {/* LEFT: 2x2 Grid of 4 Blog Cards (7 cols) */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {blogsList.map((item, idx) => {
                const isSelected = activeBlogIdx === idx;
                return (
                  <div
                    key={item.id}
                    onClick={() => setActiveBlogIdx(idx)}
                    className={`group relative rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-300 cursor-pointer flex flex-col justify-between border ${
                      isSelected
                        ? "bg-white border-[#00A89E] shadow-[0_12px_36px_rgba(0,168,158,0.18)] ring-2 ring-[#00A89E]/20"
                        : "bg-white/95 border-black/8 hover:border-[#00A89E]/50 hover:bg-white shadow-[0_4px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)]"
                    }`}
                  >
                    {/* Top: Large Featured Image Banner */}
                    <div className="relative w-full h-[140px] sm:h-[150px] overflow-hidden bg-slate-100 flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(max-width: 1024px) 50vw, 25vw"
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />
                      {/* Floating Category Tag inside image */}
                      <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-[#008C84] bg-white/95 backdrop-blur-md shadow-xs border border-black/5">
                        {item.tag}
                      </span>
                      {/* Floating Read Time inside image */}
                      <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full text-xs font-bold text-[#111816] bg-white/95 backdrop-blur-md shadow-xs border border-black/5 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#00A89E]" />
                        {item.readTime}
                      </span>
                    </div>

                    {/* Content Body */}
                    <div className="p-4 sm:p-5 flex flex-col justify-between flex-1">
                      <div>
                        <h4 className="text-[17px] sm:text-[18px] font-serif font-bold text-[#111816] group-hover:text-[#008C84] transition-colors leading-[1.3] line-clamp-2 mb-1.5">
                          {item.title}
                        </h4>
                        <p className="text-xs sm:text-[13px] text-[#334155] line-clamp-2 leading-relaxed font-sans font-normal">
                          {item.excerpt}
                        </p>
                      </div>

                      {/* Bottom: Author & Select Link */}
                      <div className="flex items-center justify-between pt-3 mt-3 border-t border-black/5 text-xs sm:text-[13px]">
                        <span className="text-[#475569] font-semibold truncate">
                          By {item.author.replace("Dr. ", "")}
                        </span>
                        <span className={`font-bold transition-all ${
                          isSelected ? "text-[#008C84]" : "text-[#475569] group-hover:text-[#008C84]"
                        }`}>
                          {isSelected ? "Active ●" : "Inspect →"}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* RIGHT: Full Detail Blog Showcase (5 cols - Desktop only) */}
            <div className="hidden lg:flex lg:col-span-5 flex-col">
              <div className="w-full h-full rounded-2xl sm:rounded-3xl bg-white border border-black/8 shadow-[0_16px_40px_rgba(0,0,0,0.06)] p-6 sm:p-7 flex flex-col justify-between">
                
                {/* Featured Visual Image */}
                <div className="relative w-full h-[220px] rounded-xl sm:rounded-2xl overflow-hidden border border-black/10 bg-slate-100 mb-4 group flex-shrink-0">
                  <Image
                    src={activeBlog.image}
                    alt={activeBlog.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white border border-white/10 shadow-sm">
                    {activeBlog.badge}
                  </span>
                  <span className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-[#111816] border border-black/10 shadow-sm flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#00A89E]" />
                    {activeBlog.date}
                  </span>
                </div>

                {/* Title & Full Clinical Detail */}
                <div className="flex flex-col mb-4 flex-1 justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <Sparkles className="w-4 h-4 text-[#00A89E]" />
                      <span className="text-xs font-bold text-[#008C84] uppercase tracking-wider">
                        {activeBlog.tag} · {activeBlog.readTime}
                      </span>
                    </div>
                    <h3 className="text-2xl font-serif text-[#111816] font-bold mb-2.5 leading-snug">
                      {activeBlog.title}
                    </h3>
                    <p className="text-sm text-[#334155] leading-relaxed mb-3 font-sans font-normal">
                      {activeBlog.fullSummary}
                    </p>
                  </div>

                  {/* Key Takeaways list */}
                  <div className="bg-[#F8FAF9] rounded-xl p-3.5 border border-black/5 mt-1">
                    <span className="text-xs font-bold text-[#111816] uppercase tracking-wider block mb-2">
                      Key Clinical Highlights:
                    </span>
                    <ul className="space-y-1.5">
                      {activeBlog.keyTakeaways.map((point, kIdx) => (
                        <li key={kIdx} className="text-[13.5px] text-[#1E293B] font-medium flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#00A89E] flex-shrink-0" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Author & Read Full Article Button */}
                <div className="pt-4 border-t border-black/5 flex flex-col gap-3">
                  <div className="flex items-center justify-between text-xs sm:text-[13px] text-[#475569]">
                    <span className="flex items-center gap-1.5 font-semibold">
                      <User className="w-4 h-4 text-[#00A89E]" />
                      Written by {activeBlog.author}
                    </span>
                    <span className="font-bold text-[#008C84]">
                      Verified Clinical Guide
                    </span>
                  </div>

                  <Link
                    href={`/blog/${activeBlog.slug}`}
                    className="w-full py-3.5 px-6 min-h-[48px] rounded-xl bg-[#00A89E] hover:bg-[#008C84] text-white text-sm font-bold tracking-wide transition-all duration-300 inline-flex items-center justify-center gap-2 cursor-pointer shadow-[0_4px_16px_rgba(0,168,158,0.25)] hover:shadow-[0_6px_22px_rgba(0,168,158,0.4)]"
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
      </div>
    </section>
  );
}
