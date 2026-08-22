"use client";

import React from "react";
import Image from "next/image";
import { useOverlay } from "@/components/layout/OverlayProvider";
import { trackEvent } from "@/lib/analytics";
import { ArrowUpRight, Sparkles, ShieldCheck, Heart, Star } from "lucide-react";

export default function Hero() {
  const { openOverlay } = useOverlay();

  const handleBookClick = () => {
    trackEvent("hero_book_click");
    openOverlay("booking");
  };

  const featureItems = [
    {
      icon: Sparkles,
      stat: "15,000+",
      label: "Smiles Perfected",
    },
    {
      icon: ShieldCheck,
      stat: "3D CBCT",
      label: "Precision Imaging",
    },
    {
      icon: Heart,
      stat: "100% PAINLESS",
      label: "Laser Care",
    },
    {
      icon: Star,
      stat: "4.9 / 5.0",
      label: "Top Rated Care",
    },
  ];

  return (
    <>
      <section
        id="hero"
        className="relative w-full min-h-screen flex flex-col justify-center pt-20 sm:pt-24 lg:pt-24 pb-8 sm:pb-10 z-10 select-none text-[#111816]"
      >
        {/* Full-Width Expansive Container (Matching Reference Edge-to-Edge Breathing Room) */}
        <div className="w-full max-w-[1740px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 flex-1 flex flex-col justify-center my-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 xl:gap-12 items-center min-h-[580px] lg:min-h-[660px]">
            
            {/* Left Column: Heading, Subtitle, CTA, and Feature Metrics */}
            <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-between h-full py-2 sm:py-4 lg:py-6 pl-0 sm:pl-2 lg:pl-4">
              
              {/* Top / Middle Typography Block */}
              <div className="flex flex-col items-start my-auto">
                <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.24em] text-[#00A89E] mb-3 sm:mb-4 block">
                  ADVANCED DENTAL CARE
                </span>

                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[70px] xl:text-[80px] font-serif text-[#111816] font-medium leading-[1.05] tracking-tight">
                  Caring for Your <br />
                  <span className="italic font-medium text-[#00A89E]">Smile,</span> One Visit <br />
                  at a Time.
                </h1>

                <p className="text-base sm:text-lg md:text-[19px] text-[#4A5568] font-sans font-normal leading-relaxed max-w-[500px] mt-5 sm:mt-6">
                  Your smile is more than just an expression, it&apos;s a reflection of your confidence, health, and happiness.
                </p>

                {/* CTA Pill Button (Exact Reference Spacing) */}
                <div className="mt-8 sm:mt-10">
                  <button
                    onClick={handleBookClick}
                    className="px-8 sm:px-9 py-4 min-h-[54px] sm:min-h-[58px] bg-[#111816] hover:bg-[#00A89E] text-white text-sm sm:text-base font-semibold rounded-full transition-all duration-300 inline-flex items-center justify-center gap-3 cursor-pointer shadow-[0_6px_22px_rgba(0,0,0,0.15)] hover:shadow-[0_10px_30px_rgba(0,168,158,0.4)] hover:-translate-y-0.5 group"
                  >
                    <span>Set Appointment</span>
                    <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                </div>
              </div>

              {/* Bottom Feature Stats Strip */}
              <div className="w-full pt-8 sm:pt-10 border-t border-black/10 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-4 lg:gap-6 mt-8 sm:mt-12">
                {featureItems.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      className={`flex items-center gap-2.5 ${
                        idx > 0 ? "sm:border-l sm:border-black/10 sm:pl-3 lg:pl-4" : ""
                      }`}
                    >
                      <div className="p-1.5 sm:p-2 rounded-lg bg-[#E6F7F5] text-[#00A89E] flex-shrink-0">
                        <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-xs sm:text-[13px] font-bold text-[#111816] uppercase tracking-tight leading-tight whitespace-nowrap">
                          {item.stat}
                        </span>
                        <span className="text-[10px] sm:text-[11px] text-[#5A6B66] font-medium leading-tight mt-0.5 whitespace-nowrap">
                          {item.label}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>

            {/* Right Column: Hero Visual Card (Clean Right-Side Alignment) */}
            <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center h-full pr-0 sm:pr-2 lg:pr-2">
              <div className="relative w-full h-[520px] sm:h-[600px] lg:h-full min-h-[520px] lg:min-h-[660px] rounded-[28px] sm:rounded-[36px] overflow-hidden bg-[#F3F4F1] shadow-[0_16px_48px_rgba(0,0,0,0.08)] border border-black/5">
                
                {/* Hero Portrait Image */}
                <Image
                  src="/images/hero-smile.jpg"
                  alt="Confident smile after treatment at AnjMohi Dental Clinic"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center"
                />

                {/* Floating Top-Right Contact Pill Button */}
                <button
                  onClick={handleBookClick}
                  className="absolute top-5 sm:top-6 right-5 sm:right-6 z-20 px-5 sm:px-6 py-2.5 rounded-full bg-white/95 hover:bg-white text-[#111816] hover:text-[#00A89E] backdrop-blur-md border border-black/5 text-xs sm:text-sm font-semibold shadow-[0_4px_16px_rgba(0,0,0,0.08)] flex items-center gap-1.5 transition-all duration-300 hover:scale-105 cursor-pointer"
                >
                  <span>Contact</span>
                  <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>

                {/* Glassmorphic Product / Feature Card Overlay */}
                <div className="absolute top-[35%] left-5 sm:left-7 z-20 max-w-[210px] sm:max-w-[230px] rounded-2xl bg-white/80 backdrop-blur-xl border border-white/80 p-4 shadow-[0_16px_36px_rgba(0,0,0,0.12)] transition-transform duration-500 hover:scale-105">
                  {/* Top Bar with 3 Window Dots */}
                  <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-black/10">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#EF4444]/80" />
                      <span className="w-2 h-2 rounded-full bg-[#F59E0B]/80" />
                      <span className="w-2 h-2 rounded-full bg-[#10B981]/80" />
                    </div>
                    <span className="text-[10px] font-semibold text-[#5A6B66] uppercase tracking-wider">
                      Care Feature
                    </span>
                  </div>

                  {/* Title */}
                  <h4 className="text-sm font-serif font-bold text-[#111816] leading-tight">
                    Glowing Smile
                  </h4>
                  <p className="text-[11px] text-[#5A6B66] mt-0.5 font-medium">
                    Laser Tech & Whitening
                  </p>

                  {/* Specification Badges */}
                  <div className="grid grid-cols-2 gap-2 mt-3 pt-2.5 border-t border-black/5">
                    <div className="flex flex-col">
                      <span className="text-[9px] text-[#718096] uppercase font-medium">Treatment</span>
                      <span className="text-[11px] font-bold text-[#111816]">Painless</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[9px] text-[#718096] uppercase font-medium">Comfort</span>
                      <span className="text-[11px] font-bold text-[#111816]">Boutique</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Fixed Scroll to Explore indicator */}
      <div
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-1.5 opacity-70 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        aria-hidden="true"
      >
        <div className="w-4 h-7 rounded-full border border-black/40 flex justify-center pt-1.5">
          <div className="w-1 h-1.5 bg-[#00A89E] rounded-full animate-bounce" />
        </div>
        <span className="text-[9px] tracking-[0.3em] uppercase text-[#111816]/70 font-semibold">
          SCROLL TO EXPLORE
        </span>
      </div>
    </>
  );
}
