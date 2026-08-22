import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Fade-in-up animation triggered on scroll.
 */
export function fadeInUp(
  elements: string | Element | Element[],
  container: Element,
  options?: {
    y?: number;
    duration?: number;
    delay?: number;
    stagger?: number;
    start?: string;
  }
) {
  const {
    y = 50,
    duration = 0.9,
    delay = 0,
    stagger = 0,
    start = "top 85%",
  } = options || {};

  return gsap.fromTo(
    elements,
    { y, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration,
      delay,
      stagger,
      ease: "power3.out",
      scrollTrigger: {
        trigger: container,
        start,
        toggleActions: "play none none none",
      },
    }
  );
}

/**
 * Staggered reveal for grid items / cards.
 */
export function staggerReveal(
  elements: string | Element | Element[],
  container: Element,
  options?: {
    y?: number;
    duration?: number;
    stagger?: number;
    start?: string;
  }
) {
  const {
    y = 40,
    duration = 0.7,
    stagger = 0.12,
    start = "top 80%",
  } = options || {};

  return gsap.fromTo(
    elements,
    { y, opacity: 0, scale: 0.97 },
    {
      y: 0,
      opacity: 1,
      scale: 1,
      duration,
      stagger,
      ease: "power2.out",
      scrollTrigger: {
        trigger: container,
        start,
        toggleActions: "play none none none",
      },
    }
  );
}

/**
 * Parallax effect on images during scroll.
 */
export function parallaxImage(
  element: string | Element,
  container: Element,
  options?: {
    yPercent?: number;
    start?: string;
    end?: string;
  }
) {
  const {
    yPercent = -15,
    start = "top bottom",
    end = "bottom top",
  } = options || {};

  return gsap.fromTo(
    element,
    { yPercent: 0 },
    {
      yPercent,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start,
        end,
        scrub: 0.5,
      },
    }
  );
}

/**
 * Animated counter for statistics.
 */
export function counterAnimate(
  element: HTMLElement,
  endValue: number,
  options?: {
    duration?: number;
    suffix?: string;
    prefix?: string;
  }
) {
  const { duration = 2, suffix = "", prefix = "" } = options || {};
  const obj = { value: 0 };

  return gsap.to(obj, {
    value: endValue,
    duration,
    ease: "power2.out",
    onUpdate: () => {
      element.textContent = `${prefix}${Math.round(obj.value).toLocaleString()}${suffix}`;
    },
    scrollTrigger: {
      trigger: element,
      start: "top 85%",
      toggleActions: "play none none none",
    },
  });
}

/**
 * Horizontal line/divider reveal animation.
 */
export function lineReveal(
  element: string | Element,
  container: Element,
  options?: { duration?: number; start?: string }
) {
  const { duration = 1, start = "top 85%" } = options || {};

  return gsap.fromTo(
    element,
    { scaleX: 0, transformOrigin: "left center" },
    {
      scaleX: 1,
      duration,
      ease: "power3.inOut",
      scrollTrigger: {
        trigger: container,
        start,
        toggleActions: "play none none none",
      },
    }
  );
}

/**
 * Scale-in reveal from center.
 */
export function scaleIn(
  element: string | Element,
  container: Element,
  options?: { duration?: number; start?: string }
) {
  const { duration = 0.8, start = "top 85%" } = options || {};

  return gsap.fromTo(
    element,
    { scale: 0.9, opacity: 0 },
    {
      scale: 1,
      opacity: 1,
      duration,
      ease: "power3.out",
      scrollTrigger: {
        trigger: container,
        start,
        toggleActions: "play none none none",
      },
    }
  );
}
