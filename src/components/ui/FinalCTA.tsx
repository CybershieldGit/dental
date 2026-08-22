"use client";

import React from "react";
import { useOverlay } from "@/components/layout/OverlayProvider";
import { trackEvent } from "@/lib/analytics";
import { ArrowRight, Phone } from "lucide-react";
import { clinic } from "@/data/clinic";

export default function FinalCTA() {
  const { openOverlay } = useOverlay();

  const handleBookClick = () => {
    trackEvent("booking_started");
    openOverlay("booking");
  };

  const handleCallbackClick = () => {
    trackEvent("booking_started");
    openOverlay("booking");
  };

  const handlePhoneClick = () => {
    trackEvent("phone_click", { source: "final-cta" });
  };

  return (
    <section id="final-cta" className="py-14 sm:py-16 bg-[#FFFFF0] text-[#111816] relative z-10 border-t border-black/8">
      <div className="container-editorial flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left Headline */}
        <div className="text-center md:text-left">
          <h2 className="text-3xl sm:text-4xl font-serif font-medium text-[#111816] tracking-tight">
            Ready when you are.
          </h2>
          <p className="text-xs sm:text-sm font-sans font-normal text-[#4A5568] mt-1">
            Take the next step when it feels right.
          </p>
        </div>

        {/* Right CTA Actions with generous breathing room */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={handleBookClick}
            className="px-8 py-4 min-h-[50px] sm:min-h-[54px] bg-[#00A89E] hover:bg-[#008C84] text-white text-xs sm:text-sm font-semibold rounded-xl transition-all duration-300 inline-flex items-center justify-center gap-2.5 cursor-pointer shadow-[0_4px_16px_rgba(0,168,158,0.28)] leading-normal"
          >
            <span>Book Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={handleCallbackClick}
            className="px-7 py-4 min-h-[50px] sm:min-h-[54px] bg-white hover:bg-[#F4FBFA] border border-black/15 text-[#111816] hover:text-[#00A89E] hover:border-[#00A89E]/40 text-xs sm:text-sm font-semibold rounded-xl transition-all duration-300 inline-flex items-center justify-center cursor-pointer shadow-xs leading-normal"
          >
            Request Callback
          </button>

          <a
            href={`tel:${clinic.phoneRaw}`}
            onClick={handlePhoneClick}
            className="text-xs sm:text-sm font-semibold text-[#111816] hover:text-[#00A89E] transition-colors inline-flex items-center gap-2 px-3 py-2"
          >
            <Phone className="w-4 h-4 text-[#00A89E]" />
            <span>{clinic.phone}</span>
          </a>
        </div>

      </div>
    </section>
  );
}
