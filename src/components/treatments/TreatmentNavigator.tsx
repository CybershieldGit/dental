"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useOverlay } from "@/components/layout/OverlayProvider";
import { trackEvent } from "@/lib/analytics";
import { ArrowRight } from "lucide-react";

export default function TreatmentNavigator() {
  const { openOverlay } = useOverlay();
  const categories = ["Restorative", "Aesthetic", "Aligners", "Preventive", "Surgical"];
  const [activeCategory, setActiveCategory] = useState("Restorative");

  const treatmentCardsData: Record<string, Array<{
    title: string;
    description: string;
    timeline: string;
    image: string;
    slug: string;
  }>> = {
    Restorative: [
      {
        title: "Dental Implants",
        description: "Replace what is missing. Restore natural chewing function and aesthetic confidence.",
        timeline: "3 to 6 months depending on bone density",
        image: "/images/implants.jpg",
        slug: "dental-implants",
      },
      {
        title: "Microscopic Root Canal",
        description: "Saving a deeply infected or damaged tooth using advanced micro-endodontics.",
        timeline: "1 to 2 visits",
        image: "/images/root-canal.jpg",
        slug: "root-canal-treatment",
      },
      {
        title: "Full Mouth Rehabilitation",
        description: "Comprehensive restoration for function, aesthetics and long-term oral health.",
        timeline: "Customized",
        image: "/images/smile-gallery-1.jpg",
        slug: "full-mouth-rehab",
      },
    ],
    Aesthetic: [
      {
        title: "Porcelain Veneers",
        description: "Ultra-thin custom porcelain shells bonded to the front of teeth for aesthetic correction.",
        timeline: "2 visits over 7-10 days",
        image: "/images/veneers.jpg",
        slug: "porcelain-veneers",
      },
      {
        title: "Digital Smile Design",
        description: "3D virtual preview of your proposed smile layout before modifying any teeth.",
        timeline: "1 consultation visit",
        image: "/images/hero-smile.jpg",
        slug: "digital-smile-design",
      },
      {
        title: "Laser Teeth Whitening",
        description: "Professional in-chair whitening delivering instant natural brightness safely.",
        timeline: "45 minutes",
        image: "/images/smile-gallery-2.jpg",
        slug: "teeth-whitening",
      },
    ],
    Aligners: [
      {
        title: "Clear Aligners",
        description: "Nearly invisible, removable custom aligners that gently guide teeth into alignment.",
        timeline: "6 to 18 months",
        image: "/images/aligners.jpg",
        slug: "clear-aligners",
      },
      {
        title: "Orthodontic Relapse Care",
        description: "Targeted refinement for teeth that have shifted after previous braces treatment.",
        timeline: "3 to 6 months",
        image: "/images/blog-aligners.jpg",
        slug: "orthodontic-relapse",
      },
      {
        title: "Custom Retainers",
        description: "Durable post-treatment retainers to keep your smile perfectly aligned.",
        timeline: "1 visit",
        image: "/images/blog-invisalign.jpg",
        slug: "custom-retainers",
      },
    ],
    Preventive: [
      {
        title: "Preventive Hygiene Cleanse",
        description: "Preserving gum health and enamel structure through ultrasonic scaling.",
        timeline: "45 - 60 minutes",
        image: "/images/preventive.jpg",
        slug: "preventive-care",
      },
      {
        title: "Enamel Mineral Therapy",
        description: "Strengthening vulnerable tooth surfaces against acid and cavity formation.",
        timeline: "30 minutes",
        image: "/images/blog-gum-disease.jpg",
        slug: "mineral-therapy",
      },
      {
        title: "Periodontal Health Check",
        description: "Microscopic gum pocket depth assessment to halt early gingivitis.",
        timeline: "30 minutes",
        image: "/images/blog-dental-checkup.jpg",
        slug: "periodontal-check",
      },
    ],
    Surgical: [
      {
        title: "Wisdom Teeth Surgery",
        description: "Minimally invasive removal of impacted wisdom teeth with quick recovery.",
        timeline: "1 visit (30-60 mins)",
        image: "/images/surgery.jpg",
        slug: "wisdom-teeth-surgery",
      },
      {
        title: "Bone Grafting & Sinus Lift",
        description: "Regenerating jawbone volume to create a stable foundation for implants.",
        timeline: "Integrated with implant plan",
        image: "/images/blog-ai-diagnostics.jpg",
        slug: "bone-grafting",
      },
      {
        title: "Gum Plastic Surgery",
        description: "Rebalancing gummy smiles and repairing gum recession margins.",
        timeline: "1 to 2 visits",
        image: "/images/smile-gallery-1.jpg",
        slug: "gum-surgery",
      },
    ],
  };

  const currentCards = treatmentCardsData[activeCategory] || treatmentCardsData.Restorative;

  const handleCardClick = (slug: string) => {
    trackEvent("treatment_detail_open", { slug });
    openOverlay("treatment", slug);
  };

  return (
    <section id="treatments" className="min-h-screen flex flex-col justify-center py-10 sm:py-14 lg:py-16 relative z-10 border-t border-black/5">
      <div className="container-editorial w-full my-auto">
        <div className="container-inner">
          {/* Header */}
          <div className="mb-10">
          <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#00A89E] block mb-2">
            TREATMENT NAVIGATOR
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-[54px] font-serif text-[#111816] font-medium leading-[1.08] tracking-tight mb-3">
            Clinical Specialties & Offerings
          </h2>
          <p className="text-base sm:text-lg text-[#4A5568] font-sans font-normal leading-relaxed max-w-2xl">
            Select a discipline below to discover diagnostic approaches and estimated timelines.
          </p>
        </div>

        {/* Discipline Filter Tabs */}
        <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 no-scrollbar mb-10">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 min-h-[40px] rounded-full text-xs sm:text-sm font-semibold tracking-wider transition-all duration-300 inline-flex items-center justify-center cursor-pointer leading-normal ${
                  isActive
                    ? "bg-[#00A89E] text-white shadow-[0_4px_16px_rgba(0,168,158,0.28)]"
                    : "bg-white/90 border border-black/8 text-[#4A5568] hover:text-[#111816] hover:border-black/20 shadow-sm hover:bg-white"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* 3 Treatment Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {currentCards.map((card, idx) => (
            <div
              key={idx}
              onClick={() => handleCardClick(card.slug)}
              className="group flex flex-col justify-between bg-white/95 rounded-2xl overflow-hidden border border-black/8 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:border-[#00A89E]/50 hover:shadow-[0_12px_36px_rgba(0,168,158,0.12)] transition-all duration-300 cursor-pointer"
            >
              {/* Photo */}
              <div className="relative w-full h-[200px] overflow-hidden bg-slate-100">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="text-xl font-serif font-semibold text-[#111816] group-hover:text-[#00A89E] transition-colors mb-2">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#4A5568] leading-relaxed mb-6">
                    {card.description}
                  </p>
                </div>

                {/* Footer / Timeline */}
                <div className="pt-4 border-t border-black/8 flex items-center justify-between">
                  <span className="text-[11px] text-[#00A89E] font-semibold">
                    Timeline: {card.timeline}
                  </span>
                  <div className="w-7 h-7 rounded-full bg-[#E6F7F5] group-hover:bg-[#00A89E] group-hover:text-white text-[#00A89E] flex items-center justify-center transition-all duration-300">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Centered Footer Link */}
        <div className="text-center">
          <a
            href="#diagnostics"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#00A89E] hover:text-[#008C84] font-semibold transition-colors group"
          >
            <span>View All Treatments</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </a>
          </div>
        </div>
      </div>
    </section>
  );
}
