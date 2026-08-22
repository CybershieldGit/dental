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
    <section id="stories" className="py-20 md:py-28 relative z-10 border-t border-black/5 bg-[#FFFFF0]/40">
      <div className="w-full max-w-[1740px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 pr-6 sm:pr-8 lg:pr-16 xl:pr-20">
        
        {/* Section Header: Matches Wireframe "success stories" banner */}
        <div className="flex flex-col items-start gap-2 mb-10 sm:mb-12 max-w-3xl pl-0 sm:pl-2 lg:pl-4">
          <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.24em] text-[#00A89E] block">
            PATIENT TRANSFORMATIONS
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] xl:text-[48px] font-serif text-[#111816] font-medium leading-[1.08] tracking-tight">
            Success Stories
          </h2>
          <p className="text-sm sm:text-base md:text-[17px] text-[#4A5568] font-sans font-normal leading-relaxed max-w-xl">
            Explore verified before-and-after transformations. Click any case to inspect the clinical details and surgical methodology.
          </p>
        </div>

        {/* Wireframe Grid: Left 2x2 Before/After Cards + Right Detail Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          
          {/* LEFT: 2x2 Grid of Before/After Cards (7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {casesList.map((item, idx) => {
              const isSelected = activeCaseIdx === idx;
              return (
                <div
                  key={item.id}
                  onClick={() => setActiveCaseIdx(idx)}
                  className={`group relative rounded-2xl sm:rounded-3xl p-4 sm:p-5 transition-all duration-300 cursor-pointer flex flex-col justify-between min-h-[220px] sm:min-h-[240px] border ${
                    isSelected
                      ? "bg-white border-[#00A89E] shadow-[0_12px_36px_rgba(0,168,158,0.18)] ring-2 ring-[#00A89E]/20"
                      : "bg-white/80 border-black/8 hover:border-[#00A89E]/40 hover:bg-white shadow-[0_4px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)]"
                  }`}
                >
                  {/* Top: Card Header Pill & Category */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className={`text-[10px] sm:text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                      isSelected
                        ? "bg-[#E6F7F5] text-[#00A89E]"
                        : "bg-black/5 text-[#5A6B66] group-hover:bg-[#E6F7F5] group-hover:text-[#00A89E]"
                    }`}>
                      {item.tag}
                    </span>
                    <span className="text-[10px] text-[#718096] font-medium">
                      0{idx + 1} / 04
                    </span>
                  </div>

                  {/* Center: Side-by-Side Mini Before / After Preview Images */}
                  <div className="grid grid-cols-2 gap-2 my-2 w-full h-[110px] sm:h-[120px] rounded-xl overflow-hidden relative">
                    {/* Before thumbnail */}
                    <div className="relative w-full h-full bg-slate-100 rounded-lg overflow-hidden">
                      <Image
                        src={item.beforeImg}
                        alt={`${item.tag} Before`}
                        fill
                        sizes="(max-width: 768px) 50vw, 20vw"
                        className="object-cover object-center"
                      />
                      <span className="absolute bottom-1.5 left-1.5 px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm text-white text-[9px] font-semibold uppercase tracking-wider">
                        Before
                      </span>
                    </div>

                    {/* After thumbnail */}
                    <div className="relative w-full h-full bg-slate-100 rounded-lg overflow-hidden">
                      <Image
                        src={item.afterImg}
                        alt={`${item.tag} After`}
                        fill
                        sizes="(max-width: 768px) 50vw, 20vw"
                        className="object-cover object-center"
                      />
                      <span className="absolute bottom-1.5 right-1.5 px-2 py-0.5 rounded bg-[#00A89E]/90 backdrop-blur-sm text-white text-[9px] font-semibold uppercase tracking-wider">
                        After
                      </span>
                    </div>
                  </div>

                  {/* Bottom: Title & Hover indicator */}
                  <div className="flex items-center justify-between pt-2 border-t border-black/5">
                    <span className="text-xs sm:text-sm font-serif font-bold text-[#111816] group-hover:text-[#00A89E] transition-colors">
                      {item.title}
                    </span>
                    <span className={`text-[11px] font-semibold transition-all ${
                      isSelected ? "text-[#00A89E] translate-x-0" : "text-[#718096] group-hover:text-[#00A89E]"
                    }`}>
                      {isSelected ? "Active ●" : "Inspect →"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* RIGHT: Detail Showcase (Wireframe: Detail about before and after treatment triggered on hover) (5 cols) */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="w-full h-full rounded-2xl sm:rounded-3xl bg-white border border-black/8 shadow-[0_16px_40px_rgba(0,0,0,0.06)] p-6 sm:p-7 flex flex-col justify-between">
              
              {/* Top: Interactive Draggable Split Before/After Slider */}
              <div className="relative w-full h-[220px] sm:h-[250px] rounded-xl sm:rounded-2xl overflow-hidden border border-black/10 bg-slate-50 select-none mb-5">
                {/* After Image */}
                <div className="absolute inset-0 w-full h-full">
                  <Image
                    src={activeCase.afterImg}
                    alt="After treatment result"
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover object-center"
                  />
                  <span className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-[#111816] border border-black/10 shadow-sm">
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
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover object-center"
                  />
                  <span className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-[#111816] border border-black/10 shadow-sm">
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
              <div className="flex flex-col mb-4">
                <div className="flex items-center gap-2 mb-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#00A89E]" />
                  <span className="text-[11px] font-semibold text-[#00A89E] uppercase tracking-wider">
                    {activeCase.category}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-serif text-[#111816] font-bold mb-2">
                  {activeCase.title}
                </h3>
                <p className="text-xs sm:text-[13px] text-[#4A5568] leading-relaxed">
                  {activeCase.description}
                </p>
              </div>

              {/* 4 Clinical Detail Metric Badges */}
              <div className="grid grid-cols-2 gap-2.5 mb-5 pt-3 border-t border-black/5">
                <div className="flex items-center gap-2 p-2 rounded-lg bg-[#F8FAF9] border border-black/5">
                  <Clock className="w-3.5 h-3.5 text-[#00A89E] flex-shrink-0" />
                  <div className="flex flex-col min-w-0">
                    <span className="text-[9px] uppercase tracking-wider text-[#718096] font-semibold leading-tight">Duration</span>
                    <span className="text-xs font-serif font-bold text-[#111816] leading-tight truncate">{activeCase.duration}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-2 rounded-lg bg-[#F8FAF9] border border-black/5">
                  <Calendar className="w-3.5 h-3.5 text-[#00A89E] flex-shrink-0" />
                  <div className="flex flex-col min-w-0">
                    <span className="text-[9px] uppercase tracking-wider text-[#718096] font-semibold leading-tight">Appointments</span>
                    <span className="text-xs font-serif font-bold text-[#111816] leading-tight truncate">{activeCase.appointments}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-2 rounded-lg bg-[#F8FAF9] border border-black/5">
                  <UserCheck className="w-3.5 h-3.5 text-[#00A89E] flex-shrink-0" />
                  <div className="flex flex-col min-w-0">
                    <span className="text-[9px] uppercase tracking-wider text-[#718096] font-semibold leading-tight">Specialist</span>
                    <span className="text-xs font-serif font-bold text-[#111816] leading-tight truncate">{activeCase.specialist}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-2 rounded-lg bg-[#F8FAF9] border border-black/5">
                  <Shield className="w-3.5 h-3.5 text-[#00A89E] flex-shrink-0" />
                  <div className="flex flex-col min-w-0">
                    <span className="text-[9px] uppercase tracking-wider text-[#718096] font-semibold leading-tight">Methodology</span>
                    <span className="text-xs font-serif font-bold text-[#111816] leading-tight truncate">{activeCase.methodology}</span>
                  </div>
                </div>
              </div>

              {/* Bottom Assessment CTA */}
              <button
                onClick={handleOpenCase}
                className="w-full py-3.5 px-6 min-h-[46px] rounded-xl bg-[#00A89E] hover:bg-[#008C84] text-white text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 inline-flex items-center justify-center gap-2 cursor-pointer shadow-[0_4px_16px_rgba(0,168,158,0.2)] hover:shadow-[0_6px_22px_rgba(0,168,158,0.35)]"
              >
                <span>View Full Case & Treatment Plan</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
