"use client";

import React, { useState, useRef, useEffect } from "react";
import { useOverlay } from "../layout/OverlayProvider";
import { X, Upload, Check } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

export default function NRIBookingOverlay() {
  const { activeOverlay, closeOverlay, openOverlay } = useOverlay();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeOverlay === "nri") {
      containerRef.current?.focus();
      setSuccess(false);
      setFile(null);
    }
  }, [activeOverlay]);

  if (activeOverlay !== "nri") return null;

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const country = formData.get("country") as string;
    const treatment = formData.get("treatment") as string;

    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLoading(false);
    setSuccess(true);
    trackEvent("nri_form_completed", { country, treatment });
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-spruce-deep/75 backdrop-blur-sm transition-opacity duration-500"
        onClick={closeOverlay}
      />

      {/* Main Drawer Shell */}
      <div
        ref={containerRef}
        tabIndex={-1}
        className="relative w-full max-w-[650px] h-full bg-alabaster shadow-overlay flex flex-col justify-between overflow-y-auto focus:outline-none"
        role="dialog"
        aria-modal="true"
        aria-labelledby="nri-title"
      >
        {/* Header */}
        <div className="p-6 md:p-8 border-b border-border flex items-center justify-between">
          <div>
            <h2 id="nri-title" className="text-2xl font-serif text-spruce font-semibold">
              NRI & International Patient Inquiry
            </h2>
            <p className="text-xs text-text-secondary mt-1">
              Coordinate your travel itinerary with custom-fast-track treatments
            </p>
          </div>
          <button
            onClick={closeOverlay}
            className="p-2 text-text-secondary hover:text-spruce hover:bg-paper rounded-full transition-colors cursor-pointer"
            aria-label="Close NRI inquiry modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success state */}
        {success ? (
          <div className="flex-1 p-6 md:p-8 flex flex-col justify-center items-center text-center gap-6">
            <div className="w-16 h-16 bg-clinical-green/10 text-clinical-green flex items-center justify-center rounded-full mb-2">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-serif text-spruce font-bold">Inquiry Received</h3>
            <p className="text-sm text-text-secondary max-w-sm">
              We have received your coordinates and file uploads. A dental tourism coordinator will email or text you within 24 hours to schedule a preliminary virtual consultation.
            </p>
            <button
              onClick={closeOverlay}
              className="w-full max-w-xs py-3 bg-spruce hover:bg-clinical-green text-alabaster font-medium rounded-lg transition-editorial cursor-pointer"
            >
              Return to Portal
            </button>
          </div>
        ) : (
          /* Form layout */
          <form onSubmit={handleSubmit} className="flex-1 p-6 md:p-8 flex flex-col justify-between">
            <div className="flex flex-col gap-5">
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-text-secondary">Country of Residence</label>
                  <input
                    required
                    name="country"
                    type="text"
                    placeholder="e.g. United Kingdom"
                    className="p-3 bg-white border border-border rounded-lg text-sm focus:border-clinical-green focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-text-secondary">Current City</label>
                  <input
                    required
                    name="city"
                    type="text"
                    placeholder="e.g. London"
                    className="p-3 bg-white border border-border rounded-lg text-sm focus:border-clinical-green focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-text-secondary">Treatment of Interest</label>
                <select
                  name="treatment"
                  className="p-3 bg-white border border-border rounded-lg text-sm focus:border-clinical-green focus:outline-none text-text-primary"
                >
                  <option>Full Smile Rehabilitation</option>
                  <option>Implants / Full-Arch Implants</option>
                  <option>Clear Aligners / Invisalign</option>
                  <option>Aesthetic Porcelain Veneers</option>
                  <option>I'm not sure - General Assessment</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-text-secondary">Preferred Travel Window</label>
                  <input
                    name="travelDates"
                    type="text"
                    placeholder="e.g. Mid October 2026"
                    className="p-3 bg-white border border-border rounded-lg text-sm focus:border-clinical-green focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-text-secondary">Full Name</label>
                  <input
                    required
                    name="name"
                    type="text"
                    placeholder="e.g. Priyesh Patel"
                    className="p-3 bg-white border border-border rounded-lg text-sm focus:border-clinical-green focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-text-secondary">Email Address</label>
                  <input
                    required
                    name="email"
                    type="email"
                    placeholder="e.g. priyesh@example.com"
                    className="p-3 bg-white border border-border rounded-lg text-sm focus:border-clinical-green focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-text-secondary">WhatsApp Number</label>
                  <input
                    required
                    name="phone"
                    type="tel"
                    placeholder="e.g. +44 7911 123456"
                    className="p-3 bg-white border border-border rounded-lg text-sm focus:border-clinical-green focus:outline-none"
                  />
                </div>
              </div>

              {/* Drag & Drop File Upload */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
                  Upload OPG / X-Ray / Dental Records (Optional)
                </label>
                <div
                  onDragEnter={handleDrag}
                  onDragOver={handleDrag}
                  onDragLeave={handleDrag}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-xl p-6 text-center transition-editorial relative flex flex-col items-center justify-center gap-2 cursor-pointer ${
                    dragActive ? "border-clinical-green bg-clinical-green/5" : "border-border hover:border-gold bg-white"
                  }`}
                >
                  <input
                    type="file"
                    id="file-upload"
                    multiple={false}
                    accept=".pdf,.png,.jpg,.jpeg"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <Upload className="w-8 h-8 text-text-muted" />
                  <span className="text-xs text-text-secondary font-medium">
                    {file ? `Selected file: ${file.name}` : "Drag and drop your file here, or click to browse"}
                  </span>
                  <span className="text-[10px] text-text-muted">
                    Supports PDF, PNG, JPG (Max size 10MB)
                  </span>
                </div>
              </div>

            </div>

            <div className="mt-8 flex flex-col gap-4">
              <span className="text-[10px] text-text-muted block text-center">
                Your medical files and contact details are fully encrypted and private, shared only with the treating specialists.
              </span>
              <button
                disabled={loading}
                type="submit"
                className="w-full py-4 bg-spruce hover:bg-clinical-green text-alabaster font-semibold rounded-lg transition-editorial flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? "Registering Inquiry Details..." : "Request Travel Assessment"}
              </button>
            </div>

          </form>
        )}
      </div>
    </div>
  );
}
