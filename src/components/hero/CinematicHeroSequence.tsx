"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Sparkles, ShieldCheck, Heart, Star, AlertCircle, Smile, Shield, Plane, HelpCircle, ChevronRight, ArrowRight, Clock, CheckCircle2 } from "lucide-react";
import { useOverlay } from "@/components/layout/OverlayProvider";
import { trackEvent } from "@/lib/analytics";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({
    ignoreMobileResize: true,
  });
}

export default function CinematicHeroSequence({ children }: { children?: React.ReactNode }) {
  const { openOverlay, updateBookingState } = useOverlay();

  // Diagnostics State
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Animation Refs
  const triggerContainerRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const heroLeftCtaRef = useRef<HTMLDivElement>(null);
  const heroCardSlotRef = useRef<HTMLDivElement>(null);
  const mobileCardSlotRef = useRef<HTMLDivElement>(null);
  const expandingImageWrapperRef = useRef<HTMLDivElement>(null);
  const imageOverlayRef = useRef<HTMLDivElement>(null);
  const floatingBadgeRef = useRef<HTMLDivElement>(null);
  const floatingContactRef = useRef<HTMLDivElement>(null);
  const scrollPromptRef = useRef<HTMLDivElement>(null);

  // Diagnostics Animation Elements Ref
  const diagHeaderRef = useRef<HTMLDivElement>(null);
  const diagCardsRef = useRef<HTMLDivElement>(null);
  const diagShowcaseRef = useRef<HTMLDivElement>(null);
  const overlapPanelRef = useRef<HTMLDivElement>(null);

  const SLIDE_DURATION = 4200;

  const featureItems = [
    { icon: Sparkles, stat: "15,000+", label: "Smiles Perfected" },
    { icon: ShieldCheck, stat: "3D CBCT", label: "Precision Imaging" },
    { icon: Heart, stat: "100% PAINLESS", label: "Laser Care" },
    { icon: Star, stat: "4.9 / 5.0", label: "Top Rated Care" },
  ];

  const concerns = [
    {
      id: "pain",
      icon: AlertCircle,
      title: "Toothache or Discomfort",
      subtitle: "Gentle pain relief & same-day emergency care",
      tag: "SAME-DAY RELIEF",
      treatment: "Gentle Emergency Care & Tooth Preservation",
      highlights: ["Immediate pain-relief priority", "Gentle, comfortable care"],
      timeframe: "Same-Day Slot",
      image: "/images/root-canal.jpg",
    },
    {
      id: "smile",
      icon: Smile,
      title: "I Want a Brighter, Better Smile",
      subtitle: "Custom porcelain veneers, whitening & smile redesign",
      tag: "COSMETIC DENTISTRY",
      treatment: "Custom Smile Design & Natural Porcelain Veneers",
      highlights: ["Preview your smile before starting", "Natural, custom shade matching"],
      timeframe: "2–3 Visits",
      image: "/images/hero-smile.jpg",
    },
    {
      id: "missing",
      icon: Shield,
      title: "Missing or Broken Teeth",
      subtitle: "Permanent dental implants that feel and chew naturally",
      tag: "PERMANENT IMPLANTS",
      treatment: "Guided Dental Implants & Long-Lasting Restoration",
      highlights: ["Eat and smile with full confidence", "Lifetime durability and strength"],
      timeframe: "Permanent Solution",
      image: "/images/implants.jpg",
    },
    {
      id: "straighter",
      icon: Sparkles,
      title: "Straighten Teeth Without Metal Braces",
      subtitle: "Comfortable, invisible clear aligners for all ages",
      tag: "CLEAR ALIGNERS",
      treatment: "Custom Invisible Aligners & Orthodontic Care",
      highlights: ["Discreet, clear, and removable trays", "Eat your favorite food with zero hassle"],
      timeframe: "Custom Timeline",
      image: "/images/aligners.jpg",
    },
    {
      id: "tourism",
      icon: Plane,
      title: "Traveling to India for Dental Care",
      subtitle: "Complete treatments during your trip with travel concierge",
      tag: "TRAVEL CONCIERGE",
      treatment: "Comprehensive Care Completed During Your Stay",
      highlights: ["Dedicated patient care coordinator", "Full mouth treatments scheduled smoothly"],
      timeframe: "5–7 Day Program",
      image: "/images/clinic-environment.jpg",
    },
    {
      id: "help",
      icon: HelpCircle,
      title: "Routine Checkup & Deep Cleaning",
      subtitle: "Complete oral health evaluation and gentle plaque removal",
      tag: "PREVENTIVE CARE",
      treatment: "Comprehensive Dental Wellness Exam & Cleaning",
      highlights: ["Relaxed, zero-pressure consultation", "Clear, step-by-step health roadmap"],
      timeframe: "45 Minutes",
      image: "/images/blog-dental-checkup.jpg",
    },
  ];

  // Auto-advance slideshow for diagnostics
  useEffect(() => {
    if (isHovered) {
      if (timerRef.current) clearInterval(timerRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      setProgress(100);
      return;
    }

    setProgress(0);
    const startTime = Date.now();

    progressIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, (elapsed / SLIDE_DURATION) * 100);
      setProgress(pct);
    }, 40);

    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % concerns.length);
    }, SLIDE_DURATION);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [activeIndex, isHovered, concerns.length]);

  // GSAP Cinematic ScrollTrigger Setup
  useEffect(() => {
    if (!triggerContainerRef.current) return;

    let ctx: gsap.Context;

    const setupAnimations = () => {
      ctx = gsap.context(() => {
        // Calculate slot metrics and set as CSS custom properties
        const updateMetrics = () => {
          if (!triggerContainerRef.current || !expandingImageWrapperRef.current || !heroCardSlotRef.current) return;
          if (window.innerWidth < 1024) return;

          const slotRect = heroCardSlotRef.current.getBoundingClientRect();
          const parentRect = triggerContainerRef.current.getBoundingClientRect();

          const top = slotRect.top - parentRect.top;
          const left = slotRect.left - parentRect.left;
          const width = slotRect.width;
          const height = slotRect.height;
          const borderRadius = "36px";

          gsap.set(expandingImageWrapperRef.current, {
            top,
            left,
            width,
            height,
            borderRadius,
            position: "absolute",
            zIndex: 10,
          });
        };

        updateMetrics();

      // Initial physical translation states
      gsap.set(expandingImageWrapperRef.current, { y: 140, opacity: 0 });
      gsap.set(mobileCardSlotRef.current, { y: 30, opacity: 0, scale: 0.95 });
      gsap.set(heroLeftCtaRef.current, { x: -40, opacity: 0 });
      gsap.set(floatingBadgeRef.current, { y: 60, opacity: 0, scale: 0.95 });
      gsap.set(floatingContactRef.current, { y: 60, opacity: 0, scale: 0.95 });

      // Section 2 initial state
      gsap.set("#diagnostics", { autoAlpha: 0 });
      gsap.set(diagHeaderRef.current, { opacity: 0, y: 30 });
      gsap.set(diagCardsRef.current?.children || [], { opacity: 0, y: 25, scale: 0.98 });
      gsap.set(diagShowcaseRef.current, { opacity: 0, y: 30, scale: 0.97 });
      if (overlapPanelRef.current) {
        gsap.set(overlapPanelRef.current, { yPercent: 100 });
      }

      // ── STEP 1: Entrance Animation ──
      const entranceTl = gsap.timeline({
        delay: 0.15,
        defaults: { ease: "power3.out" },
      });

      entranceTl
        .to(expandingImageWrapperRef.current, {
          y: 0,
          opacity: 1,
          duration: 1.4,
        })
        .to(
          mobileCardSlotRef.current,
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.2,
          },
          "-=1.4"
        )
        .to(
          heroLeftCtaRef.current,
          {
            x: 0,
            opacity: 1,
            duration: 1.0,
          },
          "-=1.0"
        )
        .fromTo(
          floatingBadgeRef.current,
          {
            y: 35,
            opacity: 0,
            scale: 0.94,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: "power2.out",
          },
          "-=0.9"
        )
        .set(floatingContactRef.current, { visibility: "visible" }, "-=1.1")
        .fromTo(
          floatingContactRef.current,
          {
            y: 40,
            opacity: 0,
            scale: 0.94,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: "power2.out",
            immediateRender: false,
          },
          "-=1.1"
        );

      // ── STEP 2: Scroll Scrub Timeline ──
      const tl = gsap.timeline({
        scrollTrigger: {
          id: "hero-pin-trigger",
          trigger: triggerContainerRef.current,
          start: "top top",
          end: "+=260%",
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onRefreshInit: () => {
            const progress = ScrollTrigger.getById("hero-pin-trigger")?.progress || 0;
            if (progress < 0.05) {
              updateMetrics();
            }
          },
        },
      });

      // PHASE 1: Hero Image expands from hero slot into full viewport background & Hero text fades
      tl.fromTo(
        floatingContactRef.current,
        { opacity: 1, y: 0, scale: 1 },
        {
          opacity: 0,
          y: -18,
          scale: 0.96,
          duration: 0.65,
          ease: "power2.out",
          immediateRender: false,
        },
        0
      )
      .fromTo(
        floatingBadgeRef.current,
        { opacity: 1, y: 0, scale: 1 },
        {
          opacity: 0,
          y: 20,
          scale: 0.95,
          duration: 0.75,
          ease: "power2.out",
          immediateRender: false,
        },
        0.05
      )
      .fromTo(
        scrollPromptRef.current,
        { opacity: 1 },
        {
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
          immediateRender: false,
        },
        0
      )
      .fromTo(
        "#hero",
        { opacity: 1, y: 0 },
        {
          opacity: 0,
          y: -25,
          duration: 1.0,
          ease: "power2.inOut",
          immediateRender: false,
        },
        0.1
      )
      .to(
        expandingImageWrapperRef.current,
        {
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          borderRadius: "0px",
          duration: 1.8,
          ease: "power2.inOut",
        },
        0
      )
      .fromTo(
        imageOverlayRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1.8,
          ease: "power2.inOut",
        },
        0
      );

      // Transition interactive pointer events and visibility
      tl.set("#hero", { pointerEvents: "none" }, 0.9);
      tl.set("#diagnostics", { pointerEvents: "auto", autoAlpha: 1 }, 1.0);

        // PHASE 2: Reveal Section 2 (Header -> Cards -> Showcase)
        tl.to(
          diagHeaderRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 1.0,
            ease: "power2.out",
          },
          1.2
        )
        .to(
          diagCardsRef.current?.children || [],
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.08,
            duration: 1.1,
            ease: "power2.out",
          },
          1.35
        )
        .to(
          diagShowcaseRef.current,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            ease: "power2.out",
          },
          1.7
        );

        // PHASE 3: Hold Section 2 stationary during interaction
        tl.to({}, { duration: 1.6 });

        // PHASE 4: Section 3 Overlap Panel slides up over Section 2
        if (overlapPanelRef.current) {
          tl.fromTo(
            overlapPanelRef.current,
            {
              yPercent: 100,
            },
            {
              yPercent: 0,
              ease: "power2.inOut",
              duration: 2.2,
            }
          );
        }

      }, triggerContainerRef);
    };

    if (typeof window !== "undefined") {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
      if (!window.location.hash) {
        window.scrollTo(0, 0);
      }
      if (document.fonts?.ready) {
        document.fonts.ready.then(() => {
          ScrollTrigger.refresh();
        });
      }
    }

    setupAnimations();

    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimer);
      if (ctx) ctx.revert();
    };
  }, []);

  const handleBookClick = () => {
    trackEvent("hero_book_click");
    openOverlay("booking");
  };

  const handleRowClick = (concern: (typeof concerns)[0]) => {
    trackEvent("booking_started", { concern: concern.title });
    if (concern.id === "tourism") {
      openOverlay("booking");
    } else {
      updateBookingState({ concern: concern.title });
      openOverlay("booking");
    }
  };

  const handleMouseEnterCard = (idx: number) => {
    setIsHovered(true);
    setActiveIndex(idx);
  };

  const handleMouseLeaveSection = () => {
    setIsHovered(false);
  };

  const activeConcern = concerns[activeIndex];

  return (
    <div
      ref={triggerContainerRef}
      className="relative w-full h-screen overflow-hidden select-none bg-transparent"
    >
      {/* ─────────────────────────────────────────────────────────
          BACKGROUND LAYER: EXPANDING HERO IMAGE (Desktop only)
          Sits behind Section 1 and Section 2
          ───────────────────────────────────────────────────────── */}
      <div
        ref={expandingImageWrapperRef}
        className="hidden lg:block absolute rounded-[36px] overflow-hidden bg-[#F3F4F1] shadow-[0_16px_48px_rgba(0,0,0,0.08)] border border-black/5 z-0 will-change-[transform,width,height,top,left,border-radius]"
        style={{
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <Image
          src="/images/hero-smile.jpg"
          alt="Confident smile after treatment at AnjMohi Dental Clinic"
          fill
          priority
          loading="eager"
          sizes="(min-width: 1024px) 50vw, 0px"
          className="object-cover object-center"
        />

        {/* Translucent ivory overlay */}
        <div
          ref={imageOverlayRef}
          className="absolute inset-0 pointer-events-none opacity-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,240,0.92) 0%, rgba(255,255,240,0.85) 50%, rgba(255,255,240,0.75) 100%)",
          }}
        />
      </div>

      {/* ─────────────────────────────────────────────────────────
          SECTION 1 — HERO LAYER (Foreground z-20)
          ───────────────────────────────────────────────────────── */}
      <section
        id="hero"
        className="absolute inset-0 w-full h-full flex flex-col justify-start sm:justify-center pt-[148px] xs:pt-[160px] sm:pt-24 lg:pt-24 pb-4 sm:pb-8 lg:pb-10 z-20 pointer-events-auto"
      >
        <div className="container-editorial flex flex-col justify-start sm:flex-1 sm:justify-center sm:my-auto">
          <div className="container-inner flex flex-col justify-start sm:flex-1 sm:justify-center sm:my-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 xl:gap-12 items-start lg:items-center min-h-0 lg:min-h-[500px] xl:min-h-[600px]">
              
              {/* Left Column: Heading, Subtitle, CTA, and Feature Metrics */}
              <div
                ref={heroContentRef}
                className="lg:col-span-6 xl:col-span-6 flex flex-col justify-start sm:justify-between h-auto sm:h-full min-h-0 sm:min-h-[580px] lg:min-h-0 pt-0 pb-2 sm:py-4 lg:py-6 gap-5 sm:gap-0"
              >
                {/* Top / Middle Typography Block + Mobile Inline Image (Reference Match) */}
                <div className="flex flex-col items-start sm:my-auto w-full relative">
                  <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.24em] text-[#00A89E] mb-1 sm:mb-4 block">
                    ADVANCED DENTAL CARE
                  </span>

                  {/* Mobile Row: Headline + Subtitle on Left, Image Card on Right */}
                  <div className="flex items-start justify-between gap-3.5 sm:gap-4 w-full">
                    <div className="flex-1 flex flex-col max-w-[215px] sm:max-w-[500px]">
                      <h1 className="text-[30px] xs:text-[34px] sm:text-4xl md:text-5xl lg:text-6xl xl:text-[70px] 2xl:text-[80px] font-serif text-[#111816] font-medium leading-[1.08] sm:leading-[1.05] tracking-tight">
                        Caring for Your <br />
                        <span className="italic font-medium text-[#00A89E]">Smile,</span> One Visit <br />
                        at a Time.
                      </h1>

                      <p className="text-[13px] xs:text-[14px] sm:text-base md:text-[19px] text-[#4A5568] font-sans font-normal leading-snug sm:leading-relaxed mt-3 sm:mt-6">
                        Your smile is more than just an expression, it&apos;s a reflection of your confidence, health, and happiness.
                      </p>
                    </div>

                    {/* Mobile-only tall rounded hero image card */}
                    <div
                      ref={mobileCardSlotRef}
                      className="lg:hidden w-[136px] xs:w-[146px] sm:w-[170px] h-[182px] xs:h-[196px] sm:h-[215px] rounded-[28px] overflow-hidden shadow-[0_12px_36px_rgba(0,0,0,0.14)] border-2 border-white flex-shrink-0 relative bg-[#F3F4F1] mt-0.5"
                    >
                      <Image
                        src="/images/hero-smile.jpg"
                        alt="Confident smile after treatment at AnjMohi Dental Clinic"
                        fill
                        priority
                        loading="eager"
                        sizes="(max-width: 1024px) 180px, 0px"
                        className="object-cover object-center"
                      />
                    </div>
                  </div>

                  {/* CTA Pill Button */}
                  <div
                    ref={heroLeftCtaRef}
                    className="mt-6 sm:mt-8 lg:mt-10"
                  >
                    <button
                      onClick={handleBookClick}
                      className="px-6 sm:px-9 py-3.5 sm:py-4 min-h-[50px] sm:min-h-[58px] bg-[#111816] hover:bg-[#00A89E] text-white text-xs sm:text-base font-semibold rounded-full transition-all duration-300 inline-flex items-center justify-center gap-2.5 sm:gap-3 cursor-pointer shadow-[0_6px_22px_rgba(0,0,0,0.15)] hover:shadow-[0_10px_30px_rgba(0,168,158,0.4)] hover:-translate-y-0.5 group"
                    >
                      <span>Set Appointment</span>
                      <ArrowUpRight className="w-3.5 h-3.5 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </button>
                  </div>
                </div>

                {/* Bottom Feature Stats Strip (Reference Style with rounded icon boxes) */}
                <div className="w-full pt-5 sm:pt-8 lg:pt-10 border-t border-black/8 grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-4 lg:gap-6 mt-7 sm:mt-8 lg:mt-12">
                  {featureItems.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={idx}
                        className={`flex items-center gap-2.5 sm:gap-2.5 ${
                          idx > 0 ? "sm:border-l sm:border-black/10 sm:pl-3 lg:pl-4" : ""
                        }`}
                      >
                        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-[#E6F7F5] text-[#00A89E] flex items-center justify-center flex-shrink-0">
                          <Icon className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="text-[11.5px] sm:text-[13px] font-bold text-[#111816] uppercase tracking-tight leading-tight whitespace-nowrap">
                            {item.stat}
                          </span>
                          <span className="text-[9.5px] sm:text-[11px] text-[#5A6B66] font-medium leading-tight mt-0.5 whitespace-nowrap">
                            {item.label}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Hero Visual Card Slot & Floating Pill Components (Desktop / Tablet) */}
              <div className="hidden lg:flex lg:col-span-6 xl:col-span-6 flex-col justify-center h-full relative">
                <div
                  ref={heroCardSlotRef}
                  className="relative w-full h-[520px] sm:h-[600px] lg:h-full min-h-[520px] lg:min-h-[500px] xl:min-h-[600px]"
                >
                  {/* 1. Independent Contact CTA Pill Component */}
                  <div
                    ref={floatingContactRef}
                    className="absolute top-5 sm:top-6 right-5 sm:right-6 z-30 pointer-events-auto will-change-[transform,opacity]"
                    style={{ opacity: 0, visibility: "hidden" }}
                  >
                    <button
                      onClick={handleBookClick}
                      className="px-5 sm:px-6 py-2.5 rounded-full bg-white/95 hover:bg-white text-[#111816] hover:text-[#00A89E] backdrop-blur-md border border-black/5 text-xs sm:text-sm font-semibold shadow-[0_4px_16px_rgba(0,0,0,0.08)] flex items-center gap-1.5 transition-all duration-300 hover:scale-105 cursor-pointer"
                    >
                      <span>Contact</span>
                      <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </button>
                  </div>

                  {/* 2. Independent Care Feature Card Component */}
                  <div
                    ref={floatingBadgeRef}
                    className="absolute top-[35%] left-5 sm:left-7 z-30 max-w-[210px] sm:max-w-[230px] rounded-2xl bg-white/80 backdrop-blur-xl border border-white/80 p-4 shadow-[0_16px_36px_rgba(0,0,0,0.12)] transition-transform duration-500 hover:scale-105 opacity-0 will-change-[transform,opacity]"
                  >
                    <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-black/10">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#EF4444]/80" />
                        <span className="w-2 h-2 rounded-full bg-[#F59E0B]/80" />
                        <span className="w-2 h-2 rounded-full bg-[#10B981]/80" />
                      </div>
                      <span className="text-[10px] font-semibold text-[#5A6B66] uppercase tracking-wider">
                        Care Feature
                      </span>
                    </div>

                    <h4 className="text-sm font-serif font-bold text-[#111816] leading-tight">
                      Glowing Smile
                    </h4>
                    <p className="text-[11px] text-[#5A6B66] mt-0.5 font-medium">
                      Laser Tech & Whitening
                    </p>

                    <div className="grid grid-cols-2 gap-2 mt-3 pt-2.5 border-t border-black/5">
                      <div className="flex flex-col">
                        <span className="text-[9px] text-[#718096] uppercase font-medium">Treatment</span>
                        <span className="text-[11px] font-bold text-[#111816]">Painless</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[9px] text-[#718096] uppercase font-medium">Comfort</span>
                        <span className="text-[11px] font-bold text-[#111816]">Boutique</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────
          SECTION 2 — INTERACTIVE DIAGNOSTICS LAYER (Foreground z-20)
          ───────────────────────────────────────────────────────── */}
      <section
        id="diagnostics"
        className="absolute inset-0 w-full h-full flex flex-col justify-center pt-24 sm:pt-28 lg:pt-24 pb-6 sm:pb-8 lg:pb-10 z-20 pointer-events-none opacity-0 invisible"
        style={{ opacity: 0, visibility: "hidden" }}
      >
        <div
          className="container-editorial flex-1 flex flex-col justify-center my-auto"
          onMouseLeave={handleMouseLeaveSection}
        >
          <div className="container-inner flex-1 flex flex-col justify-center my-auto">
            {/* Section Header: Spans the top of Section 2 with matching Hero left padding */}
            <div ref={diagHeaderRef} className="flex flex-col items-start gap-1 sm:gap-2 mb-3 sm:mb-6 max-w-3xl">
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.24em] text-[#00A89E] block">
              PATIENT CARE GUIDE
            </span>

            <h2 className="text-2xl sm:text-4xl lg:text-[44px] xl:text-[48px] font-serif text-[#111816] font-medium leading-[1.1] sm:leading-[1.08] tracking-tight">
              What brings you <span className="italic font-medium text-[#00A89E]">to our clinic today?</span>
            </h2>

            <p className="text-xs sm:text-base md:text-[17px] text-[#4A5568] font-sans font-normal leading-relaxed max-w-xl hidden sm:block">
              Choose your primary concern below. We&apos;ll match you with the right specialist and prepare a gentle, personalized care plan.
            </p>
          </div>

          {/* Interactive 12-Column Grid: 6 Left Cards + Right Treatment Showcase Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 xl:gap-12 items-stretch min-h-0 lg:min-h-[500px]">
            
            {/* Left Column: 6 Cards Stack (Matching Hero Left Column Grid Span & Padding) */}
            <div
              ref={diagCardsRef}
              className="lg:col-span-6 xl:col-span-6 flex flex-col justify-between gap-2 sm:gap-2.5 w-full"
            >
              {concerns.map((item, idx) => {
                const Icon = item.icon;
                const isActive = activeIndex === idx;

                return (
                  <button
                    key={item.id}
                    onClick={() => handleRowClick(item)}
                    onMouseEnter={() => handleMouseEnterCard(idx)}
                    className={`relative w-full py-2.5 sm:py-3.5 px-3.5 sm:px-5 rounded-xl sm:rounded-2xl border text-left flex items-center justify-between gap-3 sm:gap-4 transition-all duration-300 cursor-pointer overflow-hidden ${
                      isActive
                        ? "bg-white border-[#00A89E] shadow-[0_8px_24px_rgba(0,168,158,0.16)] ring-1 ring-[#00A89E]/40 translate-x-1"
                        : "bg-white/95 backdrop-blur-md border-black/8 hover:border-[#00A89E]/40 hover:bg-white shadow-xs"
                    }`}
                  >
                    {isActive && !isHovered && (
                      <div
                        className="absolute bottom-0 left-0 h-[3px] bg-[#00A89E] transition-all ease-linear"
                        style={{ width: `${progress}%` }}
                      />
                    )}

                    <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
                      <div
                        className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
                          isActive
                            ? "bg-[#00A89E] text-white shadow-[0_4px_12px_rgba(0,168,158,0.3)]"
                            : "bg-[#E6F7F5] text-[#00A89E]"
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </div>

                      <div className="flex flex-col min-w-0">
                        <span
                          className={`text-xs sm:text-base font-serif font-semibold tracking-tight transition-colors duration-200 truncate ${
                            isActive ? "text-[#00A89E]" : "text-[#111816]"
                          }`}
                        >
                          {item.title}
                        </span>
                        <span className="text-[10px] sm:text-[13px] text-[#5A6B66] font-normal mt-0.5 truncate">
                          {item.subtitle}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      {isActive && (
                        <span className="hidden sm:inline-block text-[11px] font-semibold text-[#00A89E] bg-[#E6F7F5] px-2.5 py-1 rounded-md">
                          Selected
                        </span>
                      )}
                      <ChevronRight
                        className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-all duration-300 ${
                          isActive ? "text-[#00A89E] translate-x-1" : "text-[#A0AEC0]"
                        }`}
                      />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right Column: Treatment Showcase Card (Desktop / Tablet) */}
            <div
              ref={diagShowcaseRef}
              className="hidden lg:flex lg:col-span-6 xl:col-span-6 flex-col justify-center h-full"
            >
              <div className="bg-white/95 backdrop-blur-md rounded-[28px] sm:rounded-[32px] border border-black/10 shadow-[0_16px_40px_rgba(0,0,0,0.06)] p-5 sm:p-6 flex flex-col justify-between h-full w-full max-w-[490px] xl:max-w-[510px] ml-auto">
                
                {/* Image Box */}
                <div className="relative w-full h-[180px] sm:h-[200px] rounded-2xl overflow-hidden bg-[#F8F8F4] border border-black/5 flex-shrink-0 mb-3">
                  {concerns.map((item, idx) => (
                    <div
                      key={item.id}
                      className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                        activeIndex === idx ? "opacity-100" : "opacity-0 pointer-events-none"
                      }`}
                    >
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 40vw"
                        priority={idx === 0}
                        className="object-cover object-center"
                      />
                    </div>
                  ))}

                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                    <div className="inline-flex items-center gap-1.5 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full border border-black/5 shadow-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00A89E] animate-pulse" />
                      <span className="text-[10px] font-bold text-[#111816] tracking-wider uppercase">
                        Care Overview
                      </span>
                    </div>

                    <div className="bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full border border-black/5 text-[#111816] text-[11px] font-semibold tracking-wider shadow-xs">
                      <span className="text-[#00A89E]">0{activeIndex + 1}</span>
                      <span className="opacity-40 mx-0.5">/</span>
                      <span className="opacity-60">0{concerns.length}</span>
                    </div>
                  </div>
                </div>

                {/* Treatment Details */}
                <div className="flex flex-col justify-between flex-1">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[10.5px] font-bold uppercase tracking-wider text-[#00A89E] bg-[#E6F7F5] px-2.5 py-1 rounded-md">
                        {activeConcern.tag}
                      </span>
                      <div className="flex items-center gap-1.5 text-xs text-[#5A6B66] font-medium">
                        <Clock className="w-3.5 h-3.5 text-[#00A89E]" />
                        <span>{activeConcern.timeframe}</span>
                      </div>
                    </div>

                    <h3 className="text-lg sm:text-xl font-serif font-medium text-[#111816] leading-snug mb-2">
                      {activeConcern.treatment}
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mb-3">
                      {activeConcern.highlights.map((highlight, hIdx) => (
                        <div key={hIdx} className="flex items-center gap-2 text-xs sm:text-[13px] text-[#2D3748]">
                          <CheckCircle2 className="w-4 h-4 text-[#00A89E] flex-shrink-0" />
                          <span className="truncate">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => handleRowClick(activeConcern)}
                    className="w-full py-3 px-6 min-h-[44px] bg-[#00A89E] hover:bg-[#008C84] text-white text-xs sm:text-sm font-semibold rounded-xl transition-all duration-300 inline-flex items-center justify-center gap-2.5 cursor-pointer shadow-[0_4px_16px_rgba(0,168,158,0.28)] hover:shadow-[0_6px_22px_rgba(0,168,158,0.4)] hover:-translate-y-[0.5px]"
                  >
                    <span>Book Consultation for This Care</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="flex items-center justify-center gap-2 mt-2.5 pt-2 border-t border-black/5">
                    {concerns.map((_, dotIdx) => (
                      <button
                        key={dotIdx}
                        onClick={() => {
                          setActiveIndex(dotIdx);
                          setIsHovered(true);
                        }}
                        className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                          activeIndex === dotIdx
                            ? "w-6 bg-[#00A89E]"
                            : "w-1.5 bg-black/15 hover:bg-black/30"
                        }`}
                        aria-label={`Go to care option ${dotIdx + 1}`}
                      />
                    ))}
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </section>

      {/* ─────────────────────────────────────────────────────────
          SECTION 3 — OVERLAP PANEL (Children)
          Slides up directly inside the pinned viewport over Section 2
          ───────────────────────────────────────────────────────── */}
      {children && (
        <div
          ref={overlapPanelRef}
          id="overlap-panel-wrapper"
          className="absolute inset-0 w-full min-h-screen z-40 will-change-transform"
        >
          {children}
        </div>
      )}

      {/* Fixed Scroll to Explore indicator */}
      <div
        ref={scrollPromptRef}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-1.5 opacity-70 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        aria-hidden="true"
      >
        <div className="w-4 h-7 rounded-full border border-black/40 flex justify-center pt-1.5">
          <div className="w-1 h-1.5 bg-[#00A89E] rounded-full animate-bounce" />
        </div>
        <span className="text-[9px] tracking-[0.3em] uppercase text-[#111816]/70 font-semibold">
          SCROLL TO EXPLORE
        </span>
      </div>
    </div>
  );
}
