"use client";

import React, { Suspense } from "react";
import SiteHeader from "@/components/layout/SiteHeader";
import Footer from "@/components/layout/Footer";
import FixedClinicEnvironment from "@/components/layout/FixedClinicEnvironment";
import { OverlayProvider } from "@/components/layout/OverlayProvider";
import BookingOverlay from "@/components/booking/BookingOverlay";
import TreatmentOverlay from "@/components/treatments/TreatmentOverlay";
import CaseStudyOverlay from "@/components/cases/CaseStudyOverlay";
import NRIBookingOverlay from "@/components/tourism/NRIBookingOverlay";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#FFFFF0] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-2 border-[#00A89E] border-t-transparent rounded-full animate-spin" />
          <span className="text-sm text-[#4A5568] font-medium">Loading AnjMohi Dental Clinic...</span>
        </div>
      </div>
    }>
      <OverlayProvider>
        {/* Fixed Ambient 60% #FFFFF0 Background */}
        <FixedClinicEnvironment />

        <SiteHeader />

        {/* Dynamic Pages Content */}
        <main className="flex-1 relative z-10 w-full">
          {children}
        </main>

        {/* Global Footer */}
        <Footer />

        {/* Global Interactive Overlays */}
        <BookingOverlay />
        <TreatmentOverlay />
        <CaseStudyOverlay />
        <NRIBookingOverlay />
      </OverlayProvider>
    </Suspense>
  );
}
