"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function FixedClinicEnvironment() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !imageRef.current) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      // Only apply parallax scrub on desktop to prevent mobile touch jitter
      mm.add("(min-width: 1024px)", () => {
        gsap.to(imageRef.current, {
          scale: 1.02,
          y: 20,
          ease: "none",
          scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.8,
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed top-0 left-0 right-0 w-full min-h-[120vh] h-[120lvh] z-0 overflow-hidden pointer-events-none bg-[#FFFFF0] transform-gpu [-webkit-transform:translateZ(0)]"
      style={{
        transform: "translateZ(0)",
        willChange: "transform",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      {/* Full-Bleed Fixed Background Operatory Suite Image */}
      <div ref={imageRef} className="w-full h-full min-h-[120vh] relative will-transform transform-gpu">
        <Image
          src="/images/clinic-operatory-real.jpg"
          alt="AnjMohi Modern Dental Operatory Suite"
          fill
          priority
          sizes="100vw"
          className="object-cover object-right pointer-events-none"
        />

        {/* 
          Balanced Left-to-Right Ivory Dissolve:
          - 0% to 40%: High-opacity ivory backing for crisp text & card contrast
          - 40% to 62%: Smooth natural feather dissolve
          - 62% to 100%: 100% crystal-clear clarity for the real dental operatory on the right
        */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, #FFFFF0 0%, rgba(255,255,240,0.95) 32%, rgba(255,255,240,0.6) 48%, rgba(255,255,240,0.15) 62%, rgba(255,255,240,0) 72%)",
          }}
        />

        {/* Top shade for navigation bar clarity */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#FFFFF0]/90 via-[#FFFFF0]/20 to-transparent pointer-events-none" />
      </div>

      {/* Subtle ambient light teal accent glow */}
      <div className="absolute top-1/3 left-1/10 w-[500px] h-[500px] bg-[#00A89E]/4 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/10 w-[600px] h-[600px] bg-[#00A89E]/3 rounded-full blur-[180px] pointer-events-none" />
    </div>
  );
}
