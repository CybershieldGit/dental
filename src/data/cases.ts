export interface CaseStudy {
  id: string;
  title: string;
  subtitle: string;
  patientConcern: string;
  clinicalAssessment: string;
  treatmentPerformed: string;
  duration: string;
  appointments: number;
  doctor: string;
  technologyUsed: string[];
  beforeImage: string;
  afterImage: string;
  outcome: string;
}

export const cases: CaseStudy[] = [
  {
    id: "full-smile-makeover",
    title: "Full Smile Makeover",
    subtitle: "Aesthetic Restoration & Veneers",
    patientConcern: "Patient presented with dark, worn, and misaligned front teeth, causing severe social anxiety and loss of smiling confidence.",
    clinicalAssessment: "Mild enamel erosion, discolouration due to past fluorosis, and minor crowded spacing on the upper jaw.",
    treatmentPerformed: "6 Premium Porcelain Veneers combined with mineral whitening therapy on the lower arch.",
    duration: "6 weeks",
    appointments: 4,
    doctor: "Dr. Karan Mehta",
    technologyUsed: ["Digital Smile Design (DSD)", "Intraoral Scanner", "Micro-Ceramic Veneering"],
    beforeImage: "/images/before-smile.jpg",
    afterImage: "/images/after-smile.jpg",
    outcome: "Restored symmetry, balanced natural tooth width-to-height ratio, and brightened shading. Patient reports fully restored self-confidence.",
  }
];
