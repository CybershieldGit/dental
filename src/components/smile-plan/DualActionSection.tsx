"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useOverlay } from "@/components/layout/OverlayProvider";
import { trackEvent } from "@/lib/analytics";
import { ArrowRight, Plane, CheckCircle2 } from "lucide-react";

export default function DualActionSection() {
  const { openOverlay } = useOverlay();

  // Smile Plan Calculator State
  const [selectedTreatment, setSelectedTreatment] = useState("implants");
  const [isAnnual, setIsAnnual] = useState(true);

  // NRI Form State
  const [nriSubmitted, setNriSubmitted] = useState(false);
  const [nriForm, setNriForm] = useState({
    name: "",
    country: "USA",
    email: "",
    phone: "",
    dates: "",
    message: "",
  });

  const treatmentsData: Record<string, { name: string; standard: number; plan: number }> = {
    implants: { name: "Dental Implant", standard: 40000, plan: 34000 },
    veneers: { name: "Porcelain Veneers (4 teeth)", standard: 80000, plan: 68000 },
    aligners: { name: "Clear Aligners", standard: 120000, plan: 102000 },
    rootcanal: { name: "Microscopic Root Canal", standard: 12000, plan: 10200 },
    cleaning: { name: "Full Mouth Cleanse", standard: 4000, plan: 3400 },
  };

  const currentPlan = treatmentsData[selectedTreatment] || treatmentsData.implants;
  const savings = currentPlan.standard - currentPlan.plan;

  const handleDiscussClick = () => {
    trackEvent("calculator_completed", { treatment: currentPlan.name, savings });
    openOverlay("booking");
  };

  const handleNriSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    trackEvent("nri_form_completed", { country: nriForm.country, treatment: "General Consultation" });
    setNriSubmitted(true);
  };

  return (
    <section id="smile-plan" className="py-20 md:py-28 relative z-10 border-t border-black/5">
      <div className="container-editorial w-full">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Card: Smile Plan Calculator (6 cols) */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-8 sm:p-10 shadow-[0_16px_40px_rgba(0,0,0,0.06)] border border-black/8 flex flex-col justify-between text-[#111816]">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#00A89E] block mb-2">
                SMILE PLAN
              </span>
              <h3 className="text-3xl sm:text-4xl font-serif text-[#111816] font-bold tracking-tight mb-2">
                Predictable care.<br />Meaningful savings.
              </h3>
              <p className="text-xs sm:text-sm text-[#4A5568] mb-8">
                Select a treatment to see your estimated savings.
              </p>

              {/* Treatment Dropdown */}
              <div className="mb-6">
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#718096] block mb-2">
                  Select Treatment
                </label>
                <select
                  value={selectedTreatment}
                  onChange={(e) => setSelectedTreatment(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-xl border border-black/15 bg-[#FBFBFA] text-sm font-semibold text-[#111816] focus:border-[#00A89E] focus:bg-white focus:outline-none cursor-pointer"
                >
                  <option value="implants">Dental Implant</option>
                  <option value="veneers">Porcelain Veneers (4 teeth)</option>
                  <option value="aligners">Clear Aligners</option>
                  <option value="rootcanal">Microscopic Root Canal</option>
                  <option value="cleaning">Full Mouth Cleanse</option>
                </select>
              </div>

              {/* Membership Cycle Toggle */}
              <div className="flex items-center gap-3 mb-8">
                <span className="text-xs font-semibold text-[#4A5568]">Membership cycle:</span>
                <div className="flex items-center p-1 rounded-full bg-[#EAEAEA] border border-black/5">
                  <button
                    type="button"
                    onClick={() => setIsAnnual(false)}
                    className={`px-4 py-1.5 min-h-[34px] rounded-full text-xs font-semibold transition-all inline-flex items-center justify-center cursor-pointer ${
                      !isAnnual ? "bg-white text-[#111816] shadow-xs" : "text-[#718096]"
                    }`}
                  >
                    Monthly
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsAnnual(true)}
                    className={`px-4 py-1.5 min-h-[34px] rounded-full text-xs font-semibold transition-all inline-flex items-center justify-center cursor-pointer ${
                      isAnnual ? "bg-[#00A89E] text-white shadow-xs" : "text-[#718096]"
                    }`}
                  >
                    Annual (Save 15%)
                  </button>
                </div>
              </div>

              {/* 3 Cost Output Boxes */}
              <div className="grid grid-cols-3 gap-3 p-5 rounded-2xl bg-[#F8FAF9] border border-black/8 mb-8">
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-bold text-[#718096] tracking-wider">Standard Cost</span>
                  <span className="text-xl sm:text-2xl font-serif font-bold text-[#111816] mt-1">
                    ₹{currentPlan.standard.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-[#718096] mt-0.5">Without Smile Plan</span>
                </div>

                <div className="flex flex-col border-l border-black/8 pl-3">
                  <span className="text-[10px] uppercase font-bold text-[#00A89E] tracking-wider">Smile Plan Cost</span>
                  <span className="text-xl sm:text-2xl font-serif font-bold text-[#00A89E] mt-1">
                    ₹{currentPlan.plan.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-[#718096] mt-0.5">With Membership</span>
                </div>

                <div className="flex flex-col border-l border-black/8 pl-3">
                  <span className="text-[10px] uppercase font-bold text-[#111816] tracking-wider">Estimated Savings</span>
                  <span className="text-xl sm:text-2xl font-serif font-bold text-[#111816] mt-1">
                    ₹{savings.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-[#00A89E] font-bold mt-0.5">15% Savings</span>
                </div>
              </div>
            </div>

            <div>
              <button
                onClick={handleDiscussClick}
                className="w-full py-4 px-8 min-h-[54px] bg-[#00A89E] hover:bg-[#008C84] text-white text-sm sm:text-base font-semibold rounded-xl transition-all duration-300 inline-flex items-center justify-center gap-2.5 cursor-pointer shadow-[0_4px_16px_rgba(0,168,158,0.28)] leading-normal"
              >
                <span>Discuss My Treatment Plan</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-[11px] text-center text-[#718096] mt-3">
                We typically respond within 2 hours
              </p>
            </div>
          </div>

          {/* Right Card: NRI Dental Tourism Form (6 cols) */}
          <div id="nri-tourism" className="lg:col-span-6 bg-white rounded-3xl p-8 sm:p-10 shadow-[0_16px_40px_rgba(0,0,0,0.06)] border border-black/8 flex flex-col justify-between text-[#111816]">
            <div>
              {/* Header with Airplane visual */}
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#00A89E] block mb-2">
                    NRI DENTAL TOURISM
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-serif text-[#111816] font-bold tracking-tight">
                    World-class dental care,<br />made easy for NRIs.
                  </h3>
                  <p className="text-xs text-[#4A5568] mt-2 max-w-sm">
                    Expert care. Comfortable stay. Treatment planned around your time in India.
                  </p>
                </div>

                {/* Airplane visual thumbnail */}
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shadow-md flex-shrink-0 border border-black/10">
                  <Image
                    src="/images/clinic-environment.jpg"
                    alt="Travel Concierge"
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-[#00A89E]/25 flex items-center justify-center">
                    <Plane className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>

              {/* Quick Inquiry Form */}
              {nriSubmitted ? (
                <div className="p-8 rounded-2xl bg-[#F0FAF7] border border-[#00A89E]/25 text-center my-6">
                  <CheckCircle2 className="w-10 h-10 text-[#00A89E] mx-auto mb-3" />
                  <h4 className="text-lg font-serif font-bold text-[#111816]">Inquiry Submitted!</h4>
                  <p className="text-xs text-[#4A5568] mt-1">Our International Patient Coordinator will contact you on WhatsApp shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleNriSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  <div>
                    <label className="text-[10px] uppercase font-bold text-[#718096] block mb-1">Full Name</label>
                    <input
                      type="text"
                      placeholder="Your full name"
                      required
                      value={nriForm.name}
                      onChange={(e) => setNriForm({ ...nriForm, name: e.target.value })}
                      className="w-full px-3.5 py-3 rounded-lg border border-black/15 bg-[#FBFBFA] text-xs text-[#111816] focus:border-[#00A89E] focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-bold text-[#718096] block mb-1">Country</label>
                    <select
                      value={nriForm.country}
                      onChange={(e) => setNriForm({ ...nriForm, country: e.target.value })}
                      className="w-full px-3.5 py-3 rounded-lg border border-black/15 bg-[#FBFBFA] text-xs text-[#111816] focus:border-[#00A89E] focus:bg-white focus:outline-none"
                    >
                      <option value="USA">🇺🇸 United States</option>
                      <option value="UK">🇬🇧 United Kingdom</option>
                      <option value="Canada">🇨🇦 Canada</option>
                      <option value="Australia">🇦🇺 Australia</option>
                      <option value="UAE">🇦🇪 United Arab Emirates</option>
                      <option value="Other">🌍 Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-bold text-[#718096] block mb-1">Email</label>
                    <input
                      type="email"
                      placeholder="Email address"
                      required
                      value={nriForm.email}
                      onChange={(e) => setNriForm({ ...nriForm, email: e.target.value })}
                      className="w-full px-3.5 py-3 rounded-lg border border-black/15 bg-[#FBFBFA] text-xs text-[#111816] focus:border-[#00A89E] focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-bold text-[#718096] block mb-1">WhatsApp / Phone</label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      required
                      value={nriForm.phone}
                      onChange={(e) => setNriForm({ ...nriForm, phone: e.target.value })}
                      className="w-full px-3.5 py-3 rounded-lg border border-black/15 bg-[#FBFBFA] text-xs text-[#111816] focus:border-[#00A89E] focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-[10px] uppercase font-bold text-[#718096] block mb-1">Preferred Travel Dates</label>
                    <input
                      type="text"
                      placeholder="e.g. November 2026 or Winter Holidays"
                      value={nriForm.dates}
                      onChange={(e) => setNriForm({ ...nriForm, dates: e.target.value })}
                      className="w-full px-3.5 py-3 rounded-lg border border-black/15 bg-[#FBFBFA] text-xs text-[#111816] focus:border-[#00A89E] focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2 mt-2">
                    <button
                      type="submit"
                      className="w-full py-4 px-8 min-h-[52px] bg-[#00A89E] hover:bg-[#008C84] text-white text-xs sm:text-sm font-semibold rounded-xl transition-all duration-300 inline-flex items-center justify-center gap-2.5 cursor-pointer shadow-[0_4px_16px_rgba(0,168,158,0.28)] leading-normal"
                    >
                      <span>Submit Inquiry</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Supported Countries Flags Strip */}
            <div className="pt-4 border-t border-black/8 flex items-center justify-between flex-wrap gap-2 text-[11px] text-[#718096]">
              <span className="font-semibold text-[#4A5568]">Supported Countries:</span>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1 font-medium">🇺🇸 USA</span>
                <span className="flex items-center gap-1 font-medium">🇬🇧 UK</span>
                <span className="flex items-center gap-1 font-medium">🇨🇦 Canada</span>
                <span className="flex items-center gap-1 font-medium">🇦🇺 Australia</span>
                <span className="flex items-center gap-1 font-medium">🇦🇪 UAE</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
