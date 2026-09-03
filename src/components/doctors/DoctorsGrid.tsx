"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { doctors } from "@/data/doctors";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function DoctorsGrid() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Header
      gsap.fromTo(
        ".doctors-header",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".doctors-header",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      // Stagger doctor cards
      gsap.fromTo(
        ".doctor-card",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".doctors-grid",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="doctors" className="py-12 md:py-16 relative z-10">
      <div className="container-editorial">
        <div className="container-inner">
          {/* Header */}
          <div className="doctors-header text-center mb-12 sm:mb-14">
            <span className="text-xs sm:text-[13px] font-bold uppercase tracking-[0.16em] text-[#008C84] block mb-2">
              CLINICAL SPECIALIST TEAM
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] xl:text-[48px] font-serif text-[#111816] font-medium leading-[1.08] tracking-tight">
              Your Care in Specialist Hands
            </h2>
            <p className="text-base sm:text-lg text-[#334155] font-sans font-normal leading-relaxed mt-2.5 max-w-xl mx-auto">
              Our multidisciplinary team brings master-level clinical experience and specialized expertise to every treatment.
            </p>
          </div>

          {/* 4-column Doctor Grid */}
          <div className="doctors-grid grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {doctors.map((doctor) => (
              <div
                key={doctor.id}
                className="doctor-card group relative bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-black/8 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_36px_rgba(0,168,158,0.14)] hover:border-[#00A89E]/50 transition-all duration-500 hover:-translate-y-1.5"
              >
                {/* Photo */}
                <div className="relative w-full h-[260px] sm:h-[300px] md:h-[340px] overflow-hidden bg-slate-100">
                  <Image
                    src={doctor.image}
                    alt={doctor.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Subtle gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Experience badge */}
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-[#008C84] uppercase tracking-wider shadow-sm border border-black/5">
                    {doctor.experience}
                  </div>
                </div>

                {/* Info */}
                <div className="p-4 sm:p-5">
                  <h3 className="text-base sm:text-lg font-serif font-bold text-[#111816] group-hover:text-[#008C84] transition-colors">
                    {doctor.name}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-[#475569] font-medium mt-1 leading-relaxed">
                    {doctor.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
