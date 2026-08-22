"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";

interface BeforeAfterSliderProps {
  beforeImage?: string;
  afterImage?: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export default function BeforeAfterSlider({
  beforeImage = "/images/clinic-environment.jpg",
  afterImage = "/images/clinic-environment.jpg",
  beforeLabel = "BEFORE",
  afterLabel = "AFTER"
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(position);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-soft border border-border/60 select-none cursor-ew-resize bg-spruce-deep"
      role="img"
      aria-label="Before and after treatment visual comparison slider"
    >
      {/* Before Image (Background Layer) */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={beforeImage}
          alt="Before treatment"
          fill
          className="object-cover object-left grayscale contrast-125 brightness-90"
        />
        <span className="absolute bottom-4 left-4 z-10 text-[10px] font-bold uppercase tracking-widest bg-spruce-deep/90 text-alabaster px-3 py-1 rounded shadow-sm border border-white/10">
          {beforeLabel}
        </span>
      </div>

      {/* After Image (Slide Foreground Layer) */}
      <div
        className="absolute inset-x-0 top-0 bottom-0 h-full overflow-hidden transition-all duration-75 border-r border-gold"
        style={{ width: `${sliderPosition}%` }}
      >
        <div className="absolute inset-0 w-full h-full min-w-full aspect-[4/3]">
          <Image
            src={afterImage}
            alt="After treatment"
            fill
            className="object-cover object-left"
          />
          <span className="absolute bottom-4 left-4 z-10 text-[10px] font-bold uppercase tracking-widest bg-clinical-green text-alabaster px-3 py-1 rounded shadow-sm">
            {afterLabel}
          </span>
        </div>
      </div>

      {/* Slider Split Line Indicator Handle */}
      <div
        className="absolute inset-y-0 w-0.5 bg-gold pointer-events-none"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-spruce-deep border-2 border-gold flex items-center justify-center shadow-overlay">
          <div className="flex gap-1 text-gold text-xs font-bold">
            <span>‹</span>
            <span>›</span>
          </div>
        </div>
      </div>
    </div>
  );
}
