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
    <div className="pt-24 pb-28 relative bg-ivory min-h-screen z-10">
      <div className="container-editorial w-full">
        
        {/* Concierge Hero: Asymmetric Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center mb-20">
          
          {/* Left Column */}
          <div className="lg:col-span-7 flex flex-col items-start z-10">
            <div className="section-divider mb-6" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-teal block mb-3">
              CONCIERGE DENTAL CARE
            </span>
            
            <h1 className="text-4xl md:text-5xl lg:text-[60px] font-serif text-charcoal font-medium leading-[1.05] tracking-tight mb-6">
              Coming to India<br />
              for treatment?
            </h1>
            
            <p className="text-base md:text-lg text-text-secondary leading-relaxed max-w-xl mb-8">
              We align clinical appointments with your holiday itinerary to complete full-arch restorations or veneers efficiently — with zero compromise on safety.
            </p>

            <button
              onClick={handleInquiryOpen}
              className="px-8 py-4 bg-gradient-to-r from-teal to-teal-dark hover:from-teal-dark hover:to-teal text-white font-semibold rounded-full transition-all duration-400 flex items-center gap-3 cursor-pointer shadow-[0_4px_20px_rgba(26,155,140,0.35)] text-sm"
            >
              <Plane className="w-4 h-4 text-teal-light" />
              <span>Plan my visit</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-5 relative w-full h-[400px] lg:h-[480px] rounded-3xl overflow-hidden shadow-lg border border-border-light bg-mist">
            <Image
              src="/images/clinic-environment.jpg"
              alt="AnjMohi Dental Clinic Travel Suite"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover object-center"
            />
            <div className="absolute bottom-5 left-5 right-5 glass-panel p-4 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-teal block">NRI CLINICAL PROTOCOL</span>
                <span className="text-xs text-charcoal font-semibold">Compressed 7–10 Day Execution</span>
              </div>
              <ShieldCheck className="w-5 h-5 text-teal" />
            </div>
          </div>

        </div>

        {/* 5-Step Concierge Timeline */}
        <div className="pt-16 border-t border-border-light">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-teal block mb-2">
              JOURNEY WORKFLOW
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-charcoal font-medium tracking-tight">
              Five-step travel alignment.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 border-b border-border-light pb-12">
            {steps.map((s) => (
              <div key={s.num} className="bg-white/80 backdrop-blur-sm p-5 rounded-xl border border-border-light flex flex-col">
                <span className="font-mono text-xs font-bold text-teal mb-2">
                  {s.num}
                </span>
                <h3 className="text-base font-serif text-charcoal font-semibold mb-1">
                  {s.title}
                </h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
