import React from "react";
import { smilePlans } from "@/data/smilePlan";
import SavingsCalculator from "@/components/smile-plan/SavingsCalculator";
import { Check, ShieldCheck, Sparkles } from "lucide-react";

export const metadata = {
  title: "Smile Plan Membership | AnjMohi Dental Clinic",
  description: "Affordable and transparent yearly packages offering preventive cleanings and restorative savings.",
};

export default function SmilePlanPage() {
  return (
    <div className="pt-32 sm:pt-36 pb-24 relative bg-[#FFFFF0] min-h-screen z-10 text-[#111816]">
      <div className="container-editorial w-full">
        <div className="container-inner flex flex-col gap-16 sm:gap-20">
          
          {/* Header */}
          <div className="max-w-3xl">
            <span className="text-xs sm:text-[13px] font-bold uppercase tracking-[0.16em] text-[#008C84] block mb-3">
              PREVENTIVE CARE MEMBERSHIP
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#111816] font-medium leading-[1.08] tracking-tight">
              Predictable dental care <br />
              <span className="italic font-medium text-[#00A89E]">with zero guesswork.</span>
            </h1>
            <p className="text-base sm:text-lg md:text-[19px] text-[#334155] font-sans font-normal leading-relaxed mt-4 max-w-2xl">
              Our Individual and Family memberships prioritize routine preventive hygiene while providing clear, transparent 15%–20% savings on major restorative care when required.
            </p>
          </div>

          {/* Pricing Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
            {smilePlans.map((plan, idx) => (
              <div
                key={plan.id}
                className={`rounded-2xl sm:rounded-3xl p-7 sm:p-9 flex flex-col justify-between transition-all duration-300 border ${
                  idx === 0
                    ? "bg-white border-[#00A89E] shadow-[0_12px_36px_rgba(0,168,158,0.14)] ring-2 ring-[#00A89E]/20"
                    : "bg-white/95 border-black/8 hover:border-[#00A89E]/40 hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)]"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#008C84] bg-[#E6F7F5] px-3 py-1 rounded-full">
                      {plan.id === "individual" ? "MOST POPULAR" : "FULL FAMILY COVERAGE"}
                    </span>
                    <Sparkles className="w-4 h-4 text-[#00A89E]" />
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-serif text-[#111816] font-bold">{plan.name}</h3>
                  
                  <div className="mt-4 flex items-baseline gap-1.5 text-[#111816]">
                    <span className="text-4xl sm:text-5xl font-serif font-bold text-[#111816]">
                      ₹{plan.monthlyPrice.toLocaleString("en-IN")}
                    </span>
                    <span className="text-xs sm:text-sm text-[#475569] font-medium">/ month</span>
                  </div>
                  <div className="text-xs text-[#475569] font-semibold mt-1">
                    Or ₹{plan.annualPrice.toLocaleString("en-IN")} billed annually
                  </div>
                  
                  <ul className="flex flex-col gap-3 mt-8 border-t border-black/8 pt-6">
                    {plan.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-[#1E293B] font-medium">
                        <div className="w-5 h-5 rounded-full bg-[#E6F7F5] text-[#008C84] flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <span className="leading-snug">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-6 border-t border-black/8 flex items-center gap-2 text-xs text-[#475569] font-medium">
                  <ShieldCheck className="w-4 h-4 text-[#00A89E] flex-shrink-0" />
                  <span>No waiting periods. Activate savings instantly upon enrollment.</span>
                </div>
              </div>
            ))}
          </div>

          {/* Dynamic Calculator Container */}
          <div className="rounded-3xl bg-white border border-black/8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] overflow-hidden">
            <SavingsCalculator />
          </div>

        </div>
      </div>
    </div>
  );
}
