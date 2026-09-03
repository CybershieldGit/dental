"use client";

import React, { useState, useEffect, useRef } from "react";
import { clinic } from "@/data/clinic";
import { useOverlay } from "../layout/OverlayProvider";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { X, Check, ChevronRight } from "lucide-react";

const STEPS = ["Concern", "Date & Time", "Details", "Confirm"];

export default function BookingOverlay() {
  const { activeOverlay, closeOverlay, bookingState, updateBookingState, resetBooking } = useOverlay();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [callbackRequest, setCallbackRequest] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // Focus trapping
  useEffect(() => {
    if (activeOverlay === "booking" || activeOverlay === "callback") {
      setStep(1);
      setSuccess(false);
      setCallbackRequest(activeOverlay === "callback");
      
      // Focus container
      setTimeout(() => {
        containerRef.current?.focus();
      }, 100);
    }
  }, [activeOverlay]);

  if (activeOverlay !== "booking" && activeOverlay !== "callback") return null;

  const handleConcernSelect = (concern: string) => {
    updateBookingState({ concern });
    trackEvent("booking_step_completed", { step: 1, value: concern });
    setStep(2);
  };

  const handleDateSelect = (date: string, time: string) => {
    updateBookingState({ date, time });
    trackEvent("booking_step_completed", { step: 2, value: `${date} @ ${time}` });
    setStep(3);
  };

  const handleDetailsSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const phone = formData.get("phone") as string;
    const email = formData.get("email") as string;
    const whatsapp = formData.get("whatsapp") === "on";

    if (!name || !phone) return;

    updateBookingState({ name, phone, email, whatsapp: whatsapp ? "yes" : "no" });
    trackEvent("booking_step_completed", { step: 3, value: name });
    setStep(4);
  };

  const handleConfirm = async () => {
    setLoading(true);
    // Simulate API round-trip
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLoading(false);
    setSuccess(true);
    trackEvent("booking_completed", { concern: bookingState.concern, date: bookingState.date });
  };

  const handleCallbackSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const phone = formData.get("phone") as string;
    const preferredTime = formData.get("preferredTime") as string;

    if (!name || !phone) return;

    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
    setSuccess(true);
    trackEvent("booking_completed", { concern: "Callback Requested", date: preferredTime });
  };

  // Demo availability slots
  const dates = [
    { label: "Today", value: "2026-08-20" },
    { label: "Tomorrow", value: "2026-08-21" },
    { label: "Monday, Aug 24", value: "2026-08-24" },
    { label: "Tuesday, Aug 25", value: "2026-08-25" },
  ];
  
  const timeSlots = ["10:00 AM", "11:30 AM", "02:00 PM", "04:30 PM"];

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6 lg:p-8 pointer-events-auto">
      {/* Editorial Blurred Backdrop */}
      <div
        className="fixed inset-0 bg-[#111816]/60 backdrop-blur-md transition-opacity duration-300"
        onClick={closeOverlay}
      />

      {/* Luxury Editorial Modal Card */}
      <div
        ref={containerRef}
        tabIndex={-1}
        className="relative w-full max-w-[620px] max-h-[85vh] bg-[#FFFFF0] text-[#111816] rounded-[32px] sm:rounded-[36px] shadow-[0_32px_80px_rgba(0,0,0,0.28),0_4px_24px_rgba(0,0,0,0.08)] border border-black/10 flex flex-col justify-between overflow-hidden focus:outline-none z-10 animate-in fade-in zoom-in-95 duration-300"
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-title"
      >
        {/* Header */}
        <div className="px-6 sm:px-8 py-5 sm:py-6 border-b border-black/8 flex items-center justify-between bg-white/70 backdrop-blur-md flex-shrink-0">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#008C84] block mb-1">
              {callbackRequest ? "RAPID INQUIRY" : "EXPERIENCE CLINICAL EXCELLENCE"}
            </span>
            <h2 id="booking-title" className="text-2xl sm:text-3xl font-serif text-[#111816] font-bold tracking-tight">
              {callbackRequest ? "Request a Callback" : "Book Consultation"}
            </h2>
            <p className="text-xs sm:text-sm text-[#334155] font-sans font-medium mt-0.5">
              {callbackRequest ? "Our specialists will reach out during clinical hours." : "Schedule a comprehensive examination with our lead doctors."}
            </p>
          </div>
          <button
            onClick={closeOverlay}
            className="w-10 h-10 rounded-full bg-black/5 hover:bg-black/10 text-[#111816] flex items-center justify-center transition-all duration-200 cursor-pointer hover:rotate-90"
            aria-label="Close booking modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success State */}
        {success ? (
          <div className="flex-1 p-8 sm:p-12 flex flex-col justify-center items-center text-center gap-6">
            <div className="w-20 h-20 bg-[#E6F7F5] text-[#00A89E] flex items-center justify-center rounded-full shadow-inner">
              <Check className="w-10 h-10" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#008C84]">CONFIRMATION SENT</span>
              <h3 className="text-3xl font-serif text-[#111816] font-bold mt-1">You are Provisionally Booked</h3>
            </div>
            <p className="text-sm sm:text-base text-[#334155] max-w-md font-sans leading-relaxed">
              {callbackRequest
                ? "Your callback request is recorded. A senior patient coordinator will phone you shortly."
                : `Thank you, ${bookingState.name || "Patient"}. We have reserved ${bookingState.date} at ${bookingState.time}. Our clinic concierge will reach out to confirm your diagnostic slot.`}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm mt-4">
              <a
                href={`tel:${clinic.phoneRaw}`}
                className="flex-1 py-3.5 bg-[#00A89E] hover:bg-[#008C84] text-white text-center font-bold rounded-full transition-all shadow-md text-sm"
              >
                Call Clinic
              </a>
              <button
                onClick={() => {
                  resetBooking();
                  closeOverlay();
                }}
                className="flex-1 py-3.5 border border-black/15 hover:bg-white text-[#111816] text-center font-bold rounded-full transition-all cursor-pointer text-sm"
              >
                Return to Site
              </button>
            </div>
          </div>
        ) : callbackRequest ? (
          /* Callback Form */
          <form onSubmit={handleCallbackSubmit} className="flex-1 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#334155]">Your Name</label>
                <input
                  required
                  name="name"
                  type="text"
                  placeholder="e.g. Rahul Sharma"
                  className="w-full px-4 py-3 bg-white border border-black/10 rounded-xl text-sm text-[#111816] focus:border-[#00A89E] focus:ring-2 focus:ring-[#00A89E]/20 focus:outline-none transition-all"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#334155]">Contact Number</label>
                <input
                  required
                  name="phone"
                  type="tel"
                  placeholder="e.g. +91 98765 43210"
                  className="w-full px-4 py-3 bg-white border border-black/10 rounded-xl text-sm text-[#111816] focus:border-[#00A89E] focus:ring-2 focus:ring-[#00A89E]/20 focus:outline-none transition-all"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#334155]">Preferred Callback Window</label>
                <select
                  name="preferredTime"
                  className="w-full px-4 py-3 bg-white border border-black/10 rounded-xl text-sm text-[#111816] focus:border-[#00A89E] focus:ring-2 focus:ring-[#00A89E]/20 focus:outline-none transition-all font-medium"
                >
                  <option>Morning (10:00 AM - 1:00 PM)</option>
                  <option>Afternoon (1:00 PM - 4:00 PM)</option>
                  <option>Evening (4:00 PM - 7:00 PM)</option>
                </select>
              </div>
            </div>

            <button
              disabled={loading}
              type="submit"
              className="w-full py-4 mt-8 bg-[#111816] hover:bg-[#00A89E] text-white font-bold rounded-full transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-xl"
            >
              {loading ? "Registering Request..." : "Request Call Now"}
            </button>
          </form>
        ) : (
          /* Booking Step Flow */
          <div className="flex-1 flex flex-col justify-between overflow-hidden">
            {/* Step Indicators */}
            <div className="px-6 sm:px-8 py-3.5 bg-white/60 border-b border-black/8 flex items-center justify-between text-xs font-bold text-[#475569] flex-shrink-0">
              {STEPS.map((name, i) => (
                <div key={name} className="flex items-center gap-2">
                  <span
                    className={cn(
                      "w-6 h-6 rounded-full flex items-center justify-center border text-xs font-bold transition-all",
                      step === i + 1
                        ? "bg-[#00A89E] text-white border-[#00A89E] shadow-sm ring-2 ring-[#00A89E]/20"
                        : step > i + 1
                        ? "bg-[#00A89E] text-white border-[#00A89E]"
                        : "bg-transparent border-black/20 text-[#64748B]"
                    )}
                  >
                    {step > i + 1 ? <Check className="w-3.5 h-3.5" /> : i + 1}
                  </span>
                  <span className={cn("hidden sm:inline text-xs", step === i + 1 && "text-[#111816] font-bold")}>
                    {name}
                  </span>
                </div>
              ))}
            </div>

            {/* Step Content */}
            <div className="flex-1 p-6 sm:p-8 overflow-y-auto">
              {step === 1 && (
                <div className="flex flex-col gap-5">
                  <div>
                    <h3 className="text-xl font-serif text-[#111816] font-bold">What would you like assistance with?</h3>
                    <p className="text-xs sm:text-[13px] text-[#334155] font-medium mt-1">Select your primary reason for visiting our clinic.</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { title: "Pain or Discomfort", subtitle: "Same-day relief & emergency triage" },
                      { title: "Smile Improvement", subtitle: "Veneers, whitening & aesthetics" },
                      { title: "Missing Tooth", subtitle: "Guided implants & prosthetics" },
                      { title: "Straight Teeth", subtitle: "Clear aligners & Invisalign" },
                      { title: "General Check-up", subtitle: "Digital 3D scans & cleaning" },
                      { title: "Specialist Consultation", subtitle: "Second opinion & treatment plans" }
                    ].map((item) => (
                      <button
                        key={item.title}
                        onClick={() => handleConcernSelect(item.title)}
                        className="w-full p-4 bg-white hover:bg-[#E6F7F5]/50 border border-black/8 hover:border-[#00A89E] rounded-2xl text-left transition-all duration-200 flex flex-col justify-between group cursor-pointer shadow-xs hover:shadow-md hover:-translate-y-0.5"
                      >
                        <div className="flex items-center justify-between w-full">
                          <span className="text-sm sm:text-[15px] font-bold text-[#111816] group-hover:text-[#008C84] transition-colors">{item.title}</span>
                          <ChevronRight className="w-4 h-4 text-[#94A3B8] group-hover:text-[#00A89E] group-hover:translate-x-1 transition-all" />
                        </div>
                        <span className="text-xs text-[#334155] font-medium mt-1">{item.subtitle}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="flex flex-col gap-6">
                  <div>
                    <h3 className="text-xl font-serif text-[#111816] font-bold">Select Appointment Slot</h3>
                    <p className="text-xs text-[#5A6B66] mt-1">Choose a convenient date and time for your clinical assessment.</p>
                  </div>
                  
                  <div className="flex flex-col gap-2.5">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#5A6B66]">Preferred Day</span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {dates.map((d) => (
                        <button
                          key={d.value}
                          type="button"
                          onClick={() => handleDateSelect(d.label, timeSlots[0])}
                          className="p-3.5 bg-white hover:bg-[#E6F7F5] border border-black/10 hover:border-[#00A89E] rounded-xl text-xs sm:text-sm font-bold text-[#111816] hover:text-[#00A89E] transition-all cursor-pointer shadow-xs text-center"
                        >
                          {d.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2.5">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#5A6B66]">Preferred Time</span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {timeSlots.map((ts) => (
                        <button
                          key={ts}
                          type="button"
                          onClick={() => handleDateSelect("Upcoming Slot", ts)}
                          className="p-3 bg-white hover:bg-[#00A89E] hover:text-white rounded-xl border border-black/10 transition-all cursor-pointer shadow-xs font-bold text-xs text-center"
                        >
                          {ts}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <form onSubmit={handleDetailsSubmit} className="flex flex-col gap-5">
                  <div>
                    <h3 className="text-xl font-serif text-[#111816] font-bold">Patient Details</h3>
                    <p className="text-xs text-[#5A6B66] mt-1">We will send confirmation and directions to these coordinates.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold uppercase tracking-wider text-[#5A6B66]">Full Name</label>
                      <input
                        required
                        name="name"
                        type="text"
                        placeholder="e.g. Nitin Gupta"
                        className="w-full px-4 py-3 bg-white border border-black/10 rounded-xl text-sm text-[#111816] focus:border-[#00A89E] focus:ring-2 focus:ring-[#00A89E]/20 focus:outline-none transition-all"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold uppercase tracking-wider text-[#5A6B66]">Phone Number</label>
                      <input
                        required
                        name="phone"
                        type="tel"
                        placeholder="e.g. +91 99990 11111"
                        className="w-full px-4 py-3 bg-white border border-black/10 rounded-xl text-sm text-[#111816] focus:border-[#00A89E] focus:ring-2 focus:ring-[#00A89E]/20 focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#5A6B66]">Email Address (Optional)</label>
                    <input
                      name="email"
                      type="email"
                      placeholder="e.g. nitin@example.com"
                      className="w-full px-4 py-3 bg-white border border-black/10 rounded-xl text-sm text-[#111816] focus:border-[#00A89E] focus:ring-2 focus:ring-[#00A89E]/20 focus:outline-none transition-all"
                    />
                  </div>

                  <div className="flex items-center gap-3 py-1">
                    <input id="whatsapp-updates" name="whatsapp" type="checkbox" defaultChecked className="w-4 h-4 accent-[#00A89E] rounded" />
                    <label htmlFor="whatsapp-updates" className="text-xs text-[#5A6B66] font-medium">
                      Send clinic directions & appointment reminders via WhatsApp
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 mt-2 bg-[#111816] hover:bg-[#00A89E] text-white font-semibold rounded-full transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                  >
                    <span>Proceed to Review</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </form>
              )}

              {step === 4 && (
                <div className="flex flex-col gap-6">
                  <div>
                    <h3 className="text-xl font-serif text-[#111816] font-bold">Review & Reserve</h3>
                    <p className="text-xs text-[#5A6B66] mt-1">Please confirm your appointment details before submittal.</p>
                  </div>

                  <div className="bg-white border border-black/8 rounded-2xl p-6 flex flex-col gap-3.5 text-sm text-[#111816] shadow-sm">
                    <div className="flex justify-between border-b border-black/8 pb-2.5">
                      <span className="text-[#5A6B66] font-medium text-xs uppercase tracking-wider">Concern</span>
                      <span className="font-bold text-[#111816]">{bookingState.concern}</span>
                    </div>
                    <div className="flex justify-between border-b border-black/8 pb-2.5">
                      <span className="text-[#5A6B66] font-medium text-xs uppercase tracking-wider">Slot</span>
                      <span className="font-bold text-[#00A89E]">{bookingState.date} at {bookingState.time}</span>
                    </div>
                    <div className="flex justify-between border-b border-black/8 pb-2.5">
                      <span className="text-[#5A6B66] font-medium text-xs uppercase tracking-wider">Patient Name</span>
                      <span className="font-bold text-[#111816]">{bookingState.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#5A6B66] font-medium text-xs uppercase tracking-wider">Contact</span>
                      <span className="font-bold text-[#111816]">{bookingState.phone}</span>
                    </div>
                  </div>

                  <button
                    disabled={loading}
                    onClick={handleConfirm}
                    className="w-full py-4 bg-[#00A89E] hover:bg-[#008C84] text-white font-semibold rounded-full transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-xl"
                  >
                    {loading ? "Confirming Slot..." : "Confirm Consultation"}
                  </button>

                  <button
                    onClick={() => setStep(3)}
                    className="w-full py-1 text-xs text-[#5A6B66] hover:text-[#00A89E] font-medium transition-colors cursor-pointer text-center"
                  >
                    ← Edit Details
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
