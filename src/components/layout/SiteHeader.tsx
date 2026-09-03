import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { clinic } from "@/data/clinic";
import { treatments } from "@/data/treatments";
import { useOverlay } from "./OverlayProvider";
import { trackEvent } from "@/lib/analytics";
import { Phone, ChevronDown, Menu, X, Sparkles, ArrowRight, ShieldCheck } from "lucide-react";

export default function SiteHeader() {
  const { openOverlay } = useOverlay();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [treatmentsDropdownOpen, setTreatmentsDropdownOpen] = useState(false);
  const [mobileTreatmentsOpen, setMobileTreatmentsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setTreatmentsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMouseEnterDropdown = () => {
    if (dropdownTimerRef.current) clearTimeout(dropdownTimerRef.current);
    setTreatmentsDropdownOpen(true);
  };

  const handleMouseLeaveDropdown = () => {
    dropdownTimerRef.current = setTimeout(() => {
      setTreatmentsDropdownOpen(false);
    }, 150);
  };

  const handleTreatmentSelect = (slug: string) => {
    setTreatmentsDropdownOpen(false);
    setMobileMenuOpen(false);
    setMobileTreatmentsOpen(false);
    trackEvent("treatment_detail_open", { slug });
    openOverlay("treatment", slug);
  };

  const handleBookClick = () => {
    trackEvent("booking_started");
    openOverlay("booking");
    setMobileMenuOpen(false);
    setTreatmentsDropdownOpen(false);
  };

  const handlePhoneClick = () => {
    trackEvent("phone_click", { source: "header" });
  };

  return (
    <>
      {/* Island Nav Wrapper — GPU-composited */}
      <div
        className="fixed top-0 left-0 right-0 z-[100] flex justify-center pt-1.5 sm:pt-5 pointer-events-none"
        style={{ transform: "translateZ(0)", willChange: "transform" }}
      >
        {/* The Floating Glassmorphic Island Pill */}
        <header
          className={`pointer-events-auto flex items-center justify-between container-inner h-[54px] sm:h-[72px] md:h-[80px] px-4 sm:px-8 lg:px-10 rounded-full border border-black/10 transition-[background-color,box-shadow] duration-500 ${
            scrolled
              ? "bg-white/90 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.13),0_2px_8px_rgba(0,0,0,0.07)]"
              : "bg-[#FFFFF0]/85 backdrop-blur-xl shadow-[0_4px_20px_rgba(0,0,0,0.07)]"
          }`}
          style={{ transform: "translateZ(0)", willChange: "transform" }}
        >
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
            <div className="relative h-9 sm:h-11 w-auto flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
              <img
                src="/dental_logo.svg"
                alt="AnjMohi Dental Clinic"
                className="h-8 xs:h-9 sm:h-10 md:h-11 w-auto object-contain"
              />
            </div>
          </Link>

          {/* Desktop Navigation Links — centered */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-base font-medium text-[#2D3748] absolute left-1/2 -translate-x-1/2">
            {/* Treatments Dropdown Trigger */}
            <div
              ref={dropdownRef}
              className="relative"
              onMouseEnter={handleMouseEnterDropdown}
              onMouseLeave={handleMouseLeaveDropdown}
            >
              <button
                onClick={() => setTreatmentsDropdownOpen(!treatmentsDropdownOpen)}
                className="flex items-center gap-1.5 hover:text-[#00A89E] transition-colors whitespace-nowrap cursor-pointer py-2 focus:outline-none"
                aria-expanded={treatmentsDropdownOpen}
              >
                <span className={treatmentsDropdownOpen ? "text-[#00A89E] font-semibold" : ""}>Treatments</span>
                <ChevronDown className={`w-3.5 h-3.5 opacity-70 transition-transform duration-300 ${
                  treatmentsDropdownOpen ? "rotate-180 text-[#00A89E]" : ""
                }`} />
              </button>

              {/* Mega Dropdown Menu */}
              <div
                className={`absolute top-full left-1/2 -translate-x-1/2 pt-3 w-[620px] transition-all duration-300 transform-gpu ${
                  treatmentsDropdownOpen
                    ? "opacity-100 translate-y-0 pointer-events-auto visible"
                    : "opacity-0 -translate-y-2 pointer-events-none invisible"
                }`}
              >
                <div className="bg-white/98 backdrop-blur-2xl rounded-3xl border border-black/10 shadow-[0_20px_50px_rgba(0,0,0,0.12),0_4px_16px_rgba(0,0,0,0.06)] p-6 text-[#111816]">
                  {/* Dropdown Header */}
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-black/8">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#008C84] flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      Specialized Clinical Treatments
                    </span>
                    <Link
                      href="/#treatments"
                      onClick={() => setTreatmentsDropdownOpen(false)}
                      className="text-xs font-bold text-[#475569] hover:text-[#008C84] transition-colors flex items-center gap-1"
                    >
                      <span>Explore all</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>

                  {/* 2-Column Grid of Treatments */}
                  <div className="grid grid-cols-2 gap-2.5">
                    {treatments.map((treatment) => (
                      <button
                        key={treatment.slug}
                        onClick={() => handleTreatmentSelect(treatment.slug)}
                        className="p-3.5 rounded-2xl hover:bg-[#F8FAF9] text-left transition-all duration-200 border border-transparent hover:border-black/5 group cursor-pointer flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-1 mb-1">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-[#008C84] bg-[#E6F7F5] px-2 py-0.5 rounded">
                              {treatment.category}
                            </span>
                            <span className="text-xs font-bold text-[#111816] group-hover:text-[#008C84] opacity-0 group-hover:opacity-100 transition-opacity">
                              Inspect →
                            </span>
                          </div>
                          <h4 className="text-[15px] font-serif font-bold text-[#111816] group-hover:text-[#008C84] transition-colors leading-snug">
                            {treatment.title}
                          </h4>
                          <p className="text-xs text-[#475569] leading-relaxed line-clamp-1 mt-0.5">
                            {treatment.shortDescription}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Dropdown Footer Banner */}
                  <div className="mt-4 pt-3 border-t border-black/8 flex items-center justify-between bg-[#F8FAF9] p-3 rounded-xl">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#008C84]" />
                      <span className="text-xs text-[#334155] font-medium">All treatments include 3D CBCT diagnostic planning</span>
                    </div>
                    <button
                      onClick={handleBookClick}
                      className="text-xs font-bold text-[#008C84] hover:underline cursor-pointer"
                    >
                      Book Consult
                    </button>
                  </div>

                </div>
              </div>
            </div>

            <Link href="/smile-plan" className="hover:text-[#00A89E] transition-colors whitespace-nowrap">
              Smile Plan
            </Link>
            <Link href="/dental-tourism" className="hover:text-[#00A89E] transition-colors whitespace-nowrap">
              NRI Dental Tourism
            </Link>
            <Link href="/about" className="hover:text-[#00A89E] transition-colors whitespace-nowrap">
              About Us
            </Link>
            <Link href="/blog" className="hover:text-[#00A89E] transition-colors whitespace-nowrap">
              Blog
            </Link>
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden lg:flex items-center gap-5 flex-shrink-0">
            <a
              href={`tel:${clinic.phoneRaw}`}
              onClick={handlePhoneClick}
              className="text-sm font-semibold text-[#111816] hover:text-[#00A89E] transition-colors flex items-center gap-2 whitespace-nowrap"
            >
              <Phone className="w-4 h-4 text-[#00A89E]" />
              <span className="hidden xl:inline">{clinic.phone}</span>
            </a>

            <button
              onClick={handleBookClick}
              className="px-6 py-3 min-h-[46px] inline-flex items-center justify-center bg-[#00A89E] hover:bg-[#008C84] text-white text-xs sm:text-sm font-semibold rounded-full transition-all duration-300 cursor-pointer shadow-[0_4px_14px_rgba(0,168,158,0.35)] hover:shadow-[0_6px_20px_rgba(0,168,158,0.5)] hover:-translate-y-[0.5px] whitespace-nowrap"
            >
              Book Consultation
            </button>
          </div>

          {/* Mobile Right Actions */}
          <div className="flex lg:hidden items-center gap-1.5">
            <a
              href={`tel:${clinic.phoneRaw}`}
              onClick={handlePhoneClick}
              className="p-2 text-[#111816] hover:text-[#00A89E] transition-colors"
              aria-label="Call Clinic"
            >
              <Phone className="w-5 h-5 text-[#00A89E]" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#111816] hover:text-[#00A89E] transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </header>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-[95] bg-[#FFFFF0]/98 backdrop-blur-2xl flex flex-col justify-between pt-24 pb-8 px-6 text-[#111816] lg:hidden transition-all duration-500 overflow-y-auto ${
          mobileMenuOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col gap-3 pt-2">
          {/* Mobile Treatments Accordion */}
          <div>
            <button
              onClick={() => setMobileTreatmentsOpen(!mobileTreatmentsOpen)}
              className="flex items-center justify-between w-full text-2xl font-serif text-[#111816] hover:text-[#00A89E] transition-colors py-2 cursor-pointer"
            >
              <span>Treatments</span>
              <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${
                mobileTreatmentsOpen ? "rotate-180 text-[#00A89E]" : ""
              }`} />
            </button>

            {mobileTreatmentsOpen && (
              <div className="flex flex-col gap-2 pl-3 py-2 border-l-2 border-[#00A89E]/30 my-1">
                {treatments.map((t) => (
                  <button
                    key={t.slug}
                    onClick={() => handleTreatmentSelect(t.slug)}
                    className="text-left text-base text-[#334155] hover:text-[#00A89E] py-1.5 font-medium flex items-center justify-between cursor-pointer"
                  >
                    <span>{t.title}</span>
                    <span className="text-[11px] text-[#008C84] bg-[#E6F7F5] px-2 py-0.5 rounded font-bold">{t.category}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/smile-plan"
            onClick={() => setMobileMenuOpen(false)}
            className="text-2xl font-serif text-[#111816] hover:text-[#00A89E] transition-colors py-1"
          >
            Smile Plan
          </Link>
          <Link
            href="/dental-tourism"
            onClick={() => setMobileMenuOpen(false)}
            className="text-2xl font-serif text-[#111816] hover:text-[#00A89E] transition-colors py-1"
          >
            NRI Dental Tourism
          </Link>
          <Link
            href="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="text-2xl font-serif text-[#111816] hover:text-[#00A89E] transition-colors py-1"
          >
            About Us
          </Link>
          <Link
            href="/blog"
            onClick={() => setMobileMenuOpen(false)}
            className="text-2xl font-serif text-[#111816] hover:text-[#00A89E] transition-colors py-1"
          >
            Blog
          </Link>
        </nav>

        <div className="flex flex-col gap-4 border-t border-black/10 pt-6 mt-6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00A89E] animate-pulse" />
            <span className="text-sm text-[#4A5568]">{clinic.statusText}</span>
          </div>
          <a
            href={`tel:${clinic.phoneRaw}`}
            onClick={handlePhoneClick}
            className="text-lg font-semibold text-[#111816] hover:text-[#00A89E] transition-colors"
          >
            {clinic.phone}
          </a>
          <button
            onClick={handleBookClick}
            className="w-full py-4 min-h-[50px] inline-flex items-center justify-center bg-[#00A89E] hover:bg-[#008C84] text-white text-center font-semibold rounded-full transition-all cursor-pointer shadow-lg"
          >
            Book Consultation
          </button>
        </div>
      </div>
    </>
  );
}
