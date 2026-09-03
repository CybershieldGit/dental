"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { treatments } from "@/data/treatments";
import { useOverlay } from "../layout/OverlayProvider";
import { X, Check, ShieldCheck, Clock, UserCheck, Sparkles, ArrowRight } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

export default function TreatmentOverlay() {
  const { activeOverlay, activeDetailSlug, closeOverlay, openOverlay } = useOverlay();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeOverlay === "treatment") {
      containerRef.current?.focus();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [activeOverlay]);

  if (activeOverlay !== "treatment" || !activeDetailSlug) return null;

  const treatment = treatments.find((t) => t.slug === activeDetailSlug);
  if (!treatment) return null;

  const handleBookClick = () => {
    trackEvent("booking_started");
    openOverlay("booking");
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6 lg:p-8 pointer-events-auto">
      {/* Editorial Blurred Backdrop */}
      <div
        className="fixed inset-0 bg-[#111816]/60 backdrop-blur-md transition-opacity duration-300"
        onClick={closeOverlay}
      />

      {/* Luxury Editorial Modal Card */}
      <div
        ref={containerRef}
        tabIndex={-1}
        className="relative w-full max-w-[760px] max-h-[88vh] bg-[#FFFFF0] text-[#111816] rounded-[32px] sm:rounded-[36px] shadow-[0_32px_80px_rgba(0,0,0,0.28),0_4px_24px_rgba(0,0,0,0.08)] border border-black/10 flex flex-col justify-between overflow-hidden focus:outline-none z-10 animate-in fade-in zoom-in-95 duration-300"
        role="dialog"
        aria-modal="true"
        aria-labelledby="treatment-overlay-title"
      >
        {/* Header */}
        <div className="px-6 sm:px-8 py-5 sm:py-6 border-b border-black/8 flex items-start justify-between bg-white/70 backdrop-blur-md flex-shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#008C84] bg-[#E6F7F5] px-2.5 py-0.5 rounded-full">
                {treatment.category}
              </span>
              <span className="text-xs text-[#475569] font-semibold">Specialized Care</span>
            </div>
            <h2 id="treatment-overlay-title" className="text-2xl sm:text-3xl font-serif text-[#111816] font-bold tracking-tight">
              {treatment.title}
            </h2>
          </div>
          <button
            onClick={closeOverlay}
            className="w-10 h-10 rounded-full bg-black/5 hover:bg-black/10 text-[#111816] flex items-center justify-center transition-all duration-200 cursor-pointer hover:rotate-90 flex-shrink-0"
            aria-label="Close treatment details"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 p-6 sm:p-8 overflow-y-auto flex flex-col gap-6">
          {/* Visual Showcase Card */}
          <div className="relative w-full h-[180px] sm:h-[210px] rounded-2xl overflow-hidden shadow-sm border border-black/8 bg-slate-100 flex-shrink-0">
            <Image
              src={treatment.image}
              alt={treatment.title}
              fill
              sizes="(max-width: 768px) 100vw, 760px"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <p className="text-sm sm:text-base font-serif italic text-white/95 leading-snug max-w-xl">
                &ldquo;{treatment.shortDescription}&rdquo;
              </p>
            </div>
          </div>

          {/* 3 Quick Spec Badges */}
          <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
            <div className="bg-white p-3 rounded-xl border border-black/6 flex flex-col">
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#475569]">Timeline</span>
              <span className="text-xs sm:text-[13px] font-bold text-[#111816] mt-0.5 truncate">{treatment.timeline}</span>
            </div>
            <div className="bg-white p-3 rounded-xl border border-black/6 flex flex-col">
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#475569]">Lead Doctor</span>
              <span className="text-xs sm:text-[13px] font-bold text-[#111816] mt-0.5 truncate">{treatment.doctor}</span>
            </div>
            <div className="bg-white p-3 rounded-xl border border-black/6 flex flex-col">
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#475569]">Estimated Fee</span>
              <span className="text-xs sm:text-[13px] font-bold text-[#008C84] mt-0.5 truncate">{treatment.estimatedCostRange}</span>
            </div>
          </div>

          {/* Section: Who it is for */}
          <div className="bg-white p-5 rounded-2xl border border-black/6">
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#008C84] block mb-3">
              PATIENT INDICATIONS
            </span>
            <ul className="flex flex-col gap-2.5">
              {treatment.whoItIsFor.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#1E293B] font-medium leading-snug">
                  <div className="w-4.5 h-4.5 rounded-full bg-[#E6F7F5] text-[#008C84] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Section: The Clinical Steps */}
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#008C84] block mb-3">
              CLINICAL MILESTONES
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {treatment.steps.map((step, idx) => (
                <div key={idx} className="bg-white border border-black/8 rounded-xl p-4 flex gap-3 shadow-2xs">
                  <span className="text-sm font-mono font-bold text-[#008C84] bg-[#E6F7F5] w-7 h-7 rounded-md flex items-center justify-center shrink-0">
                    0{idx + 1}
                  </span>
                  <div className="min-w-0">
                    <h4 className="text-xs sm:text-sm font-serif font-bold text-[#111816] mb-0.5">{step.title}</h4>
                    <p className="text-[11.5px] sm:text-xs text-[#475569] leading-relaxed font-sans">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Consultation Note */}
          <div className="bg-[#E6F7F5]/70 border border-[#00A89E]/20 rounded-xl p-3.5 flex gap-2.5 text-xs text-[#334155]">
            <ShieldCheck className="w-4.5 h-4.5 text-[#008C84] shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              Every procedure is preceded by high-resolution 3D CBCT imaging to ensure exact anatomical safety.
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 sm:px-8 py-4 sm:py-5 bg-white/70 backdrop-blur-md border-t border-black/8 flex items-center justify-between gap-4 flex-shrink-0">
          <span className="text-xs text-[#475569] font-medium hidden sm:inline">
            Have questions about this procedure?
          </span>
          <button
            onClick={handleBookClick}
            className="w-full sm:w-auto px-7 py-3 min-h-[46px] bg-[#00A89E] hover:bg-[#008C84] text-white text-sm font-bold rounded-full transition-all duration-300 cursor-pointer shadow-[0_4px_14px_rgba(0,168,158,0.25)] hover:shadow-[0_6px_20px_rgba(0,168,158,0.4)] flex items-center justify-center gap-2"
          >
            <span>Book Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
