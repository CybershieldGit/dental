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
          style={{
            position: "relative",
            zIndex: 40,
            borderRadius: "28px 28px 0 0",
            backgroundColor: "#FFFFF0",
            boxShadow: "0 -14px 70px rgba(0,0,0,0.14), 0 -2px 18px rgba(0,0,0,0.07)",
            overflow: "hidden",
            minHeight: "100vh",
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
