"use client";

import React, { useEffect, useState } from "react";

export const siteSections = [
  { id: "hero", num: "01", label: "01 · Hero" },
  { id: "diagnostics", num: "02", label: "02 · Diagnostics" },
  { id: "stories", num: "03", label: "03 · Success Stories" },
  { id: "authority", num: "04", label: "04 · About The Doctor" },
  { id: "journal", num: "05", label: "05 · Blogs & Insights" },
  { id: "treatments", num: "06", label: "06 · Treatment Navigator" },
  { id: "smile-plan", num: "07", label: "07 · Smile Plan & Tourism" },
  { id: "final-cta", num: "08", label: "08 · Booking & Contact" },
];

export default function SectionProgress() {
  const [activeSection, setActiveSection] = useState<string>("hero");

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-30% 0px -40% 0px",
      threshold: 0,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    siteSections.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) observer.observe(el);
    });

    return () => {
      siteSections.forEach((sec) => {
        const el = document.getElementById(sec.id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  const handleNavClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="hidden lg:flex fixed right-6 xl:right-10 top-1/2 -translate-y-1/2 flex-col items-center gap-2.5 z-40 select-none">
      {siteSections.map((step, idx) => {
        const isActive = activeSection === step.id;
        return (
          <React.Fragment key={step.id}>
            {idx > 0 && <div className="w-[1px] h-3.5 border-r border-dotted border-white/40 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]" />}
            
            <button
              onClick={() => handleNavClick(step.id)}
              className="group flex items-center gap-2.5 cursor-pointer focus:outline-none transition-all duration-300 py-0.5"
              aria-label={`Jump to section ${step.num}: ${step.label}`}
            >
              {isActive ? (
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#00D2C4] shadow-[0_0_12px_#00D2C4]" />
                  <span className="text-xs font-mono font-bold text-[#00D2C4] tracking-wider drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
                    {step.num}
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
                  <div className="w-2 h-2 rounded-full border border-white/80 group-hover:border-[#00D2C4] group-hover:bg-[#00D2C4]/30 transition-colors drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]" />
                  <span className="text-[11px] font-mono font-semibold text-white group-hover:text-[#00D2C4] tracking-wider transition-colors drop-shadow-[0_1px_4px_rgba(0,0,0,0.95)]">
                    {step.num}
                  </span>
                </div>
              )}

              {/* Tooltip on hover */}
              <span className="absolute right-14 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-[10px] font-semibold uppercase tracking-wider text-white bg-[#061814]/95 backdrop-blur-md py-1 px-2.5 rounded border border-white/15 shadow-xl whitespace-nowrap pointer-events-none">
                {step.label}
              </span>
            </button>
          </React.Fragment>
        );
      })}
    </div>
  );
}
