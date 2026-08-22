import React from "react";
import { smilePlans } from "@/data/smilePlan";
import SavingsCalculator from "@/components/smile-plan/SavingsCalculator";
import { Check } from "lucide-react";

export const metadata = {
  title: "Smile Plan Membership | Advance Dental",
  description: "Affordable and transparent yearly packages offering hygiene cleanings and restorative savings.",
};

export default function SmilePlanPage() {
  return (
    <div className="pt-32 pb-24 relative bg-alabaster/95 min-h-screen">
      <div className="max-w-7xl mx-auto px-5 md:px-16 flex flex-col gap-16">
        
        {/* Header */}
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-wider text-clinical-green">Care Membership</span>
          <h1 className="text-4xl md:text-6xl font-serif text-spruce font-bold mt-2">
            Dental care you don&apos;t have to think twice about.
          </h1>
          <p className="text-base text-text-secondary leading-relaxed mt-4">
            Our Individual and Family memberships are designed to prioritize preventive hygiene while providing clear, predictable savings on major restorative care when required.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {smilePlans.map((plan) => (
            <div key={plan.id} className="bg-white border border-border/80 rounded-2xl p-6 md:p-8 flex flex-col justify-between shadow-soft hover:border-gold transition-editorial">
              <div>
                <h3 className="text-2xl font-serif text-spruce font-bold">{plan.name}</h3>
                <div className="mt-4 flex items-baseline gap-1 text-spruce">
                  <span className="text-3xl font-bold">₹{plan.monthlyPrice.toLocaleString("en-IN")}</span>
                  <span className="text-xs text-text-secondary font-medium">/ month</span>
                </div>
                <div className="text-[11px] text-text-muted mt-1">
                  Or ₹{plan.annualPrice.toLocaleString("en-IN")} billed annually
                </div>
                
                <ul className="flex flex-col gap-3 mt-8 border-t border-border/40 pt-6">
                  {plan.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-text-primary">
                      <Check className="w-4 h-4 text-clinical-green mt-0.5 shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8">
                <span className="text-xs text-text-muted block text-center mb-3">
                  No waiting periods. Activate savings instantly upon enrollment.
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Dynamic Calculator Container */}
        <SavingsCalculator />

      </div>
    </div>
  );
}
