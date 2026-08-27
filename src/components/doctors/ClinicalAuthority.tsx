"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { doctors } from "@/data/doctors";
import { useOverlay } from "@/components/layout/OverlayProvider";
import { trackEvent } from "@/lib/analytics";
import { 
  Award, 
  GraduationCap, 
  Sparkles, 
  ShieldCheck, 
  Calendar, 
  ArrowUpRight, 
  CheckCircle2,
  Stethoscope
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ClinicalAuthority() {
  const { openOverlay, updateBookingState } = useOverlay();
  const activeDoc = doctors[0]; // Single chief dentist (Dr. Karan Anand)
  
  const sectionRef = useRef<HTMLElement>(null);
  const planeGroupRef = useRef<SVGGElement>(null);
  const dashedTrailRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 1024;
      const pathEl = isMobile
        ? (dashedTrailRef.current || document.querySelector<SVGPathElement>(".mobile-plane-wrapper path"))
        : (document.querySelector<SVGPathElement>(".desktop-dashed-trail") || dashedTrailRef.current);

      const planeEl = isMobile
        ? (planeGroupRef.current || document.querySelector<SVGGElement>(".mobile-plane-wrapper g"))
        : (document.querySelector<SVGGElement>(".desktop-plane-group") || planeGroupRef.current);

      if (!pathEl || !planeEl) return;

      // Mobile path vs Desktop path
      // Desktop: Loops around cutout (left) and shoots across to top-right card corner (X: 885, Y: 105)
      // Mobile: Loops around doctor cutout and lands directly on top of the 'Lead Dentist' pill on the doctor info card
      if (isMobile) {
        pathEl.setAttribute(
          "d",
          "M 330 360 C 390 300, 440 230, 520 170 C 560 120, 540 85, 480 95 C 430 105, 420 160, 470 210 C 530 260, 590 300, 625 340 C 635 352, 630 365, 620 370"
        );
      } else {
        pathEl.setAttribute(
          "d",
          "M 30 520 C 120 440, 200 370, 245 280 C 275 220, 260 140, 195 150 C 135 160, 140 270, 220 330 C 340 410, 530 300, 710 200 C 780 155, 840 120, 885 105"
        );
      }

      const totalLen = pathEl.getTotalLength();
      
      // Initialize trail as hidden
      gsap.set(pathEl, {
        strokeDasharray: "8 8",
        strokeDashoffset: totalLen,
      });

      // Initially hide the plane until triggered
      gsap.set(planeEl, { opacity: 0 });

      // Autonomous smooth cinematic flight timeline triggered automatically when section is scrolled into view
      const planeProxy = { progress: 0 };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: isMobile ? "top 60%" : "top 45%",
          toggleActions: "play none none none",
          once: true,
        },
      });

      // 1. Fade plane in gently at takeoff
      tl.to(planeEl, {
        opacity: 1,
        duration: 0.6,
        ease: "power1.out",
      }, 0);

      // 2. Smooth 4.1s flight wrapping around the doctor (Front -> Behind Head -> Forward to Card)
      tl.to(planeProxy, {
        progress: 1,
        duration: 4.1,
        ease: "power1.inOut",
        onUpdate: () => {
          const p = planeProxy.progress;

          // Reveal trail strictly behind plane as it flies
          const currentOffset = totalLen * (1 - p);
          gsap.set(pathEl, { strokeDashoffset: currentOffset });

          // Dynamic Z-Index depth: when looping around behind the doctor (p between 0.30 and 0.58), layer plane behind doctor cutout
          const planeContainer = planeEl.closest(".plane-wrapper");
          if (planeContainer) {
            if (p >= 0.28 && p <= 0.58) {
              (planeContainer as HTMLElement).style.zIndex = "5"; // Behind doctor cutout (z-10)
            } else {
              (planeContainer as HTMLElement).style.zIndex = "30"; // In front of doctor & content
            }
          }

          // Position airplane at exact SVG coordinates along the path
          const curLen = Math.max(0.1, Math.min(totalLen - 0.1, p * totalLen));
          const currentPoint = pathEl.getPointAtLength(curLen);
          
          // Tangent angle calculation using delta
          const p1 = pathEl.getPointAtLength(Math.max(0, curLen - 4));
          const p2 = pathEl.getPointAtLength(Math.min(totalLen, curLen + 4));
          const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x) * (180 / Math.PI);

          // Subtle depth scaling (smaller on mobile screens, smaller when behind doctor)
          const baseScale = isMobile ? 0.40 : 0.65;
          const behindScale = isMobile ? 0.30 : 0.52;
          const depthScale = (p >= 0.28 && p <= 0.58) ? behindScale : baseScale;

          // Position using pure SVG transform attribute
          planeEl.setAttribute(
            "transform",
            `translate(${currentPoint.x.toFixed(1)}, ${currentPoint.y.toFixed(1)}) rotate(${(angle + 90).toFixed(1)}) scale(${depthScale})`
          );
        },
      }, 0);

      // 3. Gentle settle upon landing on the details card and remain parked permanently
      tl.to(planeEl, {
        scale: isMobile ? 0.42 : 0.68,
        duration: 0.8,
        yoyo: true,
        repeat: 1,
        ease: "sine.inOut",
        onComplete: () => {
          gsap.set(planeEl, { opacity: 1 });
        },
      }, "-=0.3");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleConsultDoctor = () => {
    trackEvent("hero_book_click");
    updateBookingState({ concern: `Consultation with ${activeDoc.name}` });
    openOverlay("booking");
  };

  const doctorAchievements = [
    {
      icon: Award,
      label: "Clinical Experience",
      value: activeDoc.experience,
      desc: "Years of specialized mastery",
    },
    {
      icon: ShieldCheck,
      label: "Sterilization & Safety",
      value: "Class-B Standard",
      desc: "Zero-infection protocol",
    },
    {
      icon: GraduationCap,
      label: "Qualifications",
      value: activeDoc.qualifications.split(",")[0] || "MDS Specialist",
      desc: "Top dental credentials",
    },
    {
      icon: Stethoscope,
      label: "Success Rate",
      value: "99.4%",
      desc: "Documented patient satisfaction",
    },
  ];

  return (
    <section ref={sectionRef} id="doctor" className="min-h-screen flex flex-col justify-center py-10 sm:py-14 lg:py-16 relative z-10 border-t border-black/5 bg-[#FFFFF0]/40 overflow-hidden">
      <div className="container-editorial relative my-auto">
        <div className="container-inner">
        
        {/* ── Desktop Origami Paper Airplane (hidden on mobile, visible lg:block) ── */}
        <div className="plane-wrapper hidden lg:block absolute inset-0 pointer-events-none z-30 select-none overflow-visible transition-[z-index] duration-75">
          <svg 
            className="w-full h-full min-h-[500px] xl:min-h-[600px] overflow-visible"
            viewBox="0 0 1000 600" 
            preserveAspectRatio="none"
            fill="none"
          >
            {/* Desktop 3D Orbit Path: Starts bottom-left in front of doctor, loops around behind doctor's shoulders/head, and shoots forward onto details card top-right corner */}
            <path
              className="desktop-dashed-trail"
              d="M 30 520 C 120 440, 200 370, 245 280 C 275 220, 260 140, 195 150 C 135 160, 140 270, 220 330 C 340 410, 530 300, 710 200 C 780 155, 840 120, 885 105"
              fill="none"
              stroke="transparent"
              strokeWidth="0"
            />

            {/* Small Origami Paper Airplane Graphic */}
            <g className="desktop-plane-group" transform="translate(30, 520) scale(0.65)">
              {/* Outer Right Wing */}
              <polygon 
                points="0,-35 40,15 12,10" 
                fill="#FFFFFF" 
                stroke="#111816" 
                strokeWidth="2.2" 
                strokeLinejoin="round" 
              />
              {/* Outer Left Wing */}
              <polygon 
                points="0,-35 -40,15 -12,10" 
                fill="#FFFFFF" 
                stroke="#111816" 
                strokeWidth="2.2" 
                strokeLinejoin="round" 
              />
              
              {/* Center Keel with Soft Teal Tint */}
              <polygon 
                points="0,-35 12,10 0,20 -12,10" 
                fill="#E6F7F5" 
                stroke="#111816" 
                strokeWidth="2.0" 
                strokeLinejoin="round" 
              />
              
              {/* Hatching Lines in the Center Fold */}
              <line x1="-3" y1="-12" x2="3" y2="-8" stroke="#00A89E" strokeWidth="1.6" />
              <line x1="-5" y1="-3" x2="5" y2="2" stroke="#00A89E" strokeWidth="1.6" />
              <line x1="-7" y1="6" x2="7" y2="10" stroke="#00A89E" strokeWidth="1.6" />

              {/* Center Fold Ridge */}
              <line x1="0" y1="-35" x2="0" y2="20" stroke="#111816" strokeWidth="2.2" />
            </g>
          </svg>
        </div>

        {/* Section Header: Matches Wireframe "About The doctor" banner (Single doctor, no pills) */}
        <div className="flex flex-col items-start gap-2 mb-10 sm:mb-12 max-w-3xl">
          <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.24em] text-[#00A89E] block">
            CLINICAL DIRECTOR & LEAD SURGEON
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] xl:text-[48px] font-serif text-[#111816] font-medium leading-[1.08] tracking-tight">
            About The Doctor
          </h2>
          <p className="text-sm sm:text-base md:text-[17px] text-[#4A5568] font-sans font-normal leading-relaxed max-w-xl">
            Meet our founder and clinical director, leading precision guided dental surgery and restorative care with 16+ years of international expertise.
          </p>
        </div>

        {/* Wireframe Layout: Left Doctor Cutout (No Blue Box) + Right About & Achievements */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative">
          
          {/* LEFT: Pure Doctor Cutout (z-index: 10 so plane wraps in front and behind) (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-end items-center relative z-10">
            <div className="relative w-full h-[360px] sm:h-[480px] lg:h-[500px] xl:h-[600px] flex flex-col justify-end items-center">
              
              {/* Mobile Dedicated Plane Wrapper (Directly inside doctor cutout container) */}
              <div className="mobile-plane-wrapper lg:hidden absolute inset-0 pointer-events-none z-30 select-none overflow-visible transition-[z-index] duration-75">
                <svg 
                  className="w-full h-full overflow-visible"
                  viewBox="0 0 400 400" 
                  preserveAspectRatio="none"
                  fill="none"
                >
                  <path
                    ref={dashedTrailRef}
                    d="M 60 280 C 100 210, 160 140, 210 90 C 250 50, 240 20, 190 25 C 140 30, 130 90, 180 140 C 230 190, 280 240, 310 290 C 320 310, 315 325, 305 330"
                    fill="none"
                    stroke="transparent"
                    strokeWidth="0"
                  />

                  {/* Small Origami Paper Airplane Graphic (Mobile) */}
                  <g ref={planeGroupRef} transform="translate(60, 280) scale(0.42)">
                    <polygon 
                      points="0,-35 40,15 12,10" 
                      fill="#FFFFFF" 
                      stroke="#111816" 
                      strokeWidth="2.2" 
                      strokeLinejoin="round" 
                    />
                    <polygon 
                      points="0,-35 -40,15 -12,10" 
                      fill="#FFFFFF" 
                      stroke="#111816" 
                      strokeWidth="2.2" 
                      strokeLinejoin="round" 
                    />
                    <polygon 
                      points="0,-35 12,10 0,20 -12,10" 
                      fill="#E6F7F5" 
                      stroke="#111816" 
                      strokeWidth="2.0" 
                      strokeLinejoin="round" 
                    />
                    <line x1="-3" y1="-12" x2="3" y2="-8" stroke="#00A89E" strokeWidth="1.6" />
                    <line x1="-5" y1="-3" x2="5" y2="2" stroke="#00A89E" strokeWidth="1.6" />
                    <line x1="-7" y1="6" x2="7" y2="10" stroke="#00A89E" strokeWidth="1.6" />
                    <line x1="0" y1="-35" x2="0" y2="20" stroke="#111816" strokeWidth="2.2" />
                  </g>
                </svg>
              </div>

              {/* Pure Doctor Cutout Image (Transparent background, no bounding box) */}
              <div className="relative w-full h-full flex items-end justify-center z-10">
                <Image
                  src="/images/dr-karan-cutout.png"
                  alt={activeDoc.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-contain object-bottom filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.12)] transition-transform duration-500 hover:scale-[1.02]"
                />
              </div>

              {/* Floating Doctor Info Glass Card at Bottom */}
              <div className="w-full max-w-[420px] relative z-20 bg-white/95 backdrop-blur-md rounded-2xl p-4 border border-black/8 shadow-[0_12px_32px_rgba(0,0,0,0.08)] mt-[-30px]">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-wider text-[#00A89E] font-bold">
                      {activeDoc.experience} Clinical Mastery
                    </span>
                    <h3 className="text-lg sm:text-xl font-serif font-bold text-[#111816] leading-tight mt-0.5">
                      {activeDoc.name}
                    </h3>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#E6F7F5] text-[#00A89E]">
                    Lead Dentist
                  </span>
                </div>
                <p className="text-[11px] text-[#5A6B66] mt-1 font-sans truncate">
                  {activeDoc.qualifications}
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT: About The Doctor + Achievements & Qualifications (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between rounded-3xl bg-white border border-black/8 shadow-[0_16px_40px_rgba(0,0,0,0.06)] p-6 sm:p-8 lg:p-10 relative">
            
            {/* Top Right Landing Target Indicator Accent */}
            <div className="absolute top-6 right-6 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E6F7F5] border border-[#00A89E]/20 text-[10px] font-bold text-[#00A89E] uppercase tracking-wider">
              <span>Verified Care</span>
            </div>
            
            {/* Top: Doctor Biography & Clinical Approach */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00A89E]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#00A89E]">
                  CLINICAL BIOGRAPHY & PRACTICE
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-serif text-[#111816] font-bold leading-snug mb-4">
                {activeDoc.name}
              </h3>

              <p className="text-sm sm:text-base text-[#4A5568] leading-relaxed mb-6 font-sans">
                {activeDoc.bio}
              </p>

              {/* Core Clinical Focus Areas */}
              <div className="mb-8">
                <span className="text-xs font-bold uppercase tracking-wider text-[#111816] block mb-3">
                  Specialized Areas of Focus:
                </span>
                <div className="flex flex-wrap gap-2.5">
                  {activeDoc.interests.map((interest, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#E6F7F5] text-[#00A89E] text-xs font-semibold border border-[#00A89E]/20"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>{interest}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Middle: Wireframe "achievements and qualification" 4-Card Grid */}
            <div className="pt-6 border-t border-black/8">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#111816]">
                  Achievements & Qualifications
                </span>
                <span className="text-[11px] text-[#718096]">
                  Verified Credentials
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                {doctorAchievements.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl bg-[#F8FAF9] border border-black/5 flex flex-col justify-between min-h-[100px]"
                    >
                      <div className="p-1.5 rounded-lg bg-white w-fit text-[#00A89E] shadow-2xs border border-black/5 mb-2">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-xs sm:text-sm font-serif font-bold text-[#111816] block leading-tight truncate">
                          {item.value}
                        </span>
                        <span className="text-[10px] text-[#718096] font-medium block mt-0.5 leading-tight truncate">
                          {item.label}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Actions: Book Consultation + View Full Profile */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <button
                  onClick={handleConsultDoctor}
                  className="w-full sm:flex-1 py-4 px-6 min-h-[50px] rounded-xl bg-[#00A89E] hover:bg-[#008C84] text-white text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 inline-flex items-center justify-center gap-2 cursor-pointer shadow-[0_4px_16px_rgba(0,168,158,0.25)] hover:shadow-[0_6px_22px_rgba(0,168,158,0.4)]"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Consultation with {activeDoc.name.split(" ")[1] || "Doctor"}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>

                <Link
                  href="/about"
                  className="w-full sm:w-auto py-4 px-6 min-h-[50px] rounded-xl bg-[#111816] hover:bg-black text-white text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 inline-flex items-center justify-center gap-2"
                >
                  <span>About Our Clinic</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

          </div>

        </div>

        </div>
      </div>
    </section>
  );
}
