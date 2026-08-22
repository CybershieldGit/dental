"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins once
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Custom hook for GSAP animations with proper React lifecycle management.
 * Returns a ref to attach to the container element.
 * The callback receives the GSAP context for scoped animations.
 */
export function useGSAPAnimation(
  callback: (ctx: gsap.Context) => void,
  deps: React.DependencyList = []
) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      callback(ctx as unknown as gsap.Context);
    }, containerRef);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return containerRef;
}

/**
 * Simple ref-based GSAP animation hook.
 * Runs the animation callback once on mount.
 */
export function useGSAPOnMount(
  callback: () => (() => void) | void
) {
  useEffect(() => {
    const cleanup = callback();
    return () => {
      if (cleanup) cleanup();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export { gsap, ScrollTrigger };
