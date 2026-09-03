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
    <section id="savings-calculator" className="py-12 md:py-16 relative bg-[#FFFFF0]/60">
      <div className="container-editorial w-full">
        <div className="container-inner">
          {/* Editorial Header */}
          <div className="max-w-2xl mb-10 sm:mb-12">
            <span className="text-xs sm:text-[13px] font-bold uppercase tracking-[0.16em] text-[#008C84] block mb-2">
              TREATMENT SAVINGS CALCULATOR
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-serif text-[#111816] font-medium leading-[1.08] tracking-tight">
              Compare Your Care Costs
            </h2>
            <p className="text-base sm:text-lg text-[#334155] font-sans font-normal leading-relaxed mt-2.5">
              Select your planned procedure below to compare standard clinical rates against Smile Plan member rates.
            </p>
          </div>

          {/* Financial Comparison Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Treatment Selector (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-center items-start">
              <label className="text-xs font-bold uppercase tracking-wider text-[#475569] mb-3 block">
                SELECT A TREATMENT PROCEDURE
              </label>

              <div className="flex flex-col gap-2.5 w-full">
                {pricingComparisons.map((item, idx) => {
                  const isSelected = selectedTreatmentIndex === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleTreatmentChange(idx)}
                      className={`w-full text-left p-4 rounded-xl border text-sm font-bold transition-all duration-300 flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? "bg-[#111816] text-white border-[#111816] shadow-sm"
                          : "bg-white text-[#334155] border-black/8 hover:border-[#00A89E]/50 hover:bg-white"
                      }`}
                    >
                      <span>{item.treatmentName}</span>
                      {isSelected && <Check className="w-4 h-4 text-[#00A89E]" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Financial Callout Dossier (7 cols) */}
            <div className="lg:col-span-7 bg-white border border-black/8 rounded-2xl sm:rounded-3xl p-6 sm:p-10 flex flex-col shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
              
              <span className="text-xs font-bold uppercase tracking-wider text-[#008C84] mb-6 block">
                CARE BREAKDOWN · {selectedTreatment.treatmentName}
              </span>

              {/* Standard vs Member Cost Breakdown */}
              <div className="grid grid-cols-2 gap-6 pb-6 border-b border-black/8">
                <div>
                  <span className="text-xs text-[#64748B] font-bold uppercase tracking-wider block mb-1">
                    STANDARD FEE
                  </span>
                  <span className="text-2xl sm:text-3xl font-serif text-[#64748B] line-through font-normal">
                    ₹{selectedTreatment.standardCost.toLocaleString("en-IN")}
                  </span>
                </div>

                <div>
                  <span className="text-xs text-[#008C84] font-bold uppercase tracking-wider block mb-1">
                    SMILE PLAN RATE
                  </span>
                  <span className="text-2xl sm:text-3xl font-serif text-[#008C84] font-bold">
                    ₹{selectedTreatment.memberCost.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              {/* Big Savings Callout */}
              <div className="pt-6 pb-2 flex flex-col items-start">
                <span className="text-xs font-bold uppercase tracking-wider text-[#111816] mb-1">
                  ESTIMATED SAVINGS
                </span>
                <span className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#008C84] tracking-tight">
                  ₹{estimatedSavings.toLocaleString("en-IN")}
                </span>
                <p className="text-xs text-[#475569] font-medium mt-2">
                  Includes routine preventive check-ups, diagnostic scans, and member-exclusive restorative savings.
                </p>
              </div>

              {/* CTA */}
              <button
                onClick={handleBookClick}
                className="w-full py-4 min-h-[54px] bg-[#00A89E] hover:bg-[#008C84] text-white text-sm sm:text-base font-bold rounded-xl transition-all duration-300 mt-6 cursor-pointer flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(0,168,158,0.25)] hover:shadow-[0_6px_22px_rgba(0,168,158,0.4)]"
              >
                <span>Book Consultation with Smile Plan</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
