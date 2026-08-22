"use client";

import React, { useState } from "react";
import { smilePlans, pricingComparisons } from "@/data/smilePlan";
import { useOverlay } from "../layout/OverlayProvider";
import { trackEvent } from "@/lib/analytics";
import { ArrowRight, Check } from "lucide-react";

export default function SavingsCalculator() {
  const { openOverlay } = useOverlay();
  const [selectedTreatmentIndex, setSelectedTreatmentIndex] = useState(0);

  const selectedTreatment = pricingComparisons[selectedTreatmentIndex];
  const estimatedSavings = selectedTreatment.standardCost - selectedTreatment.memberCost;

  const handleTreatmentChange = (idx: number) => {
    setSelectedTreatmentIndex(idx);
    trackEvent("calculator_completed", {
      treatment: pricingComparisons[idx].treatmentName,
      savings: pricingComparisons[idx].standardCost - pricingComparisons[idx].memberCost,
    });
  };

  const handleBookClick = () => {
    trackEvent("booking_started");
    openOverlay("booking");
  };

  return (
    <section id="savings-calculator" className="py-20 md:py-28 relative bg-paper">
      <div className="container-editorial w-full">
        
        {/* Editorial Header */}
        <div className="max-w-2xl mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-clinical-green block mb-2">
            MEMBERSHIP CARE & PRICING
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-spruce-deep font-normal tracking-tight">
            A simpler way to stay on top of your dental care.
          </h2>
          <p className="text-base md:text-lg text-text-secondary font-medium mt-3">
            I know what my dental care costs. Select your planned treatment below to compare standard rates against Smile Plan member coverage.
          </p>
        </div>

        {/* Financial Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left Column: Treatment Selector (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-center items-start">
            <label className="text-xs font-bold uppercase tracking-widest text-text-muted mb-3 block">
              SELECT YOUR TREATMENT
            </label>

            <div className="flex flex-col gap-2.5 w-full">
              {pricingComparisons.map((item, idx) => {
                const isSelected = selectedTreatmentIndex === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => handleTreatmentChange(idx)}
                    className={`w-full text-left p-4 rounded-xl border text-sm font-semibold transition-all duration-300 flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? "bg-spruce-deep text-alabaster border-spruce-deep shadow-sm"
                        : "bg-alabaster text-text-primary border-border/70 hover:border-spruce-deep/50"
                    }`}
                  >
                    <span>{item.treatmentName}</span>
                    {isSelected && <Check className="w-4 h-4 text-gold" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Premium Financial Callout Dossier (7 cols) */}
          <div className="lg:col-span-7 bg-alabaster border border-border/70 rounded-2xl p-8 md:p-12 flex flex-col shadow-soft">
            
            <span className="text-[11px] font-bold uppercase tracking-widest text-clinical-green mb-6 block">
              ESTIMATED CARE COMPARISON · {selectedTreatment.treatmentName}
            </span>

            {/* Standard vs Member Cost Breakdown */}
            <div className="grid grid-cols-2 gap-8 pb-8 border-b border-border/60">
              <div>
                <span className="text-xs text-text-muted font-medium uppercase tracking-wider block mb-1">
                  STANDARD CARE
                </span>
                <span className="text-2xl md:text-3xl font-serif text-text-muted line-through font-normal">
                  ₹{selectedTreatment.standardCost.toLocaleString("en-IN")}
                </span>
              </div>

              <div>
                <span className="text-xs text-clinical-green font-semibold uppercase tracking-wider block mb-1">
                  SMILE PLAN RATE
                </span>
                <span className="text-2xl md:text-3xl font-serif text-spruce-deep font-bold">
                  ₹{selectedTreatment.memberCost.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            {/* Big Savings Callout */}
            <div className="pt-8 pb-4 flex flex-col items-start">
              <span className="text-xs font-bold uppercase tracking-widest text-gold mb-1">
                YOU SAVE
              </span>
              <span className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-clinical-green tracking-tight">
                ₹{estimatedSavings.toLocaleString("en-IN")}
              </span>
              <p className="text-xs text-text-muted mt-2">
                Includes routine preventive care check-ups, 3D CBCT diagnostic scans, and member-exclusive discounts.
              </p>
            </div>

            {/* CTA */}
            <button
              onClick={handleBookClick}
              className="w-full py-4 bg-spruce-deep hover:bg-spruce text-alabaster text-sm font-semibold rounded-lg transition-editorial mt-8 cursor-pointer flex items-center justify-center gap-2 shadow-sm"
            >
              <span>Book Consultation with Smile Plan</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </div>

        </div>

      </div>
    </section>
  );
}
