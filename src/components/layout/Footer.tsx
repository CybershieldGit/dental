import React from "react";
import Link from "next/link";
import { clinic } from "@/data/clinic";
import { trackEvent } from "@/lib/analytics";

export default function Footer() {
  const handlePhoneClick = () => {
    trackEvent("phone_click", { source: "footer" });
  };

  const handleWhatsappClick = () => {
    trackEvent("whatsapp_click", { source: "footer" });
  };

  return (
    <footer className="bg-[#F8F8EE] text-[#111816] border-t border-black/8 py-16 relative z-20">
      <div className="container-editorial">
        <div className="container-inner">
          {/* Top row: Brand + Nav */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-14">
          
          {/* Brand Column */}
          <div className="md:col-span-4 flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative h-10 w-auto flex items-center justify-center">
                <img
                  src="/dental_logo.svg"
                  alt="AnjMohi Dental Clinic"
                  className="h-10 w-auto object-contain"
                />
              </div>
            </Link>
            <p className="text-xs text-[#4A5568] max-w-xs leading-relaxed mt-1">
              Advanced dental care combining precision technology, specialist expertise, and boutique patient-first comfort.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#00A89E] mb-4">Explore</h4>
            <ul className="flex flex-col gap-2.5 text-xs text-[#4A5568]">
              <li><Link href="/" className="hover:text-[#00A89E] transition-colors">Home</Link></li>
              <li><a href="#treatments" className="hover:text-[#00A89E] transition-colors">Treatments</a></li>
              <li><a href="#smile-plan" className="hover:text-[#00A89E] transition-colors">Smile Plan</a></li>
              <li><a href="#nri-tourism" className="hover:text-[#00A89E] transition-colors">NRI Tourism</a></li>
              <li><Link href="/blog" className="hover:text-[#00A89E] transition-colors">Blog</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="md:col-span-3">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#00A89E] mb-4">Specialties</h4>
            <ul className="flex flex-col gap-2.5 text-xs text-[#4A5568]">
              <li><a href="#treatments" className="hover:text-[#00A89E] transition-colors">Dental Implants</a></li>
              <li><a href="#treatments" className="hover:text-[#00A89E] transition-colors">Porcelain Veneers</a></li>
              <li><a href="#treatments" className="hover:text-[#00A89E] transition-colors">Clear Aligners</a></li>
              <li><a href="#treatments" className="hover:text-[#00A89E] transition-colors">Microscopic Root Canal</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-3">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#00A89E] mb-4">Contact</h4>
            <ul className="flex flex-col gap-2.5 text-xs text-[#4A5568]">
              <li>
                <a href={`tel:${clinic.phoneRaw}`} onClick={handlePhoneClick} className="hover:text-[#00A89E] transition-colors font-medium">
                  {clinic.phone}
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${clinic.whatsappRaw}`}
                  onClick={handleWhatsappClick}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#00A89E] transition-colors font-medium"
                >
                  WhatsApp Chat
                </a>
              </li>
              <li>
                <a href={`mailto:${clinic.email}`} className="hover:text-[#00A89E] transition-colors">
                  {clinic.email}
                </a>
              </li>
              <li className="text-[#718096] text-[11px] mt-1 leading-relaxed">
                {clinic.address}, {clinic.city}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-black/8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#718096]">
          <span>© {new Date().getFullYear()} AnjMohi Dental Clinic. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[#00A89E] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#00A89E] transition-colors">Terms of Service</a>
          </div>
        </div>
        </div>
      </div>
    </footer>
  );
}
