"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { BookingState } from "@/data/booking";
import { trackEvent } from "@/lib/analytics";

interface OverlayContextType {
  activeOverlay: string | null;
  activeDetailSlug: string | null;
  openOverlay: (overlay: string, detailSlug?: string | null) => void;
  closeOverlay: () => void;
  bookingState: BookingState;
  updateBookingState: (updates: Partial<BookingState>) => void;
  resetBooking: () => void;
}

const OverlayContext = createContext<OverlayContextType | undefined>(undefined);

export function OverlayProvider({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [activeOverlay, setActiveOverlay] = useState<string | null>(null);
  const [activeDetailSlug, setActiveDetailSlug] = useState<string | null>(null);
  const [bookingState, setBookingState] = useState<BookingState>({});

  useEffect(() => {
    const overlayParam = searchParams.get("overlay");
    const slugParam = searchParams.get("slug");

    if (overlayParam) {
      setActiveOverlay(overlayParam);
      setActiveDetailSlug(slugParam);
    } else {
      setActiveOverlay(null);
      setActiveDetailSlug(null);
    }
  }, [searchParams]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && activeOverlay) {
        closeOverlay();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeOverlay]);

  const openOverlay = (overlay: string, detailSlug: string | null = null) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("overlay", overlay);
    if (detailSlug) {
      params.set("slug", detailSlug);
    } else {
      params.delete("slug");
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const closeOverlay = () => {
    if (activeOverlay === "booking") {
      trackEvent("booking_abandoned", { step: bookingState.name ? 3 : bookingState.date ? 2 : 1 });
    }
    router.push(pathname);
  };

  const updateBookingState = (updates: Partial<BookingState>) => {
    setBookingState((prev) => ({ ...prev, ...updates }));
  };

  const resetBooking = () => {
    setBookingState({});
  };

  return (
    <OverlayContext.Provider
      value={{
        activeOverlay,
        activeDetailSlug,
        openOverlay,
        closeOverlay,
        bookingState,
        updateBookingState,
        resetBooking,
      }}
    >
      {children}
    </OverlayContext.Provider>
  );
}

export function useOverlay() {
  const context = useContext(OverlayContext);
  if (!context) {
    throw new Error("useOverlay must be used within an OverlayProvider");
  }
  return context;
}
