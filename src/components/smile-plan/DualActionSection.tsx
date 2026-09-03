"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useOverlay } from "@/components/layout/OverlayProvider";
import { trackEvent } from "@/lib/analytics";
import {
  ArrowRight,
  Plane,
  CheckCircle2,
  ChevronDown,
  Check,
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  X,
  Sparkles,
} from "lucide-react";

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const WEEKDAY_NAMES = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export default function DualActionSection() {
  const { openOverlay } = useOverlay();

  // Smile Plan Calculator State
  const [selectedTreatment, setSelectedTreatment] = useState("implants");
  const [treatmentDropdownOpen, setTreatmentDropdownOpen] = useState(false);
  const [isAnnual, setIsAnnual] = useState(true);

  // NRI Form State
  const [nriSubmitted, setNriSubmitted] = useState(false);
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [calendarPlacement, setCalendarPlacement] = useState<"top" | "bottom">("top");
  const [calendarMonthDate, setCalendarMonthDate] = useState(() => new Date());

  const [nriForm, setNriForm] = useState({
    name: "",
    country: "USA",
    email: "",
    phone: "",
    dates: "",
    message: "",
  });

  const treatmentRef = useRef<HTMLDivElement>(null);
  const countryRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);

  // Dynamic Viewport Placement Calculation
  const updateCalendarPlacement = () => {
    if (calendarRef.current) {
      const rect = calendarRef.current.getBoundingClientRect();
      const popoverHeight = 310; // Approximate height of calendar popover in px
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;

      // If space below is sufficient (with margin), open downward; otherwise if space above is sufficient, open upward
      if (spaceBelow >= popoverHeight) {
        setCalendarPlacement("bottom");
      } else if (spaceAbove >= popoverHeight) {
        setCalendarPlacement("top");
      } else {
        // Fallback: place on whichever side has more room
        setCalendarPlacement(spaceBelow > spaceAbove ? "bottom" : "top");
      }
    }
  };

  // Update placement on resize and scroll when calendar is open
  useEffect(() => {
    if (calendarOpen) {
      updateCalendarPlacement();
      window.addEventListener("resize", updateCalendarPlacement, { passive: true });
      window.addEventListener("scroll", updateCalendarPlacement, { passive: true });
      return () => {
        window.removeEventListener("resize", updateCalendarPlacement);
        window.removeEventListener("scroll", updateCalendarPlacement);
      };
    }
  }, [calendarOpen]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (treatmentRef.current && !treatmentRef.current.contains(event.target as Node)) {
        setTreatmentDropdownOpen(false);
      }
      if (countryRef.current && !countryRef.current.contains(event.target as Node)) {
        setCountryDropdownOpen(false);
      }
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setCalendarOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setTreatmentDropdownOpen(false);
        setCountryDropdownOpen(false);
        setCalendarOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const treatmentsData: Record<string, { name: string; standard: number; plan: number }> = {
    implants: { name: "Dental Implant", standard: 40000, plan: 34000 },
    veneers: { name: "Porcelain Veneers (4 teeth)", standard: 80000, plan: 68000 },
    aligners: { name: "Clear Aligners", standard: 120000, plan: 102000 },
    rootcanal: { name: "Microscopic Root Canal", standard: 12000, plan: 10200 },
    cleaning: { name: "Full Mouth Cleanse", standard: 4000, plan: 3400 },
  };

  const countryOptions: { code: string; label: string; flag: string }[] = [
    { code: "USA", label: "United States", flag: "🇺🇸" },
    { code: "UK", label: "United Kingdom", flag: "🇬🇧" },
    { code: "Canada", label: "Canada", flag: "🇨🇦" },
    { code: "Australia", label: "Australia", flag: "🇦🇺" },
    { code: "UAE", label: "United Arab Emirates", flag: "🇦🇪" },
    { code: "Other", label: "Other", flag: "🌍" },
  ];

  // Calendar Calculation Helpers
  const year = calendarMonthDate.getFullYear();
  const month = calendarMonthDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay();

  const handlePrevMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCalendarMonthDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCalendarMonthDate(new Date(year, month + 1, 1));
  };

  const handleSelectDay = (day: number) => {
    const formatted = `${MONTH_NAMES[month]} ${day}, ${year}`;
    setNriForm({ ...nriForm, dates: formatted });
    setCalendarOpen(false);
  };

  const handleSelectPreset = (preset: string) => {
    setNriForm({ ...nriForm, dates: preset });
    setCalendarOpen(false);
  };

  const handleClearDates = (e: React.MouseEvent) => {
    e.stopPropagation();
    setNriForm({ ...nriForm, dates: "" });
  };

  const currentPlan = treatmentsData[selectedTreatment] || treatmentsData.implants;
  const savings = currentPlan.standard - currentPlan.plan;
  const selectedCountryObj = countryOptions.find((c) => c.code === nriForm.country) || countryOptions[0];

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
    <section id="smile-plan" className="min-h-screen flex flex-col justify-center py-12 sm:py-16 lg:py-20 relative z-10 border-t border-black/5">
      <div className="container-editorial w-full my-auto">
        <div className="container-inner">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          
          {/* Left Card: Smile Plan Calculator (6 cols) */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-8 sm:p-10 lg:p-11 shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-slate-200/80 flex flex-col justify-between text-[#0F172A] relative">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-[#008C84] bg-[#00A89E]/10 border border-[#00A89E]/20 mb-3">
                SMILE PLAN
              </span>
              <h3 className="text-3xl sm:text-4xl font-serif text-[#0F172A] font-bold tracking-tight mb-2.5 leading-tight">
                Predictable care.<br />Meaningful savings.
              </h3>
              <p className="text-sm sm:text-base text-[#475569] mb-7 leading-relaxed">
                Select a treatment to see your estimated savings.
              </p>

              {/* Treatment Custom Dropdown */}
              <div className="mb-6 relative" ref={treatmentRef}>
                <label className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#334155] block mb-2">
                  Select Treatment
                </label>
                <button
                  type="button"
                  onClick={() => setTreatmentDropdownOpen(!treatmentDropdownOpen)}
                  aria-haspopup="listbox"
                  aria-expanded={treatmentDropdownOpen}
                  className={`w-full px-4 py-3.5 rounded-xl border bg-white text-sm sm:text-base font-semibold text-[#0F172A] flex items-center justify-between transition-all duration-200 cursor-pointer shadow-xs ${
                    treatmentDropdownOpen
                      ? "border-[#00A89E] ring-2 ring-[#00A89E]/20 shadow-sm"
                      : "border-slate-300 hover:border-slate-400"
                  }`}
                >
                  <span className="truncate">{currentPlan.name}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#64748B] transition-transform duration-200 flex-shrink-0 ${
                      treatmentDropdownOpen ? "rotate-180 text-[#00A89E]" : ""
                    }`}
                  />
                </button>

                {treatmentDropdownOpen && (
                  <div
                    role="listbox"
                    className="absolute left-0 right-0 top-full mt-2 z-50 bg-white rounded-xl border border-slate-200 shadow-[0_16px_40px_rgba(0,0,0,0.14)] py-1.5 overflow-hidden animate-in fade-in zoom-in-95 duration-150"
                  >
                    {Object.entries(treatmentsData).map(([key, item]) => {
                      const isSelected = selectedTreatment === key;
                      return (
                        <button
                          key={key}
                          type="button"
                          role="option"
                          aria-selected={isSelected}
                          onClick={() => {
                            setSelectedTreatment(key);
                            setTreatmentDropdownOpen(false);
                          }}
                          className={`w-full px-4 py-3 text-left text-sm sm:text-base font-medium flex items-center justify-between transition-colors cursor-pointer ${
                            isSelected
                              ? "bg-[#00A89E]/10 text-[#008C84] font-bold"
                              : "text-[#0F172A] hover:bg-[#F8FAFC]"
                          }`}
                        >
                          <span>{item.name}</span>
                          {isSelected && <Check className="w-5 h-5 text-[#008C84] flex-shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Membership Cycle Toggle */}
              <div className="flex items-center gap-3.5 mb-8 flex-wrap">
                <span className="text-sm font-bold text-[#334155]">Membership cycle:</span>
                <div className="flex items-center p-1 rounded-full bg-slate-100 border border-slate-200">
                  <button
                    type="button"
                    onClick={() => setIsAnnual(false)}
                    className={`px-4 sm:px-5 py-2 min-h-[38px] rounded-full text-xs sm:text-sm font-bold transition-all inline-flex items-center justify-center cursor-pointer ${
                      !isAnnual ? "bg-white text-[#0F172A] shadow-xs" : "text-[#64748B] hover:text-[#0F172A]"
                    }`}
                  >
                    Monthly
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsAnnual(true)}
                    className={`px-4 sm:px-5 py-2 min-h-[38px] rounded-full text-xs sm:text-sm font-bold transition-all inline-flex items-center justify-center cursor-pointer ${
                      isAnnual ? "bg-[#00A89E] text-white shadow-xs" : "text-[#64748B] hover:text-[#0F172A]"
                    }`}
                  >
                    Annual (Save 15%)
                  </button>
                </div>
              </div>

              {/* 3 Cost Output Boxes */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4 p-5 sm:p-6 rounded-2xl bg-[#F8FAFC] border border-slate-200 mb-8 shadow-xs">
                <div className="flex flex-col">
                  <span className="text-xs uppercase font-bold text-[#475569] tracking-wider">Standard Cost</span>
                  <span className="text-2xl sm:text-3xl font-serif font-bold text-[#0F172A] mt-1.5">
                    ₹{currentPlan.standard.toLocaleString()}
                  </span>
                  <span className="text-xs sm:text-[12.5px] text-[#475569] mt-1 font-semibold">Without Smile Plan</span>
                </div>

                <div className="flex flex-col border-l border-slate-200 pl-3 sm:pl-4">
                  <span className="text-xs uppercase font-bold text-[#008C84] tracking-wider">Smile Plan Cost</span>
                  <span className="text-2xl sm:text-3xl font-serif font-bold text-[#008C84] mt-1.5">
                    ₹{currentPlan.plan.toLocaleString()}
                  </span>
                  <span className="text-xs sm:text-[12.5px] text-[#008C84] mt-1 font-bold">With Membership</span>
                </div>

                <div className="flex flex-col border-l border-slate-200 pl-3 sm:pl-4">
                  <span className="text-xs uppercase font-bold text-[#0F172A] tracking-wider">Estimated Savings</span>
                  <span className="text-2xl sm:text-3xl font-serif font-bold text-[#0F172A] mt-1.5">
                    ₹{savings.toLocaleString()}
                  </span>
                  <span className="inline-flex items-center text-xs font-bold text-[#008C84] bg-[#00A89E]/15 px-2.5 py-0.5 rounded-md mt-1 w-fit">
                    15% Savings
                  </span>
                </div>
              </div>
            </div>

            <div>
              <button
                onClick={handleDiscussClick}
                className="w-full py-4 px-8 min-h-[56px] bg-[#00A89E] hover:bg-[#008C84] text-white text-base font-bold rounded-xl transition-all duration-300 inline-flex items-center justify-center gap-2.5 cursor-pointer shadow-[0_6px_20px_rgba(0,168,158,0.28)] hover:shadow-[0_8px_25px_rgba(0,168,158,0.38)] leading-normal"
              >
                <span>Discuss My Treatment Plan</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <p className="text-xs sm:text-[13px] font-semibold text-center text-[#475569] mt-3">
                We typically respond within 2 hours
              </p>
            </div>
          </div>

          {/* Right Card: NRI Dental Tourism Form (6 cols) */}
          <div id="nri-tourism" className="lg:col-span-6 bg-white rounded-3xl p-8 sm:p-10 lg:p-11 shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-slate-200/80 flex flex-col justify-between text-[#0F172A] relative">
            <div>
              {/* Header with Airplane visual */}
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-[#008C84] bg-[#00A89E]/10 border border-[#00A89E]/20 mb-3">
                    NRI DENTAL TOURISM
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-serif text-[#0F172A] font-bold tracking-tight leading-snug">
                    World-class dental care,<br />made easy for NRIs.
                  </h3>
                  <p className="text-sm text-[#475569] mt-2 leading-relaxed max-w-sm">
                    Expert care. Comfortable stay. Treatment planned around your time in India.
                  </p>
                </div>

                {/* Airplane visual thumbnail */}
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shadow-md flex-shrink-0 border border-slate-200">
                  <Image
                    src="/images/clinic-environment.jpg"
                    alt="Travel Concierge"
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-[#00A89E]/30 flex items-center justify-center backdrop-blur-[1px]">
                    <Plane className="w-7 h-7 text-white drop-shadow" />
                  </div>
                </div>
              </div>

              {/* Quick Inquiry Form */}
              {nriSubmitted ? (
                <div className="p-8 rounded-2xl bg-[#F0FAF7] border border-[#00A89E]/30 text-center my-6">
                  <CheckCircle2 className="w-12 h-12 text-[#00A89E] mx-auto mb-3" />
                  <h4 className="text-xl font-serif font-bold text-[#0F172A]">Inquiry Submitted!</h4>
                  <p className="text-sm text-[#475569] mt-1.5 font-medium">Our International Patient Coordinator will contact you on WhatsApp shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleNriSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-[#334155] block mb-1.5">Full Name</label>
                    <input
                      type="text"
                      placeholder="Your full name"
                      required
                      value={nriForm.name}
                      onChange={(e) => setNriForm({ ...nriForm, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-sm font-medium text-[#0F172A] placeholder:text-[#94A3B8] focus:border-[#00A89E] focus:ring-2 focus:ring-[#00A89E]/20 focus:outline-none shadow-xs transition-all"
                    />
                  </div>

                  {/* Country Custom Dropdown */}
                  <div className="relative" ref={countryRef}>
                    <label className="text-xs font-bold uppercase tracking-wider text-[#334155] block mb-1.5">Country</label>
                    <button
                      type="button"
                      onClick={() => setCountryDropdownOpen(!countryDropdownOpen)}
                      aria-haspopup="listbox"
                      aria-expanded={countryDropdownOpen}
                      className={`w-full px-4 py-3 rounded-xl border bg-white text-sm font-medium text-[#0F172A] flex items-center justify-between transition-all duration-200 cursor-pointer shadow-xs ${
                        countryDropdownOpen
                          ? "border-[#00A89E] ring-2 ring-[#00A89E]/20 shadow-sm"
                          : "border-slate-300 hover:border-slate-400"
                      }`}
                    >
                      <span className="flex items-center gap-2 truncate">
                        <span className="text-base">{selectedCountryObj.flag}</span>
                        <span className="font-semibold">{selectedCountryObj.label}</span>
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#64748B] transition-transform duration-200 flex-shrink-0 ${
                          countryDropdownOpen ? "rotate-180 text-[#00A89E]" : ""
                        }`}
                      />
                    </button>

                    {countryDropdownOpen && (
                      <div
                        role="listbox"
                        className="absolute left-0 right-0 top-full mt-2 z-50 bg-white rounded-xl border border-slate-200 shadow-[0_16px_40px_rgba(0,0,0,0.14)] py-1.5 overflow-hidden animate-in fade-in zoom-in-95 duration-150 max-h-60 overflow-y-auto"
                      >
                        {countryOptions.map((country) => {
                          const isSelected = nriForm.country === country.code;
                          return (
                            <button
                              key={country.code}
                              type="button"
                              role="option"
                              aria-selected={isSelected}
                              onClick={() => {
                                setNriForm({ ...nriForm, country: country.code });
                                setCountryDropdownOpen(false);
                              }}
                              className={`w-full px-4 py-2.5 text-left text-sm flex items-center justify-between transition-colors cursor-pointer ${
                                isSelected
                                  ? "bg-[#00A89E]/10 text-[#008C84] font-bold"
                                  : "text-[#0F172A] hover:bg-[#F8FAFC]"
                              }`}
                            >
                              <span className="flex items-center gap-2.5">
                                <span className="text-base">{country.flag}</span>
                                <span className="font-medium">{country.label}</span>
                              </span>
                              {isSelected && <Check className="w-4 h-4 text-[#008C84] flex-shrink-0" />}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-[#334155] block mb-1.5">Email</label>
                    <input
                      type="email"
                      placeholder="Email address"
                      required
                      value={nriForm.email}
                      onChange={(e) => setNriForm({ ...nriForm, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-sm font-medium text-[#0F172A] placeholder:text-[#94A3B8] focus:border-[#00A89E] focus:ring-2 focus:ring-[#00A89E]/20 focus:outline-none shadow-xs transition-all"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-[#334155] block mb-1.5">WhatsApp / Phone</label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      required
                      value={nriForm.phone}
                      onChange={(e) => setNriForm({ ...nriForm, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-sm font-medium text-[#0F172A] placeholder:text-[#94A3B8] focus:border-[#00A89E] focus:ring-2 focus:ring-[#00A89E]/20 focus:outline-none shadow-xs transition-all"
                    />
                  </div>

                  {/* Preferred Travel Dates Custom Calendar Dropdown */}
                  <div className="sm:col-span-2 relative" ref={calendarRef}>
                    <label className="text-xs font-bold uppercase tracking-wider text-[#334155] block mb-1.5">
                      Preferred Travel Dates
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        if (!calendarOpen) {
                          updateCalendarPlacement();
                        }
                        setCalendarOpen(!calendarOpen);
                      }}
                      aria-haspopup="dialog"
                      aria-expanded={calendarOpen}
                      className={`w-full px-4 py-3 rounded-xl border bg-white text-sm font-medium text-[#0F172A] flex items-center justify-between transition-all duration-200 cursor-pointer shadow-xs ${
                        calendarOpen
                          ? "border-[#00A89E] ring-2 ring-[#00A89E]/20 shadow-sm"
                          : "border-slate-300 hover:border-slate-400"
                      }`}
                    >
                      <span className="flex items-center gap-2.5 truncate">
                        <CalendarIcon className="w-4 h-4 text-[#00A89E] flex-shrink-0" />
                        {nriForm.dates ? (
                          <span className="font-semibold text-[#0F172A]">{nriForm.dates}</span>
                        ) : (
                          <span className="text-[#94A3B8]">Select travel month or date</span>
                        )}
                      </span>

                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        {nriForm.dates && (
                          <span
                            role="button"
                            onClick={handleClearDates}
                            title="Clear date"
                            className="p-1 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
                          >
                            <X className="w-3.5 h-3.5" />
                          </span>
                        )}
                        <ChevronDown
                          className={`w-4 h-4 text-[#64748B] transition-transform duration-200 ${
                            calendarOpen ? "rotate-180 text-[#00A89E]" : ""
                          }`}
                        />
                      </div>
                    </button>

                    {/* Calendar Popover - Dynamically positioned based on viewport availability */}
                    {calendarOpen && (
                      <div
                        className={`absolute left-0 right-0 z-50 bg-white rounded-2xl border border-slate-200 shadow-[0_20px_50px_rgba(0,0,0,0.16)] p-3.5 sm:p-4 duration-150 animate-in fade-in ${
                          calendarPlacement === "bottom"
                            ? "top-full mt-2 slide-in-from-top-2"
                            : "bottom-full mb-2.5 slide-in-from-bottom-2"
                        }`}
                      >
                        {/* Quick NRI Season Presets */}
                        <div className="mb-3">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] block mb-1.5">
                            Popular Travel Windows
                          </span>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                            {[
                              "Next Month",
                              "Winter Holidays",
                              "Spring 2027",
                              "Flexible Dates",
                            ].map((preset) => (
                              <button
                                key={preset}
                                type="button"
                                onClick={() => handleSelectPreset(preset)}
                                className={`px-2 py-1.5 rounded-lg text-xs font-semibold border transition-all text-center cursor-pointer truncate ${
                                  nriForm.dates === preset
                                    ? "bg-[#00A89E] text-white border-[#00A89E] shadow-xs"
                                    : "bg-slate-50 border-slate-200 text-[#334155] hover:bg-slate-100 hover:border-slate-300"
                                }`}
                              >
                                {preset}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="pt-2.5 border-t border-slate-100">
                          {/* Month & Year Navigation Header */}
                          <div className="flex items-center justify-between mb-2">
                            <button
                              type="button"
                              onClick={handlePrevMonth}
                              className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors cursor-pointer"
                            >
                              <ChevronLeft className="w-3.5 h-3.5" />
                            </button>

                            <span className="text-xs sm:text-sm font-bold text-[#0F172A]">
                              {MONTH_NAMES[month]} {year}
                            </span>

                            <button
                              type="button"
                              onClick={handleNextMonth}
                              className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors cursor-pointer"
                            >
                              <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {/* Weekday Labels */}
                          <div className="grid grid-cols-7 gap-1 text-center mb-1">
                            {WEEKDAY_NAMES.map((d) => (
                              <span key={d} className="text-[10px] font-bold uppercase text-[#94A3B8] py-0.5">
                                {d}
                              </span>
                            ))}
                          </div>

                          {/* Days Grid */}
                          <div className="grid grid-cols-7 gap-1">
                            {/* Empty prefix slots */}
                            {Array.from({ length: firstDayIndex }).map((_, i) => (
                              <div key={`empty-${i}`} className="h-7" />
                            ))}

                            {/* Month Days */}
                            {Array.from({ length: daysInMonth }).map((_, i) => {
                              const dayNum = i + 1;
                              const formatted = `${MONTH_NAMES[month]} ${dayNum}, ${year}`;
                              const isSelected = nriForm.dates === formatted;

                              return (
                                <button
                                  key={dayNum}
                                  type="button"
                                  onClick={() => handleSelectDay(dayNum)}
                                  className={`h-7 w-full rounded-lg text-xs font-semibold flex items-center justify-center transition-all cursor-pointer ${
                                    isSelected
                                      ? "bg-[#00A89E] text-white shadow-xs font-bold"
                                      : "text-[#1E293B] hover:bg-[#00A89E]/15 hover:text-[#008C84]"
                                  }`}
                                >
                                  {dayNum}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="sm:col-span-2 mt-2">
                    <button
                      type="submit"
                      className="w-full py-4 px-8 min-h-[54px] bg-[#00A89E] hover:bg-[#008C84] text-white text-sm sm:text-base font-bold rounded-xl transition-all duration-300 inline-flex items-center justify-center gap-2.5 cursor-pointer shadow-[0_6px_20px_rgba(0,168,158,0.28)] hover:shadow-[0_8px_25px_rgba(0,168,158,0.38)] leading-normal"
                    >
                      <span>Submit Inquiry</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Supported Countries Flags Strip */}
            <div className="pt-5 border-t border-slate-200 flex items-center justify-between flex-wrap gap-3 text-xs sm:text-sm text-[#475569]">
              <span className="font-bold text-[#334155]">Supported Countries:</span>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200/80 font-semibold text-[#1E293B] text-xs">
                  🇺🇸 USA
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200/80 font-semibold text-[#1E293B] text-xs">
                  🇬🇧 UK
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200/80 font-semibold text-[#1E293B] text-xs">
                  🇨🇦 Canada
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200/80 font-semibold text-[#1E293B] text-xs">
                  🇦🇺 Australia
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200/80 font-semibold text-[#1E293B] text-xs">
                  🇦🇪 UAE
                </span>
              </div>
            </div>
          </div>

        </div>

        </div>
      </div>
    </section>
  );
}
