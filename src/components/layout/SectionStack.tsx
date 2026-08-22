"use client";

import React from "react";

interface SectionStackProps {
  children: React.ReactNode;
  /** Visual stacking order — each successive panel sits above the previous */
  index: number;
  id?: string;
  /** Panel background color */
  bg?: string;
}

/**
 * SectionStack — Pure CSS sticky overlap panel.
 *
 * No GSAP, no fade, no scale.
 * Each panel is position:sticky top:0 with increasing z-index.
 * As the user scrolls, the next panel slides up and purely overlaps the one below.
 * The previous panel is pinned underneath — covered, not animated.
 */
export default function SectionStack({
  children,
  index,
  id,
  bg = "#FFFFF0",
}: SectionStackProps) {
  return (
    <div
      id={id}
      style={{
        position: "sticky",
        top: 0,
        zIndex: 20 + index,
        backgroundColor: bg,
        // Rounded top edge so the panel visually "lifts" over the one below
        borderRadius: "28px 28px 0 0",
        // Raised shadow gives depth — feels like a card rising above the previous
        boxShadow: "0 -12px 60px rgba(0,0,0,0.13), 0 -2px 16px rgba(0,0,0,0.07)",
        overflow: "hidden",
        // Ensure full viewport height so content has room to breathe
        minHeight: "100vh",
      }}
    >
      {children}
    </div>
  );
}
