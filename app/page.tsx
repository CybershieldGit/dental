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
          SECTIONS 1, 2 & 3: CINEMATIC SEQUENCE + OVERLAP
          Hero expands -> fixed background -> Section 2 reveals.
          Then Section 3 (Success Stories) slides up and overlaps Section 2.
          ───────────────────────────────────────────────── */}
      <CinematicHeroSequence>
        <div
          id="stack-authority"
          className="relative z-30 lg:z-40 rounded-none lg:rounded-t-[36px] bg-[#FFFFF0] shadow-[0_-16px_50px_rgba(0,0,0,0.12),0_-2px_16px_rgba(0,0,0,0.06)] overflow-hidden min-h-0 lg:min-h-screen transform-gpu [backface-visibility:hidden] [-webkit-font-smoothing:antialiased]"
          style={{
            transform: "translateZ(0)",
          }}
        >
          <CaseStudy />
        </div>
      </CinematicHeroSequence>

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
