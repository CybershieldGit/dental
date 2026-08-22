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
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-500"
        onClick={closeOverlay}
      />

      {/* Main Drawer Shell */}
      <div
        ref={containerRef}
        tabIndex={-1}
        className="relative w-full max-w-[600px] h-full bg-[#FFFFF0] text-[#111816] shadow-2xl flex flex-col justify-between overflow-y-auto focus:outline-none"
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-title"
      >
        {/* Header */}
        <div className="p-6 md:p-8 border-b border-black/8 flex items-center justify-between bg-white">
          <div>
            <h2 id="booking-title" className="text-2xl font-serif text-[#111816] font-bold">
              {callbackRequest ? "Request a Callback" : "Book Consultation"}
            </h2>
            <p className="text-xs text-[#4A5568] mt-1">
              {callbackRequest ? "We will reach out during clinical hours" : "Complete our brief structured booking"}
            </p>
          </div>
          <button
            onClick={closeOverlay}
            className="p-2 text-[#718096] hover:text-[#111816] hover:bg-black/5 rounded-full transition-colors cursor-pointer"
            aria-label="Close booking modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success State */}
        {success ? (
          <div className="flex-1 p-6 md:p-8 flex flex-col justify-center items-center text-center gap-6">
            <div className="w-16 h-16 bg-[#00A89E]/10 text-[#00A89E] flex items-center justify-center rounded-full mb-2">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-serif text-[#111816] font-bold">You are Booked</h3>
            <p className="text-sm text-[#4A5568] max-w-sm">
              {callbackRequest
                ? "Your callback request is logged. A care coordinator will phone you shortly."
                : `Thank you, ${bookingState.name || "Patient"}. We have provisionally reserved ${bookingState.date} at ${bookingState.time}. Our coordinator will text or call you to finalize details.`}
            </p>
            <div className="flex flex-col gap-3 w-full max-w-xs mt-4">
              <a
                href={`tel:${clinic.phoneRaw}`}
                className="w-full py-3 bg-[#00A89E] hover:bg-[#008C84] text-white text-center font-semibold rounded-lg transition-all shadow-md"
              >
                Call Clinic Directly
              </a>
              <button
                onClick={() => {
                  resetBooking();
                  closeOverlay();
                }}
                className="w-full py-3 border border-black/15 hover:bg-white text-[#111816] text-center font-medium rounded-lg transition-all cursor-pointer"
              >
                Return to Website
              </button>
            </div>
          </div>
        ) : callbackRequest ? (
          /* Callback Form */
          <form onSubmit={handleCallbackSubmit} className="flex-1 p-6 md:p-8 flex flex-col justify-between">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#718096]">Your Name</label>
                <input
                  required
                  name="name"
                  type="text"
                  placeholder="e.g. Rahul Sharma"
                  className="w-full p-3 bg-white border border-black/15 rounded-lg text-sm text-[#111816] focus:border-[#00A89E] focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#718096]">Contact Number</label>
                <input
                  required
                  name="phone"
                  type="tel"
                  placeholder="e.g. +91 98765 43210"
                  className="w-full p-3 bg-white border border-black/15 rounded-lg text-sm text-[#111816] focus:border-[#00A89E] focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#718096]">Preferred Callback Time</label>
                <select
                  name="preferredTime"
                  className="w-full p-3 bg-white border border-black/15 rounded-lg text-sm text-[#111816] focus:border-[#00A89E] focus:outline-none"
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
              className="w-full py-4 mt-8 bg-[#00A89E] hover:bg-[#008C84] text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              {loading ? "Registering Callback..." : "Submit Callback Request"}
            </button>
          </form>
        ) : (
          /* Booking Step Flow */
          <div className="flex-1 flex flex-col justify-between">
            {/* Step Indicators */}
            <div className="px-6 md:px-8 py-4 bg-white border-b border-black/8 flex items-center justify-between text-xs font-semibold text-[#718096]">
              {STEPS.map((name, i) => (
                <div key={name} className="flex items-center gap-2">
                  <span
                    className={cn(
                      "w-5 h-5 rounded-full flex items-center justify-center border text-[10px]",
                      step === i + 1
                        ? "bg-[#00A89E] text-white border-[#00A89E]"
                        : step > i + 1
                        ? "bg-[#00A89E] text-white border-[#00A89E]"
                        : "bg-transparent border-black/20 text-[#718096]"
                    )}
                  >
                    {step > i + 1 ? <Check className="w-3 h-3" /> : i + 1}
                  </span>
                  <span className={cn("hidden sm:inline", step === i + 1 && "text-[#111816] font-bold")}>
                    {name}
                  </span>
                </div>
              ))}
            </div>

            {/* Step Content */}
            <div className="flex-1 p-6 md:p-8">
              {step === 1 && (
                <div className="flex flex-col gap-6">
                  <h3 className="text-lg font-serif text-[#111816] font-bold">What would you like help with?</h3>
                  <div className="grid grid-cols-1 gap-3">
                    {[
                      "Pain or discomfort",
                      "Smile improvement",
                      "Missing tooth",
                      "Straight teeth",
                      "General check-up",
                      "I'm not sure"
                    ].map((concernOption) => (
                      <button
                        key={concernOption}
                        onClick={() => handleConcernSelect(concernOption)}
                        className="w-full p-4 bg-white hover:bg-[#F0FAF9] border border-black/10 hover:border-[#00A89E] rounded-xl text-left text-sm font-medium text-[#111816] hover:text-[#00A89E] transition-all flex items-center justify-between group cursor-pointer shadow-xs"
                      >
                        <span>{concernOption}</span>
                        <ChevronRight className="w-4 h-4 text-[#718096] group-hover:text-[#00A89E] group-hover:translate-x-1 transition-all" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="flex flex-col gap-6">
                  <h3 className="text-lg font-serif text-[#111816] font-bold">Select a Date & Time</h3>
                  
                  <div className="flex flex-col gap-3">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#718096]">Available Days</span>
                    <div className="grid grid-cols-2 gap-2">
                      {dates.map((d) => (
                        <button
                          key={d.value}
                          type="button"
                          onClick={() => handleDateSelect(d.label, timeSlots[0])}
                          className="p-3 bg-white hover:bg-[#F0FAF9] border border-black/10 hover:border-[#00A89E] rounded-lg text-sm font-medium text-[#111816] hover:text-[#00A89E] transition-all cursor-pointer shadow-xs"
                        >
                          {d.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 mt-4">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#718096]">Available Times (Demo Slots)</span>
                    <div className="grid grid-cols-4 gap-2">
                      {timeSlots.map((ts) => (
                        <button
                          key={ts}
                          type="button"
                          onClick={() => handleDateSelect("Today", ts)}
                          className="p-2 text-xs bg-white hover:bg-[#00A89E] hover:text-white rounded border border-black/10 transition-all cursor-pointer shadow-xs font-medium"
                        >
                          {ts}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <form onSubmit={handleDetailsSubmit} className="flex flex-col gap-6">
                  <h3 className="text-lg font-serif text-[#111816] font-bold">Your Details</h3>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#718096]">Your Name</label>
                    <input
                      required
                      name="name"
                      type="text"
                      placeholder="e.g. Nitin Gupta"
                      className="w-full p-3 bg-white border border-black/15 rounded-lg text-sm text-[#111816] focus:border-[#00A89E] focus:outline-none"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#718096]">Phone Number</label>
                    <input
                      required
                      name="phone"
                      type="tel"
                      placeholder="e.g. +91 99990 11111"
                      className="w-full p-3 bg-white border border-black/15 rounded-lg text-sm text-[#111816] focus:border-[#00A89E] focus:outline-none"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#718096]">Email Address (Optional)</label>
                    <input
                      name="email"
                      type="email"
                      placeholder="e.g. nitin@example.com"
                      className="w-full p-3 bg-white border border-black/15 rounded-lg text-sm text-[#111816] focus:border-[#00A89E] focus:outline-none"
                    />
                  </div>

                  <div className="flex items-center gap-3 py-2">
                    <input id="whatsapp-updates" name="whatsapp" type="checkbox" defaultChecked className="w-4 h-4 accent-[#00A89E]" />
                    <label htmlFor="whatsapp-updates" className="text-xs text-[#4A5568]">
                      Send provisional booking details & updates via WhatsApp
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-[#00A89E] hover:bg-[#008C84] text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <span>Continue</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </form>
              )}

              {step === 4 && (
                <div className="flex flex-col gap-6">
                  <h3 className="text-lg font-serif text-[#111816] font-bold">Confirm Provisional Booking</h3>
                  <div className="bg-white border border-black/8 rounded-xl p-6 flex flex-col gap-4 text-sm text-[#111816] shadow-sm">
                    <div className="flex justify-between border-b border-black/8 pb-2">
                      <span className="text-[#718096] font-medium">Concern:</span>
                      <span className="font-bold text-[#111816]">{bookingState.concern}</span>
                    </div>
                    <div className="flex justify-between border-b border-black/8 pb-2">
                      <span className="text-[#718096] font-medium">Reserved Slot:</span>
                      <span className="font-bold text-[#111816]">{bookingState.date} at {bookingState.time}</span>
                    </div>
                    <div className="flex justify-between border-b border-black/8 pb-2">
                      <span className="text-[#718096] font-medium">Full Name:</span>
                      <span className="font-bold text-[#111816]">{bookingState.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#718096] font-medium">Contact:</span>
                      <span className="font-bold text-[#111816]">{bookingState.phone}</span>
                    </div>
                  </div>

                  <button
                    disabled={loading}
                    onClick={handleConfirm}
                    className="w-full py-4 bg-[#00A89E] hover:bg-[#008C84] text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    {loading ? "Confirming..." : "Confirm Provisional Booking"}
                  </button>

                  <button
                    onClick={() => setStep(3)}
                    className="w-full py-2.5 text-xs text-[#718096] hover:text-[#00A89E] font-medium underline transition-colors cursor-pointer"
                  >
                    Modify details
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
