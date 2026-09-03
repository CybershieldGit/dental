import React from "react";
import { doctors as docsList } from "@/data/doctors";
import ClinicalAuthority from "@/components/doctors/ClinicalAuthority";
import DoctorsGrid from "@/components/doctors/DoctorsGrid";
import { ShieldCheck, Sparkles, Award, HeartHandshake } from "lucide-react";

export const metadata = {
  title: "About Our Clinic & Doctors | AnjMohi Dental Clinic",
  description: "Learn about our clinical philosophy, sterilization compliance, and treatment infrastructure.",
};

export default function AboutPage() {
  return (
    <div className="pt-32 sm:pt-36 pb-24 relative bg-[#FFFFF0] min-h-screen z-10 text-[#111816]">
      <div className="container-editorial">
        <div className="container-inner flex flex-col gap-16 sm:gap-20">
        
        {/* Intro Header */}
        <div className="max-w-3xl">
          <span className="text-xs sm:text-[13px] font-bold uppercase tracking-[0.16em] text-[#008C84] block mb-3">
            ABOUT ANJMOHI DENTAL CLINIC
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#111816] font-medium leading-[1.08] tracking-tight">
            Clinical mastery, <br />
            <span className="italic font-medium text-[#00A89E]">compassionate</span> patient care.
          </h1>
          <p className="text-base sm:text-lg md:text-[19px] text-[#334155] font-sans font-normal leading-relaxed mt-5 max-w-2xl">
            Founded with the belief that premium dental care should be defined by precision, transparency, and stress-free patient journeys, AnjMohi Dental Clinic brings boutique dentistry, advanced implantology, and smile redesign to Gurugram.
          </p>
        </div>

        {/* 4 Pillars of Excellence Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white/95 rounded-2xl p-6 border border-black/8 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#E6F7F5] text-[#008C84] flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif text-[#111816] font-bold mb-2">Class-B Sterilization</h3>
              <p className="text-xs sm:text-[13px] text-[#334155] leading-relaxed">
                Hospital-grade vacuum sterilization protocols with individualized batch tracking on every surgical instrument.
              </p>
            </div>
          </div>

          <div className="bg-white/95 rounded-2xl p-6 border border-black/8 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#E6F7F5] text-[#008C84] flex items-center justify-center mb-4">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif text-[#111816] font-bold mb-2">3D CBCT Diagnostics</h3>
              <p className="text-xs sm:text-[13px] text-[#334155] leading-relaxed">
                Ultra-low radiation 3D cone beam scans capturing sub-millimeter anatomical detail with zero guesswork.
              </p>
            </div>
          </div>

          <div className="bg-white/95 rounded-2xl p-6 border border-black/8 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#E6F7F5] text-[#008C84] flex items-center justify-center mb-4">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif text-[#111816] font-bold mb-2">Artisanal Ceramics</h3>
              <p className="text-xs sm:text-[13px] text-[#334155] leading-relaxed">
                Custom hand-layered feldspathic veneers and bio-compatible monolithic zirconia for natural translucency.
              </p>
            </div>
          </div>

          <div className="bg-white/95 rounded-2xl p-6 border border-black/8 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#E6F7F5] text-[#008C84] flex items-center justify-center mb-4">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif text-[#111816] font-bold mb-2">Gentle & Painless</h3>
              <p className="text-xs sm:text-[13px] text-[#334155] leading-relaxed">
                Minimally invasive laser contouring, calming boutique atmosphere, and patient-first comfort protocols.
              </p>
            </div>
          </div>
        </div>

        {/* Clinical Authority Section */}
        <div className="rounded-3xl bg-white border border-black/8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] overflow-hidden">
          <ClinicalAuthority />
        </div>

        {/* Doctors Grid Section */}
        <DoctorsGrid />

        </div>
      </div>
    </div>
  );
}
