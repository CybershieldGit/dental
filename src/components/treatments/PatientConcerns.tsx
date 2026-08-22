"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useOverlay } from "@/components/layout/OverlayProvider";
import { trackEvent } from "@/lib/analytics";
import {
  AlertCircle,
  Smile,
  Shield,
  Sparkles,
  Plane,
  HelpCircle,
  ChevronRight,
  ArrowRight,
  Clock,
  CheckCircle2,
} from "lucide-react";

export default function PatientConcerns() {
  const { openOverlay, updateBookingState } = useOverlay();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const SLIDE_DURATION = 4200; // 4.2 seconds per slide

  const concerns = [
    {
      id: "pain",
      icon: AlertCircle,
      title: "Toothache or Discomfort",
      subtitle: "Gentle pain relief & same-day emergency care",
      tag: "SAME-DAY RELIEF",
      treatment: "Gentle Emergency Care & Tooth Preservation",
      highlights: [
        "Immediate pain-relief priority",
        "Gentle, comfortable care",
      ],
      timeframe: "Same-Day Slot",
      image: "/images/root-canal.jpg",
    },
    {
      id: "smile",
      icon: Smile,
      title: "I Want a Brighter, Better Smile",
      subtitle: "Custom porcelain veneers, whitening & smile redesign",
      tag: "COSMETIC DENTISTRY",
      treatment: "Custom Smile Design & Natural Porcelain Veneers",
      highlights: [
        "Preview your smile before starting",
        "Natural, custom shade matching",
      ],
      timeframe: "2–3 Visits",
      image: "/images/hero-smile.jpg",
    },
    {
      id: "missing",
      icon: Shield,
      title: "Missing or Broken Teeth",
      subtitle: "Permanent dental implants that feel and chew naturally",
      tag: "PERMANENT IMPLANTS",
      treatment: "Guided Dental Implants & Long-Lasting Restoration",
      highlights: [
        "Eat and smile with full confidence",
        "Lifetime durability and strength",
      ],
      timeframe: "Permanent Solution",
      image: "/images/implants.jpg",
    },
    {
      id: "straighter",
      icon: Sparkles,
      title: "Straighten Teeth Without Metal Braces",
      subtitle: "Comfortable, invisible clear aligners for all ages",
      tag: "CLEAR ALIGNERS",
      treatment: "Custom Invisible Aligners & Orthodontic Care",
      highlights: [
        "Discreet, clear, and removable trays",
        "Eat your favorite food with zero hassle",
      ],
      timeframe: "Custom Timeline",
      image: "/images/aligners.jpg",
    },
    {
      id: "tourism",
      icon: Plane,
      title: "Traveling to India for Dental Care",
      subtitle: "Complete treatments during your trip with travel concierge",
      tag: "TRAVEL CONCIERGE",
      treatment: "Comprehensive Care Completed During Your Stay",
      highlights: [
        "Dedicated patient care coordinator",
        "Full mouth treatments scheduled smoothly",
      ],
      timeframe: "5–7 Day Program",
      image: "/images/clinic-environment.jpg",
    },
    {
      id: "help",
      icon: HelpCircle,
      title: "Routine Checkup & Deep Cleaning",
      subtitle: "Complete oral health evaluation and gentle plaque removal",
      tag: "PREVENTIVE CARE",
      treatment: "Comprehensive Dental Wellness Exam & Cleaning",
      highlights: [
        "Relaxed, zero-pressure consultation",
        "Clear, step-by-step health roadmap",
      ],
      timeframe: "45 Minutes",
      image: "/images/blog-dental-checkup.jpg",
    },
  ];

  // Auto-advance slideshow when user is NOT hovering
  useEffect(() => {
    if (isHovered) {
      if (timerRef.current) clearInterval(timerRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      setProgress(100);
      return;
    }

    setProgress(0);
    const startTime = Date.now();

    // Progress bar ticker (runs every 40ms)
    progressIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, (elapsed / SLIDE_DURATION) * 100);
      setProgress(pct);
    }, 40);

    // Slide switch timer
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % concerns.length);
    }, SLIDE_DURATION);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [activeIndex, isHovered, concerns.length]);

  const handleRowClick = (concern: (typeof concerns)[0]) => {
    trackEvent("booking_started", { concern: concern.title });
    if (concern.id === "tourism") {
      openOverlay("booking");
    } else {
      updateBookingState({ concern: concern.title });
      openOverlay("booking");
    }
  };

  const handleMouseEnterCard = (idx: number) => {
    setIsHovered(true);
    setActiveIndex(idx);
  };

  const handleMouseLeaveSection = () => {
    setIsHovered(false);
  };

  const activeConcern = concerns[activeIndex];

  return (
    <section
      id="diagnostics"
      className="py-16 sm:py-20 lg:py-24 relative z-10 select-none"
    >
      <div className="container-editorial w-full" onMouseLeave={handleMouseLeaveSection}>
        {/* 1. Section Header: Spans above the interactive area */}
        <div className="flex flex-col items-start gap-3 mb-8 sm:mb-10 max-w-3xl">
          <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#00A89E] block">
            PATIENT CARE GUIDE
          </span>

          <h2 className="text-4xl sm:text-5xl lg:text-[52px] font-serif text-[#111816] font-medium leading-[1.08] tracking-tight">
            What brings you <span className="italic font-medium text-[#00A89E]">to our clinic today?</span>
          </h2>

          <p className="text-base sm:text-lg text-[#4A5568] font-normal leading-relaxed max-w-xl">
            Choose your primary concern below. We&apos;ll match you with the right specialist and prepare a gentle, personalized care plan.
          </p>
        </div>

        {/* 2. Interactive Area: Left Cards Stack & Right Showcase Card start on the EXACT SAME LEVEL */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12 items-stretch">
          
          {/* Left Column: 6 Patient Concern Cards (7 cols) */}
          <div className="lg:col-span-7 xl:col-span-7 flex flex-col justify-between gap-3 w-full">
            {concerns.map((item, idx) => {
              const Icon = item.icon;
              const isActive = activeIndex === idx;

              return (
                <button
                  key={item.id}
                  onClick={() => handleRowClick(item)}
                  onMouseEnter={() => handleMouseEnterCard(idx)}
                  className={`relative w-full py-3.5 sm:py-4 px-4 sm:px-5 rounded-2xl border text-left flex items-center justify-between gap-4 transition-all duration-300 cursor-pointer overflow-hidden ${
                    isActive
                      ? "bg-white border-[#00A89E] shadow-[0_8px_24px_rgba(0,168,158,0.16)] ring-1 ring-[#00A89E]/40 translate-x-1"
                      : "bg-white border-black/8 hover:border-[#00A89E]/40 hover:bg-white shadow-xs"
                  }`}
                >
                  {/* Live Progress Bar on Active Card during Auto-Slideshow */}
                  {isActive && !isHovered && (
                    <div
                      className="absolute bottom-0 left-0 h-[3px] bg-[#00A89E] transition-all ease-linear"
                      style={{ width: `${progress}%` }}
                    />
                  )}

                  <div className="flex items-center gap-3.5 min-w-0">
                    {/* Icon Box */}
                    <div
                      className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
                        isActive
                          ? "bg-[#00A89E] text-white shadow-[0_4px_12px_rgba(0,168,158,0.3)]"
                          : "bg-[#E6F7F5] text-[#00A89E]"
                      }`}
                    >
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>

                    {/* Concern Title & Subtitle */}
                    <div className="flex flex-col min-w-0">
                      <span
                        className={`text-sm sm:text-base font-serif font-semibold tracking-tight transition-colors duration-200 truncate ${
                          isActive ? "text-[#00A89E]" : "text-[#111816]"
                        }`}
                      >
                        {item.title}
                      </span>
                      <span className="text-xs sm:text-[13px] text-[#5A6B66] font-normal mt-0.5 truncate">
                        {item.subtitle}
                      </span>
                    </div>
                  </div>

                  {/* Right Action / Active Pill */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {isActive && (
                      <span className="hidden sm:inline-block text-[11px] font-semibold text-[#00A89E] bg-[#E6F7F5] px-2.5 py-1 rounded-md">
                        Selected
                      </span>
                    )}
                    <ChevronRight
                      className={`w-4 h-4 transition-all duration-300 ${
                        isActive
                          ? "text-[#00A89E] translate-x-1"
                          : "text-[#A0AEC0]"
                      }`}
                    />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Treatment Showcase Card (5 cols) — Starts at the EXACT level of Card 1 */}
          <div className="lg:col-span-5 xl:col-span-5 flex flex-col">
            <div className="bg-white rounded-3xl border border-black/10 shadow-[0_16px_40px_rgba(0,0,0,0.06)] p-5 sm:p-6 flex flex-col justify-between h-full">
              
              {/* Image Box */}
              <div className="relative w-full h-[200px] sm:h-[220px] rounded-2xl overflow-hidden bg-[#F8F8F4] border border-black/5 flex-shrink-0 mb-4">
                {concerns.map((item, idx) => (
                  <div
                    key={item.id}
                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                      activeIndex === idx ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      priority={idx === 0}
                      className="object-cover object-center"
                    />
                  </div>
                ))}

                {/* Top Badge Overlay */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                  <div className="inline-flex items-center gap-1.5 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full border border-black/5 shadow-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00A89E] animate-pulse" />
                    <span className="text-[10px] font-bold text-[#111816] tracking-wider uppercase">
                      Care Overview
                    </span>
                  </div>

                  <div className="bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full border border-black/5 text-[#111816] text-[11px] font-semibold tracking-wider shadow-xs">
                    <span className="text-[#00A89E]">0{activeIndex + 1}</span>
                    <span className="opacity-40 mx-0.5">/</span>
                    <span className="opacity-60">0{concerns.length}</span>
                  </div>
                </div>
              </div>

              {/* Treatment Details */}
              <div className="flex flex-col justify-between flex-1">
                <div>
                  {/* Category Tag & Timeframe */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10.5px] font-bold uppercase tracking-wider text-[#00A89E] bg-[#E6F7F5] px-2.5 py-1 rounded-md">
                      {activeConcern.tag}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs text-[#5A6B66] font-medium">
                      <Clock className="w-3.5 h-3.5 text-[#00A89E]" />
                      <span>{activeConcern.timeframe}</span>
                    </div>
                  </div>

                  {/* Treatment Title */}
                  <h3 className="text-xl sm:text-[22px] font-serif font-medium text-[#111816] leading-snug mb-2.5">
                    {activeConcern.treatment}
                  </h3>

                  {/* Highlights Checklist */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                    {activeConcern.highlights.map((highlight, hIdx) => (
                      <div key={hIdx} className="flex items-center gap-2 text-xs sm:text-[13px] text-[#2D3748]">
                        <CheckCircle2 className="w-4 h-4 text-[#00A89E] flex-shrink-0" />
                        <span className="truncate">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => handleRowClick(activeConcern)}
                  className="w-full py-3.5 px-6 min-h-[48px] bg-[#00A89E] hover:bg-[#008C84] text-white text-xs sm:text-sm font-semibold rounded-xl transition-all duration-300 inline-flex items-center justify-center gap-2.5 cursor-pointer shadow-[0_4px_16px_rgba(0,168,158,0.28)] hover:shadow-[0_6px_22px_rgba(0,168,158,0.4)] hover:-translate-y-[0.5px]"
                >
                  <span>Book Consultation for This Care</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* Direct Dot Selectors */}
                <div className="flex items-center justify-center gap-2 mt-3 pt-2.5 border-t border-black/5">
                  {concerns.map((_, dotIdx) => (
                    <button
                      key={dotIdx}
                      onClick={() => {
                        setActiveIndex(dotIdx);
                        setIsHovered(true);
                      }}
                      className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                        activeIndex === dotIdx
                          ? "w-6 bg-[#00A89E]"
                          : "w-1.5 bg-black/15 hover:bg-black/30"
                      }`}
                      aria-label={`Go to care option ${dotIdx + 1}`}
                    />
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
