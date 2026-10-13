"use client";

import React from "react";
import CinematicHeroSequence from "@/components/hero/CinematicHeroSequence";
import ClinicalAuthority from "@/components/doctors/ClinicalAuthority";
import CaseStudy from "@/components/cases/CaseStudy";
import TreatmentNavigator from "@/components/treatments/TreatmentNavigator";
import BlogSection from "@/components/blog/BlogSection";
import DualActionSection from "@/components/smile-plan/DualActionSection";
import FinalCTA from "@/components/ui/FinalCTA";

export default function Home() {
  return (
    <>

      {/* ─────────────────────────────────────────────────
          SECTIONS 1 & 2: CINEMATIC SEQUENCE
          Hero expands -> fixed background -> Section 2 (Diagnostics) reveals.
          ───────────────────────────────────────────────── */}
      <CinematicHeroSequence />

      {/* ─────────────────────────────────────────────────
          SECTION 3: VERIFIED SUCCESS STORIES & BEFORE-AFTER
          Interactive before/after smile comparison slider
          ───────────────────────────────────────────────── */}
      <div
        id="cases"
        className="relative z-20 bg-[#FFFFF0] shadow-[0_-16px_50px_rgba(0,0,0,0.06)]"
      >
        <CaseStudy />
      </div>

      {/* ─────────────────────────────────────────────────
          SECTIONS 4–8: 100% NORMAL DOCUMENT FLOW
          ───────────────────────────────────────────────── */}
      {/* SECTION 4: About The Doctor (sitting between Success Stories & Blogs) */}
      <div style={{ backgroundColor: "#FFFFFF", position: "relative", zIndex: 10 }}>
        <ClinicalAuthority />
      </div>

      {/* SECTION 5: Blogs & Insights */}
      <div style={{ backgroundColor: "#FFFFF0", position: "relative", zIndex: 10 }}>
        <BlogSection />
      </div>

      {/* SECTION 6: Treatment Navigator */}
      <div style={{ backgroundColor: "#FFFFFF", position: "relative", zIndex: 10 }}>
        <TreatmentNavigator />
      </div>

      {/* SECTION 7: Smile Plan & Tourism */}
      <div style={{ backgroundColor: "#FFFFF0", position: "relative", zIndex: 10 }}>
        <DualActionSection />
      </div>

      <div style={{ backgroundColor: "#111816", position: "relative", zIndex: 10 }}>
        <FinalCTA />
      </div>
    </>
  );
}
