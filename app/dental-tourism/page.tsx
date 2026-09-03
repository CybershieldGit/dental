"use client";

import React from "react";
import Image from "next/image";
import { useOverlay } from "@/components/layout/OverlayProvider";
import { trackEvent } from "@/lib/analytics";
import { ArrowRight, Plane, ShieldCheck } from "lucide-react";

export default function DentalTourismPage() {
  const { openOverlay } = useOverlay();

  const handleInquiryOpen = () => {
    trackEvent("nri_form_started");
    openOverlay("booking");
  };

  const steps = [
    { num: "01", title: "Virtual consultation", desc: "Digital scan review via video query before flying." },
    { num: "02", title: "Treatment plan", desc: "Fixed schedule & exact clinical milestone mapping." },
    { num: "03", title: "Cost estimate", desc: "Transparent all-inclusive pricing breakdown." },
    { num: "04", title: "Travel coordination", desc: "Concierge airport transfer & hotel partner alignment." },
    { num: "05", title: "Priority clinic visit", desc: "Fast-track clinical execution upon arrival." }
  ];

  return (
    <div className="pt-32 sm:pt-36 pb-24 relative bg-[#FFFFF0] min-h-screen z-10 text-[#111816]">
      <div className="container-editorial w-full">
        <div className="container-inner">
          {/* Concierge Hero: Asymmetric Split Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center mb-16 sm:mb-20">
          
          {/* Left Column */}
          <div className="lg:col-span-7 flex flex-col items-start z-10">
            <span className="text-xs sm:text-[13px] font-bold uppercase tracking-[0.16em] text-[#008C84] block mb-3">
              CONCIERGE DENTAL TOURISM
            </span>
            
            <h1 className="text-4xl sm:text-5xl lg:text-[58px] font-serif text-[#111816] font-medium leading-[1.06] tracking-tight mb-5">
              Coming to India <br />
              <span className="italic font-medium text-[#00A89E]">for dental care?</span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-[19px] text-[#334155] font-sans font-normal leading-relaxed max-w-xl mb-8">
              We align clinical appointments with your holiday itinerary to complete full-arch implants, smile redesigns, or ceramic veneers efficiently — with zero compromise on precision.
            </p>

            <button
              onClick={handleInquiryOpen}
              className="px-8 sm:px-9 py-4 min-h-[54px] bg-[#111816] hover:bg-[#00A89E] text-white font-bold rounded-full transition-all duration-300 flex items-center gap-3 cursor-pointer shadow-[0_6px_22px_rgba(0,0,0,0.15)] hover:shadow-[0_10px_30px_rgba(0,168,158,0.4)] hover:-translate-y-0.5 text-sm sm:text-base group"
            >
              <Plane className="w-4 h-4 text-[#00A89E] group-hover:text-white transition-colors" />
              <span>Plan My Treatment Visit</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-5 relative w-full h-[380px] sm:h-[440px] lg:h-[480px] rounded-[28px] sm:rounded-[36px] overflow-hidden shadow-[0_16px_48px_rgba(0,0,0,0.08)] border border-black/8 bg-slate-100">
            <Image
              src="/images/clinic-environment.jpg"
              alt="AnjMohi Dental Clinic Travel Suite"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover object-center"
            />
            <div className="absolute bottom-5 left-5 right-5 bg-white/95 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-black/8 shadow-md flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#008C84] block mb-0.5">NRI CLINICAL PROTOCOL</span>
                <span className="text-sm font-serif font-bold text-[#111816]">Fast-Track 5–7 Day Program</span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-[#E6F7F5] text-[#008C84] flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
            </div>
          </div>

        </div>

        {/* 5-Step Concierge Timeline */}
        <div className="pt-12 sm:pt-16 border-t border-black/8">
          <div className="max-w-2xl mb-10 sm:mb-12">
            <span className="text-xs sm:text-[13px] font-bold uppercase tracking-[0.16em] text-[#008C84] block mb-2">
              JOURNEY WORKFLOW
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-serif text-[#111816] font-medium leading-[1.08] tracking-tight">
              Five-Step Travel Alignment
            </h2>
            <p className="text-sm sm:text-base text-[#334155] font-sans font-normal leading-relaxed mt-2">
              From virtual 3D diagnosis to priority clinic visits and airport concierge.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5 pb-6">
            {steps.map((s) => (
              <div key={s.num} className="bg-white/95 backdrop-blur-md p-6 rounded-2xl sm:rounded-3xl border border-black/8 shadow-[0_4px_16px_rgba(0,0,0,0.03)] flex flex-col justify-between min-h-[190px] hover:border-[#00A89E]/40 hover:shadow-[0_8px_24px_rgba(0,168,158,0.1)] transition-all duration-300">
                <div>
                  <span className="font-mono text-xs font-bold text-[#008C84] bg-[#E6F7F5] px-2.5 py-1 rounded-md inline-block mb-3">
                    STEP {s.num}
                  </span>
                  <h3 className="text-base sm:text-lg font-serif text-[#111816] font-bold mb-1.5 leading-snug">
                    {s.title}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-[#334155] leading-relaxed font-sans font-normal">
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        </div>
      </div>
    </div>
  );
}
