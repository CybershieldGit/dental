"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { clinic } from "@/data/clinic";
import { useOverlay } from "./OverlayProvider";
import { trackEvent } from "@/lib/analytics";
import { Phone, ChevronDown, Menu, X } from "lucide-react";

export default function SiteHeader() {
  const { openOverlay } = useOverlay();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleBookClick = () => {
    trackEvent("booking_started");
    openOverlay("booking");
    setMobileMenuOpen(false);
  };

  const handlePhoneClick = () => {
    trackEvent("phone_click", { source: "header" });
  };

  return (
    <>
      {/* Island Nav Wrapper — GPU-composited, never triggers layout on scroll */}
      <div
        className="fixed top-0 left-0 right-0 z-[100] flex justify-center pt-3.5 sm:pt-5 pointer-events-none"
        style={{ transform: "translateZ(0)", willChange: "transform" }}
      >
        {/* The Floating Glassmorphic Island Pill */}
        <header
          className={`pointer-events-auto flex items-center justify-between container-inner h-[60px] sm:h-[72px] md:h-[80px] px-4 sm:px-8 lg:px-10 rounded-full border border-black/10 transition-[background-color,box-shadow] duration-500 ${
            scrolled
              ? "bg-white/85 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.13),0_2px_8px_rgba(0,0,0,0.07)]"
              : "bg-[#FFFFF0]/75 backdrop-blur-xl shadow-[0_4px_20px_rgba(0,0,0,0.07)]"
          }`}
          style={{ transform: "translateZ(0)", willChange: "transform" }}
        >
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
            <div className="relative h-9 sm:h-11 w-auto flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
              <img
                src="/dental_logo.svg"
                alt="AnjMohi Dental Clinic"
                className="h-8 sm:h-10 md:h-11 w-auto object-contain"
              />
            </div>
          </Link>

          {/* Desktop Navigation Links — centered */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-base font-medium text-[#2D3748] absolute left-1/2 -translate-x-1/2">
            <a
              href="#treatments"
              className="flex items-center gap-1.5 hover:text-[#00A89E] transition-colors whitespace-nowrap"
            >
              <span>Treatments</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-50" />
            </a>
            <a href="#smile-plan" className="hover:text-[#00A89E] transition-colors whitespace-nowrap">
              Smile Plan
            </a>
            <a href="#nri-tourism" className="hover:text-[#00A89E] transition-colors whitespace-nowrap">
              NRI Dental Tourism
            </a>
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
          <div className="flex lg:hidden items-center gap-1">
            <a
              href={`tel:${clinic.phoneRaw}`}
              onClick={handlePhoneClick}
              className="p-2 text-[#111816] hover:text-[#00A89E] transition-colors"
              aria-label="Call Clinic"
            >
              <Phone className="w-4 h-4 text-[#00A89E]" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#111816] hover:text-[#00A89E] transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </header>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-[95] bg-[#FFFFF0]/98 backdrop-blur-2xl flex flex-col justify-between pt-24 pb-8 px-6 text-[#111816] lg:hidden transition-all duration-500 ${
          mobileMenuOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col gap-5 pt-4">
          <a
            href="#treatments"
            onClick={() => setMobileMenuOpen(false)}
            className="text-2xl font-serif text-[#111816] hover:text-[#00A89E] transition-colors py-1"
          >
            Treatments
          </a>
          <a
            href="#smile-plan"
            onClick={() => setMobileMenuOpen(false)}
            className="text-2xl font-serif text-[#111816] hover:text-[#00A89E] transition-colors py-1"
          >
            Smile Plan
          </a>
          <a
            href="#nri-tourism"
            onClick={() => setMobileMenuOpen(false)}
            className="text-2xl font-serif text-[#111816] hover:text-[#00A89E] transition-colors py-1"
          >
            NRI Dental Tourism
          </a>
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

        <div className="flex flex-col gap-4 border-t border-black/10 pt-6">
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
