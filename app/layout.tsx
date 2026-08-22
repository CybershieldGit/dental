import "./globals.css";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import ClientLayout from "@/components/layout/ClientLayout";
import type { Metadata } from "next";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AnjMohi Dental Clinic — Live the Brighter Version",
  description:
    "Premium dental care clinic offering cosmetic dentistry, implants, clear aligners, and preventive treatments. Expert team, advanced technology, and a comfortable patient-first experience.",
  keywords: [
    "dental clinic",
    "AnjMohi dental",
    "cosmetic dentistry",
    "dental implants",
    "clear aligners",
    "teeth whitening",
    "dental care",
  ],
  openGraph: {
    title: "AnjMohi Dental Clinic",
    description:
      "Experience dental excellence — advanced technology, specialist care, and beautiful results.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#FFFFF0] text-[#111816] font-sans">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
