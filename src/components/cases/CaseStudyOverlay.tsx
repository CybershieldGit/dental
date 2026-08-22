"use client";

import React, { useRef, useEffect } from "react";
import { cases } from "@/data/cases";
import { useOverlay } from "../layout/OverlayProvider";
import { X, Check } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

export default function CaseStudyOverlay() {
  const { activeOverlay, activeDetailSlug, closeOverlay, openOverlay } = useOverlay();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeOverlay === "case") {
      containerRef.current?.focus();
    }
  }, [activeOverlay]);

  if (activeOverlay !== "case" || !activeDetailSlug) return null;

  const caseStudy = cases.find((c) => c.id === activeDetailSlug);
  if (!caseStudy) return null;

  const handleBookClick = () => {
    trackEvent("case_study_cta_click", { id: caseStudy.id });
    openOverlay("booking");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-spruce-deep/90 backdrop-blur-md transition-opacity duration-500"
        onClick={closeOverlay}
      />

      {/* Main Dialog Panel */}
      <div
        ref={containerRef}
        tabIndex={-1}
        className="relative w-full max-w-[900px] max-h-[90vh] bg-alabaster rounded-2xl shadow-overlay flex flex-col justify-between overflow-y-auto focus:outline-none z-10"
        role="dialog"
        aria-modal="true"
        aria-labelledby="case-overlay-title"
      >
        {/* Header */}
        <div className="p-6 md:p-8 border-b border-border flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-gold">
              Clinical Case Report
            </span>
            <h2 id="case-overlay-title" className="text-2xl md:text-3xl font-serif text-spruce font-bold mt-1">
              {caseStudy.title}
            </h2>
          </div>
          <button
            onClick={closeOverlay}
            className="p-2 text-text-secondary hover:text-spruce hover:bg-paper rounded-full transition-colors cursor-pointer"
            aria-label="Close Case Study Details"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 md:p-8 flex flex-col gap-6 text-sm text-text-primary">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-4">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-text-secondary mb-1">Patient Concern</h3>
                <p className="leading-relaxed">{caseStudy.patientConcern}</p>
              </div>

              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-text-secondary mb-1">Clinical Assessment</h3>
                <p className="leading-relaxed">{caseStudy.clinicalAssessment}</p>
              </div>

              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-text-secondary mb-1">Treatment Performed</h3>
                <p className="font-medium text-spruce">{caseStudy.treatmentPerformed}</p>
              </div>
            </div>

            <div className="flex flex-col gap-4 bg-paper p-5 rounded-xl border border-border">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-text-secondary">Summary Matrix</h3>
              <div className="flex flex-col gap-3 text-xs">
                <div className="flex justify-between border-b border-border/40 pb-2">
                  <span className="text-text-secondary font-medium">Duration:</span>
                  <span className="font-bold text-spruce">{caseStudy.duration}</span>
                </div>
                <div className="flex justify-between border-b border-border/40 pb-2">
                  <span className="text-text-secondary font-medium">Appointments:</span>
                  <span className="font-bold text-spruce">{caseStudy.appointments}</span>
                </div>
                <div className="flex justify-between border-b border-border/40 pb-2">
                  <span className="text-text-secondary font-medium">Lead Clinician:</span>
                  <span className="font-bold text-spruce">{caseStudy.doctor}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary font-medium">Clinical Technologies:</span>
                  <div className="flex flex-wrap justify-end gap-1 max-w-[60%]">
                    {caseStudy.technologyUsed.map((t) => (
                      <span key={t} className="bg-white text-text-primary px-1.5 py-0.5 rounded border border-border text-[9px]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-border pt-6">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-text-secondary mb-2">Outcome & Prognosis</h3>
            <p className="leading-relaxed bg-warm-tint/30 border border-gold/10 p-4 rounded-xl">
              {caseStudy.outcome}
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 bg-paper border-t border-border flex items-center justify-between">
          <span className="text-xs text-text-secondary">
            Interested in exploring similar dental restoration options?
          </span>
          <button
            onClick={handleBookClick}
            className="px-6 py-3 bg-spruce hover:bg-clinical-green text-alabaster text-sm font-semibold rounded-lg transition-editorial cursor-pointer"
          >
            Discuss Similar Treatment
          </button>
        </div>
      </div>
    </div>
  );
}
