export interface SmilePlanOption {
  id: string;
  name: string;
  monthlyPrice: number;
  annualPrice: number;
  benefits: string[];
}

export interface PricingComparison {
  treatmentName: string;
  standardCost: number;
  memberCost: number;
}

export const smilePlans: SmilePlanOption[] = [
  {
    id: "individual",
    name: "Individual Membership",
    monthlyPrice: 999,
    annualPrice: 9990,
    benefits: [
      "2 Preventive Cleanings & Checkups per year",
      "All necessary diagnostics & digital intraoral X-rays",
      "15% Savings on general restorations (fillings, root canals)",
      "10% Savings on advanced treatments (crowns, implants, aligners)",
      "Priority same-day emergency appointment booking"
    ],
  },
  {
    id: "family",
    name: "Family Membership (Up to 4)",
    monthlyPrice: 2999,
    annualPrice: 29990,
    benefits: [
      "2 Preventive Cleanings & Checkups per year per member",
      "Comprehensive X-rays and assessments for the family",
      "20% Savings on pediatric preventive & fluoride therapies",
      "15% Savings on restorations & 10% on major procedures",
      "Dedicated concierge support and flexible bookings"
    ],
  }
];

export const pricingComparisons: PricingComparison[] = [
  { treatmentName: "Routine Hygiene Cleansing", standardCost: 4000, memberCost: 0 },
  { treatmentName: "Microscopic Root Canal + Crown", standardCost: 22000, memberCost: 18700 },
  { treatmentName: "Bespoke Porcelain Veneer (Per Tooth)", standardCost: 24000, memberCost: 21600 },
  { treatmentName: "Computer-Guided Dental Implant", standardCost: 55000, memberCost: 49500 },
  { treatmentName: "General Composite Filling", standardCost: 35000, memberCost: 29750 } // Multi-teeth composite
];
