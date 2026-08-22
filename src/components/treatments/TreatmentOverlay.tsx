"use client";

import React, { useRef, useEffect } from "react";
import { treatments } from "@/data/treatments";
import { useOverlay } from "../layout/OverlayProvider";
import { X, Calendar, Check, ShieldCheck } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

export default function TreatmentOverlay() {
  const { activeOverlay, activeDetailSlug, closeOverlay, openOverlay } = useOverlay();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeOverlay === "treatment") {
      containerRef.current?.focus();
    }
  }, [activeOverlay]);

  if (activeOverlay !== "treatment" || !activeDetailSlug) return null;

  const treatment = treatments.find((t) => t.slug === activeDetailSlug);
  if (!treatment) return null;

  const handleBookClick = () => {
    trackEvent("booking_started");
    openOverlay("booking");
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-spruce-deep/70 backdrop-blur-sm transition-opacity duration-500"
        onClick={closeOverlay}
      />

      {/* Slide drawer panel */}
      <div
        ref={containerRef}
        tabIndex={-1}
        className="relative w-full max-w-[800px] h-full bg-alabaster shadow-overlay flex flex-col justify-between overflow-y-auto focus:outline-none"
        role="dialog"
        aria-modal="true"
        aria-labelledby="treatment-overlay-title"
      >
        {/* Header */}
        <div className="p-6 md:p-8 border-b border-border flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-clinical-green bg-clinical-green/10 px-2.5 py-1 rounded">
              {treatment.category}
            </span>
            <h2 id="treatment-overlay-title" className="text-3xl font-serif text-spruce font-bold mt-2">
              {treatment.title}
            </h2>
          </div>
          <button
            onClick={closeOverlay}
            className="p-2 text-text-secondary hover:text-spruce hover:bg-paper rounded-full transition-colors cursor-pointer"
            aria-label="Close treatment details"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 p-6 md:p-8 flex flex-col gap-8">
          <div>
            <p className="text-lg font-serif text-text-primary italic leading-relaxed">
              &ldquo;{treatment.shortDescription}&rdquo;
            </p>
          </div>

          {/* Section: Who it is for */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-text-secondary">Who it is for</h3>
            <ul className="flex flex-col gap-2.5 text-sm text-text-primary">
              {treatment.whoItIsFor.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <Check className="w-4.5 h-4.5 text-clinical-green mt-0.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Section: Clinical Steps */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-text-secondary">The Clinical Steps</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {treatment.steps.map((step, idx) => (
                <div key={idx} className="bg-paper border border-border/80 rounded-xl p-4 flex gap-3.5">
                  <span className="text-lg font-serif font-bold text-gold shrink-0">0{idx + 1}</span>
                  <div>
                    <h4 className="text-sm font-bold text-spruce mb-1">{step.title}</h4>
                    <p className="text-xs text-text-secondary leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Quick specs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-b border-border py-6 my-2 text-sm">
            <div>
              <span className="text-xs text-text-secondary block mb-1">Expected Timeline</span>
              <span className="font-semibold text-text-primary">{treatment.timeline}</span>
            </div>
            <div>
              <span className="text-xs text-text-secondary block mb-1">Lead Specialist</span>
              <span className="font-semibold text-text-primary">{treatment.doctor}</span>
            </div>
            <div>
              <span className="text-xs text-text-secondary block mb-1">Modern Technology</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {treatment.technologies.map((t) => (
                  <span key={t} className="text-[10px] bg-paper text-text-primary border border-border px-1.5 py-0.5 rounded">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-warm-tint/50 border border-gold/10 rounded-xl p-4 flex gap-3 text-xs text-text-secondary">
            <ShieldCheck className="w-5 h-5 text-gold shrink-0 mt-0.5" />
            <p>
              Note: Estimated investment ranges from <span className="font-semibold text-text-primary">{treatment.estimatedCostRange}</span>. 
              Actual diagnostic parameters and treatment requirements will be determined during physical consultation.
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 bg-paper border-t border-border flex items-center justify-between">
          <div className="text-xs text-text-secondary">
            Questions? Call us or book online.
          </div>
          <button
            onClick={handleBookClick}
            className="px-6 py-3 bg-spruce hover:bg-clinical-green text-alabaster text-sm font-semibold rounded-lg transition-editorial cursor-pointer"
          >
            Request Provisional Slot
          </button>
        </div>
      </div>
    </div>
  );
}
