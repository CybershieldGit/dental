import React from "react";
import { doctors as docsList } from "@/data/doctors";
import ClinicalAuthority from "@/components/doctors/ClinicalAuthority";
import DoctorsGrid from "@/components/doctors/DoctorsGrid";

export const metadata = {
  title: "About Our Clinic & Doctors | AnjMohi Dental Clinic",
  description: "Learn about our clinical philosophy, sterilization compliance, and treatment infrastructure.",
};

export default function AboutPage() {
  return (
    <div className="pt-24 pb-24 relative bg-ivory min-h-screen z-10">
      <div className="container-editorial">
        <div className="container-inner flex flex-col gap-16">
        
        {/* Intro */}
        <div className="max-w-3xl">
          <div className="section-divider mb-6" />
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-teal">About AnjMohi</span>
          <h1 className="text-4xl md:text-6xl font-serif text-charcoal font-medium mt-3 tracking-tight">
            Clinical mastery, compassionate care.
          </h1>
          <p className="text-base md:text-lg text-text-secondary leading-relaxed mt-4">
            Founded with the belief that premium dental care should be defined by transparency and stress-free patient journeys, AnjMohi Dental Clinic brings top-tier implantology, aesthetics, orthodontics, and general restoration workflows to Gurugram.
          </p>
        </div>

        {/* Philosophy details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-border-light pt-12">
          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 border border-border-light shadow-sm flex flex-col gap-3">
            <h3 className="text-xl font-serif text-charcoal font-semibold">Infection Containment & Sterilization</h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              We employ Class-B autoclaves to perform vacuum sterilization on all instruments. Diagnostic tips and active surgical templates are tracked through individualized batch logs, ensuring zero threat of cross-infection.
            </p>
          </div>
          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 border border-border-light shadow-sm flex flex-col gap-3">
            <h3 className="text-xl font-serif text-charcoal font-semibold">Minimally Invasive Diagnostics</h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              Our 3D Cone Beam CT scans capture high-resolution bone metrics at minimal exposure levels. Digital mockups allow us to show proposed changes and alignment outcomes before any clinical modification begins.
            </p>
          </div>
        </div>

        {/* Clinical Authority Section */}
        <ClinicalAuthority />

        {/* Doctors Grid Section */}
        <DoctorsGrid />

        </div>
      </div>
    </div>
  );
}
