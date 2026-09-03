"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useOverlay } from "@/components/layout/OverlayProvider";
import { trackEvent } from "@/lib/analytics";
import { ArrowRight, Clock, Calendar, UserCheck, Shield, Sparkles } from "lucide-react";

export default function CaseStudy() {
  const { openOverlay } = useOverlay();
  const [activeCaseIdx, setActiveCaseIdx] = useState(0);
  const [sliderPos, setSliderPos] = useState(50);

  const casesList = [
    {
      id: "smile-makeover",
      tag: "Smile Makeover",
      title: "Full Smile Makeover & Veneers",
      category: "Aesthetic Dentistry",
      description: "Patient presented with dark, worn, and misaligned front teeth, causing loss of smiling confidence. Restored with ultra-thin feldspathic porcelain laminates.",
      duration: "6 weeks",
      appointments: "4 Visits",
      specialist: "Dr. Karan Mehta",
      methodology: "Ultra-Thin Ceramics",
      highlight: "100% Painless Laser Contouring",
      beforeImg: "/images/before-smile.jpg",
      afterImg: "/images/after-smile.jpg",
    },
    {
      id: "implants",
      tag: "Full Arch Implants",
      title: "Full Arch Rehabilitation & Implants",
      category: "Implantology",
      description: "Fixed full-arch zirconium bridge replacement for multiple compromised teeth with immediate load 3D computer-guided implants.",
      duration: "12 weeks",
      appointments: "5 Visits",
      specialist: "Dr. Ananya Sharma",
      methodology: "Guided 3D Titanium",
      highlight: "Same-Day Fixed Provisional Teeth",
      beforeImg: "/images/before-smile.jpg",
      afterImg: "/images/smile-gallery-1.jpg",
    },
    {
      id: "veneers",
      tag: "Porcelain Veneers",
      title: "Micro-Layered Porcelain Veneers",
      category: "Cosmetic Restoration",
      description: "Conservative cosmetic restoration correcting fluorosis discoloration and midline spacing with minimal prep artisanal ceramics.",
      duration: "2 weeks",
      appointments: "3 Visits",
      specialist: "Dr. Karan Mehta",
      methodology: "Feldspathic Porcelain",
      highlight: "Custom Color & Translucency Match",
      beforeImg: "/images/before-smile.jpg",
      afterImg: "/images/after-smile.jpg",
    },
    {
      id: "aligners",
      tag: "Clear Aligners",
      title: "Discreet Invisible Orthodontics",
      category: "Orthodontics",
      description: "Non-invasive clear aligner journey correcting anterior crowding and deep bite relapse without metal brackets or wires.",
      duration: "8 months",
      appointments: "6 Visits",
      specialist: "Dr. Kevin Mathew",
      methodology: "Custom Clear Aligners",
      highlight: "Virtually Invisible & Removable",
      beforeImg: "/images/before-smile.jpg",
      afterImg: "/images/smile-gallery-2.jpg",
    },
  ];

  const activeCase = casesList[activeCaseIdx];

  const handleSliderMove = (clientX: number, rect: DOMRect) => {
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(10, Math.min((x / rect.width) * 100, 90));
    setSliderPos(percent);
  };

  const handleOpenCase = () => {
    trackEvent("case_study_open", { id: activeCase.id });
    openOverlay("case", activeCase.id);
  };

  return (
    <section id="stories" className="min-h-0 lg:min-h-screen flex flex-col justify-start sm:justify-center pt-8 xs:pt-10 sm:py-14 lg:py-16 pb-8 xs:pb-10 relative z-10 border-t border-black/5 bg-[#FFFFF0] [-webkit-font-smoothing:antialiased] [text-rendering:optimizeLegibility]">
      <div className="container-editorial flex flex-col justify-start sm:flex-1 sm:justify-center sm:my-auto">
        <div className="container-inner flex flex-col justify-start sm:justify-center sm:my-auto">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-12">
            <div>
              <span className="text-xs sm:text-[13px] font-bold uppercase tracking-[0.16em] text-[#008C84] block mb-2">
                PATIENT TRANSFORMATIONS
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-[44px] xl:text-[48px] font-serif text-[#111816] font-medium leading-[1.08] tracking-tight">
                Verified Success Stories
              </h2>
              <p className="text-base sm:text-lg text-[#334155] font-sans font-normal leading-relaxed max-w-2xl mt-2">
                Explore real patient before-and-after results. Click any case to inspect clinical details and specialist procedures.
              </p>
            </div>
          </div>

        {/* ─────────────────────────────────────────────────────────────
            MOBILE VIEW: Featured Interactive Transformation Card (lg:hidden)
            ───────────────────────────────────────────────────────────── */}
        <div className="lg:hidden flex flex-col gap-3">
          {/* 1. Category Switcher Horizontal Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 px-0">
            {casesList.map((item, idx) => {
              const isSelected = activeCaseIdx === idx;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveCaseIdx(idx)}
                  className={`px-4 py-2 rounded-full text-[13px] xs:text-[14px] font-bold tracking-wide whitespace-nowrap transition-colors duration-200 cursor-pointer flex-shrink-0 ${
                    isSelected
                      ? "bg-[#00A89E] text-white shadow-[0_3px_10px_rgba(0,168,158,0.3)] ring-1 ring-[#00A89E]"
                      : "bg-white text-[#334155] border border-black/10 hover:bg-white"
                  }`}
                >
                  {item.tag}
                </button>
              );
            })}
          </div>

          {/* 2. Main Featured Transformation Card */}
          <div className="rounded-2xl bg-white border border-black/8 shadow-[0_14px_36px_rgba(0,0,0,0.07)] p-4 xs:p-5 flex flex-col justify-start">
            <div>
              {/* Top Row: Category Tag + Case Counter */}
              <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-black/5">
                <span className="text-xs font-bold uppercase tracking-wider text-[#008C84] bg-[#E6F7F5] px-2.5 py-1 rounded-md">
                  {activeCase.category}
                </span>
                <span className="text-[13px] font-bold text-[#475569]">
                  0{activeCaseIdx + 1} <span className="opacity-40">/</span> 0{casesList.length}
                </span>
              </div>

              {/* Side-by-Side Large Before & After Images */}
              <div className="grid grid-cols-2 gap-2 w-full h-[180px] xs:h-[205px] rounded-xl overflow-hidden relative">
                {/* Before Image */}
                <div className="relative w-full h-full bg-slate-100 rounded-lg overflow-hidden border border-black/5">
                  <Image
                    src={activeCase.beforeImg}
                    alt={`${activeCase.tag} Before`}
                    fill
                    sizes="(max-width: 1024px) 50vw, 20vw"
                    className="object-cover object-center"
                  />
                  <span className="absolute bottom-2 left-2 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-sm text-white text-[11px] font-bold uppercase tracking-wider shadow-xs">
                    Before
                  </span>
                </div>

                {/* After Image */}
                <div className="relative w-full h-full bg-slate-100 rounded-lg overflow-hidden border border-black/5">
                  <Image
                    src={activeCase.afterImg}
                    alt={`${activeCase.tag} After`}
                    fill
                    sizes="(max-width: 1024px) 50vw, 20vw"
                    className="object-cover object-center"
                  />
                  <span className="absolute bottom-2 right-2 px-2.5 py-1 rounded-md bg-[#008C84]/95 backdrop-blur-sm text-white text-[11px] font-bold uppercase tracking-wider shadow-xs">
                    After
                  </span>
                </div>
              </div>

              {/* Title & Description */}
              <h3 className="text-[19px] xs:text-[20px] font-serif font-bold text-[#111816] mt-3 leading-snug">
                {activeCase.title}
              </h3>
              <p className="text-sm sm:text-[15px] text-[#334155] leading-relaxed mt-1.5 line-clamp-2">
                {activeCase.description}
              </p>
            </div>

            <div className="mt-3">
              {/* Metric Pills Row */}
              <div className="grid grid-cols-3 gap-2 mb-3 pt-2.5 border-t border-black/5">
                <div className="flex flex-col bg-[#F8FAF9] p-2.5 rounded-xl border border-black/5">
                  <span className="text-[11px] uppercase font-bold text-[#475569] tracking-wider">Duration</span>
                  <span className="text-sm font-bold text-[#111816] truncate mt-0.5">{activeCase.duration}</span>
                </div>
                <div className="flex flex-col bg-[#F8FAF9] p-2.5 rounded-xl border border-black/5">
                  <span className="text-[11px] uppercase font-bold text-[#475569] tracking-wider">Visits</span>
                  <span className="text-sm font-bold text-[#111816] truncate mt-0.5">{activeCase.appointments}</span>
                </div>
                <div className="flex flex-col bg-[#F8FAF9] p-2.5 rounded-xl border border-black/5">
                  <span className="text-[11px] uppercase font-bold text-[#475569] tracking-wider">Specialist</span>
                  <span className="text-sm font-bold text-[#111816] truncate mt-0.5">{activeCase.specialist.replace("Dr. ", "")}</span>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={handleOpenCase}
                className="w-full py-3.5 px-4 min-h-[46px] rounded-xl bg-[#00A89E] hover:bg-[#008C84] text-white text-[15px] xs:text-[16px] font-bold tracking-wide transition-all duration-300 inline-flex items-center justify-center gap-2 cursor-pointer shadow-[0_4px_14px_rgba(0,168,158,0.25)] hover:shadow-[0_6px_20px_rgba(0,168,158,0.4)]"
              >
                <span>Inspect Full Case Study</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 3. Pagination Dots */}
          <div className="flex items-center justify-center gap-1.5 pt-2 pb-1">
            {casesList.map((_, dotIdx) => (
              <button
                key={dotIdx}
                onClick={() => setActiveCaseIdx(dotIdx)}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  activeCaseIdx === dotIdx ? "w-6 bg-[#00A89E]" : "w-1.5 bg-black/20 hover:bg-black/35"
                }`}
                aria-label={`Go to case ${dotIdx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            DESKTOP VIEW: Wireframe 7-col Cards + 5-col Detail Showcase (hidden lg:grid)
            ───────────────────────────────────────────────────────────── */}
        <div className="hidden lg:grid grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT: 2x2 Grid of Before/After Cards (7 cols) */}
          <div className="col-span-7 grid grid-cols-2 gap-5">
            {casesList.map((item, idx) => {
              const isSelected = activeCaseIdx === idx;
              return (
                <div
                  key={item.id}
                  onClick={() => setActiveCaseIdx(idx)}
                  className={`group relative rounded-2xl sm:rounded-3xl p-5 transition-all duration-300 cursor-pointer flex flex-col justify-between border ${
                    isSelected
                      ? "bg-white border-[#00A89E] shadow-[0_12px_36px_rgba(0,168,158,0.18)] ring-2 ring-[#00A89E]/20"
                      : "bg-white/90 border-black/8 hover:border-[#00A89E]/50 hover:bg-white shadow-[0_4px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)]"
                  }`}
                >
                  <div>
                    {/* Top: Card Header Pill & Category */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                        isSelected
                          ? "bg-[#E6F7F5] text-[#008C84]"
                          : "bg-black/5 text-[#334155] group-hover:bg-[#E6F7F5] group-hover:text-[#008C84]"
                      }`}>
                        {item.tag}
                      </span>
                      <span className="text-xs text-[#475569] font-bold">
                        0{idx + 1} / 04
                      </span>
                    </div>

                    {/* Center: Side-by-Side Mini Before / After Preview Images */}
                    <div className="grid grid-cols-2 gap-2 my-2.5 w-full h-[145px] rounded-xl overflow-hidden relative">
                      {/* Before thumbnail */}
                      <div className="relative w-full h-full bg-slate-100 rounded-lg overflow-hidden border border-black/5">
                        <Image
                          src={item.beforeImg}
                          alt={`${item.tag} Before`}
                          fill
                          sizes="20vw"
                          className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        />
                        <span className="absolute bottom-1.5 left-1.5 px-2.5 py-0.5 rounded-md bg-black/80 backdrop-blur-sm text-white text-[11px] font-bold uppercase tracking-wider shadow-xs">
                          Before
                        </span>
                      </div>

                      {/* After thumbnail */}
                      <div className="relative w-full h-full bg-slate-100 rounded-lg overflow-hidden border border-black/5">
                        <Image
                          src={item.afterImg}
                          alt={`${item.tag} After`}
                          fill
                          sizes="20vw"
                          className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        />
                        <span className="absolute bottom-1.5 right-1.5 px-2.5 py-0.5 rounded-md bg-[#008C84]/95 backdrop-blur-sm text-white text-[11px] font-bold uppercase tracking-wider shadow-xs">
                          After
                        </span>
                      </div>
                    </div>

                    {/* Case Title & Short Condition Note */}
                    <h4 className="text-[17px] sm:text-[18px] font-serif font-bold text-[#111816] group-hover:text-[#008C84] transition-colors leading-[1.3] line-clamp-1 mt-2 mb-1">
                      {item.title}
                    </h4>
                    <p className="text-xs sm:text-[13px] text-[#1E293B] font-medium line-clamp-2 leading-relaxed font-sans">
                      {item.description}
                    </p>
                  </div>

                  {/* Bottom: Specialist & Hover indicator */}
                  <div className="flex items-center justify-between pt-3 mt-2 border-t border-black/8 text-xs sm:text-[13px]">
                    <span className="text-[#334155] font-bold truncate">
                      By {item.specialist.replace("Dr. ", "")}
                    </span>
                    <span className={`font-bold transition-all flex-shrink-0 ${
                      isSelected ? "text-[#008C84]" : "text-[#334155] group-hover:text-[#008C84]"
                    }`}>
                      {isSelected ? "Active ●" : "Inspect →"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* RIGHT: Detail Showcase (5 cols - Desktop only) */}
          <div className="col-span-5 flex flex-col">
            <div className="w-full h-full rounded-2xl sm:rounded-3xl bg-white border border-black/8 shadow-[0_16px_40px_rgba(0,0,0,0.06)] p-6 sm:p-7 flex flex-col justify-between">
              
              {/* Top: Interactive Draggable Split Before/After Slider */}
              <div className="relative w-full h-[240px] sm:h-[250px] rounded-xl sm:rounded-2xl overflow-hidden border border-black/10 bg-slate-50 select-none mb-4 flex-shrink-0">
                {/* After Image */}
                <div className="absolute inset-0 w-full h-full">
                  <Image
                    src={activeCase.afterImg}
                    alt="After treatment result"
                    fill
                    sizes="40vw"
                    className="object-cover object-center"
                  />
                  <span className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-[#111816] border border-black/10 shadow-xs">
                    After
                  </span>
                </div>

                {/* Before Image (Clipped Left Layer) */}
                <div
                  className="absolute inset-0 w-full h-full overflow-hidden"
                  style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
                >
                  <Image
                    src={activeCase.beforeImg}
                    alt="Before treatment"
                    fill
                    sizes="40vw"
                    className="object-cover object-center"
                  />
                  <span className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-[#111816] border border-black/10 shadow-xs">
                    Before
                  </span>
                </div>

                {/* Draggable Divider Line */}
                <div
                  className="absolute top-0 bottom-0 w-[2px] bg-[#00A89E] cursor-ew-resize z-20 shadow-[0_0_12px_rgba(0,168,158,0.5)]"
                  style={{ left: `${sliderPos}%` }}
                >
                  <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-white text-[#00A89E] flex items-center justify-center shadow-lg border border-[#00A89E]/40 text-xs font-bold font-mono">
                    ‹›
                  </div>
                </div>

                {/* Mouse/Touch Move Overlay */}
                <div
                  className="absolute inset-0 z-30 cursor-ew-resize"
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    handleSliderMove(e.clientX, rect);
                  }}
                  onTouchMove={(e) => {
                    if (e.touches.length > 0) {
                      const rect = e.currentTarget.getBoundingClientRect();
                      handleSliderMove(e.touches[0].clientX, rect);
                    }
                  }}
                />
              </div>

              {/* Middle: Title & Clinical Description */}
              <div className="flex flex-col mb-4 flex-1 justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <Sparkles className="w-4 h-4 text-[#00A89E]" />
                    <span className="text-xs font-bold text-[#008C84] uppercase tracking-wider">
                      {activeCase.category}
                    </span>
                  </div>
                  <h3 className="text-2xl font-serif text-[#111816] font-bold mb-2.5 leading-snug">
                    {activeCase.title}
                  </h3>
                  <p className="text-sm text-[#334155] leading-relaxed mb-3 font-sans font-normal">
                    {activeCase.description}
                  </p>
                </div>

                {/* 4 Clinical Detail Metric Badges */}
                <div className="grid grid-cols-2 gap-2.5 pt-3 border-t border-black/5">
                  <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#F8FAF9] border border-black/5">
                    <Clock className="w-4 h-4 text-[#00A89E] flex-shrink-0" />
                    <div className="flex flex-col min-w-0">
                      <span className="text-[11px] uppercase tracking-wider text-[#475569] font-bold leading-tight">Duration</span>
                      <span className="text-xs sm:text-[13px] font-serif font-bold text-[#111816] leading-tight truncate mt-0.5">{activeCase.duration}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#F8FAF9] border border-black/5">
                    <Calendar className="w-4 h-4 text-[#00A89E] flex-shrink-0" />
                    <div className="flex flex-col min-w-0">
                      <span className="text-[11px] uppercase tracking-wider text-[#475569] font-bold leading-tight">Appointments</span>
                      <span className="text-xs sm:text-[13px] font-serif font-bold text-[#111816] leading-tight truncate mt-0.5">{activeCase.appointments}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#F8FAF9] border border-black/5">
                    <UserCheck className="w-4 h-4 text-[#00A89E] flex-shrink-0" />
                    <div className="flex flex-col min-w-0">
                      <span className="text-[11px] uppercase tracking-wider text-[#475569] font-bold leading-tight">Specialist</span>
                      <span className="text-xs sm:text-[13px] font-serif font-bold text-[#111816] leading-tight truncate mt-0.5">{activeCase.specialist}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#F8FAF9] border border-black/5">
                    <Shield className="w-4 h-4 text-[#00A89E] flex-shrink-0" />
                    <div className="flex flex-col min-w-0">
                      <span className="text-[11px] uppercase tracking-wider text-[#475569] font-bold leading-tight">Methodology</span>
                      <span className="text-xs sm:text-[13px] font-serif font-bold text-[#111816] leading-tight truncate mt-0.5">{activeCase.methodology}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Assessment CTA */}
              <button
                onClick={handleOpenCase}
                className="w-full py-3.5 px-6 min-h-[48px] rounded-xl bg-[#00A89E] hover:bg-[#008C84] text-white text-sm font-bold tracking-wide transition-all duration-300 inline-flex items-center justify-center gap-2 cursor-pointer shadow-[0_4px_16px_rgba(0,168,158,0.25)] hover:shadow-[0_6px_22px_rgba(0,168,158,0.4)]"
              >
                <span>View Full Case & Treatment Plan</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>
          </div>

        </div>

        </div>
      </div>
    </section>
  );
}
