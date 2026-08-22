export interface TreatmentDetail {
  slug: string;
  category: string;
  title: string;
  shortDescription: string;
  whoItIsFor: string[];
  steps: { title: string; desc: string }[];
  timeline: string;
  technologies: string[];
  doctor: string;
  estimatedCostRange: string;
  image: string;
}

export const treatments: TreatmentDetail[] = [
  {
    slug: "dental-implants",
    category: "Restorative",
    title: "Dental Implants",
    shortDescription: "Replace what is missing. Restore natural chewing function and aesthetic confidence.",
    whoItIsFor: [
      "Patients with single or multiple missing teeth",
      "Those looking to replace unstable, loose dentures",
      "Patients wanting to preserve jawbone structure after tooth loss"
    ],
    steps: [
      { title: "3D Diagnostics & Planning", desc: "CBCT scanning and virtual software simulations to map bone density and precise implant pathing." },
      { title: "Surgical Placement", desc: "Guided titanium fixture placement under gentle local anesthesia or conscious sedation." },
      { title: "Biological Integration", desc: "A quiet healing phase of 3-4 months allowing the implant to fuse naturally with the jawbone." },
      { title: "Crown Restoration", desc: "Affixing a bespoke, handcrafted zirconium crown that mimics natural light reflection." }
    ],
    timeline: "3 to 6 months depending on bone density",
    technologies: ["3D CBCT Scanner", "Guided Surgery Templates", "Zirconia Cad-Cam Crowns"],
    doctor: "Dr. Ananya Sharma",
    estimatedCostRange: "₹35,000 - ₹85,000",
    image: "/images/implants.jpg",
  },
  {
    slug: "porcelain-veneers",
    category: "Aesthetic",
    title: "Porcelain Veneers",
    shortDescription: "Ultra-thin custom porcelain shells bonded to the front of teeth for aesthetic correction.",
    whoItIsFor: [
      "Patients addressing persistent tooth discolouration",
      "Restoring minor chips, uneven spacing, or surface wear",
      "Those wanting a natural, harmonious smile transformation"
    ],
    steps: [
      { title: "Digital Smile Mockup", desc: "Taking digital impressions to design and preview your proposed smile layout before modifying any teeth." },
      { title: "Conservative Preparation", desc: "Removing a micro-thin layer of enamel (often under 0.5mm) to accommodate the veneer spacing." },
      { title: "Artisan Fabrication", desc: "Our lab technicians sculpt individual porcelain restorations with custom shading." },
      { title: "Adhesive Bonding", desc: "Meticulous bonding of veneers to the enamel surface using light-cured resin adhesives." }
    ],
    timeline: "2 visits over 7-10 days",
    technologies: ["Digital Smile Design (DSD)", "Intraoral Scanning", "Artisan Ceramics"],
    doctor: "Dr. Karan Mehta",
    estimatedCostRange: "₹18,000 - ₹30,000 per tooth",
    image: "/images/veneers.jpg",
  },
  {
    slug: "clear-aligners",
    category: "Aligners",
    title: "Clear Aligners",
    shortDescription: "Nearly invisible, removable custom aligners that gently guide teeth into alignment.",
    whoItIsFor: [
      "Mild to moderate crowding or spacing issues",
      "Relapse cases after previous orthodontic treatments",
      "Professionals seeking a discreet orthodontic alternative"
    ],
    steps: [
      { title: "Digital Orthodontic Scan", desc: "Capturing a fast 3D map of your dental arches without messy impression molds." },
      { title: "3D Animation Simulation", desc: "Previewing the step-by-step movement path of your teeth from start to final position." },
      { title: "Aligner Set Production", desc: "Receiving your customized series of BPA-free medical-grade plastic aligner trays." },
      { title: "Sequential Changes", desc: "Wearing each tray set for 20-22 hours daily, switching to the next set every 7-14 days." }
    ],
    timeline: "6 to 18 months depending on complexity",
    technologies: ["3D Intraoral Scanner", "Orthodontic Planning Software"],
    doctor: "Dr. Karan Mehta",
    estimatedCostRange: "₹65,000 - ₹1,80,000",
    image: "/images/aligners.jpg",
  },
  {
    slug: "root-canal-treatment",
    category: "Restorative",
    title: "Microscopic Root Canal",
    shortDescription: "Saving a deeply infected or damaged tooth using advanced micro-endodontics.",
    whoItIsFor: [
      "Patients experiencing acute tooth pain or heat/cold sensitivity",
      "Teeth with deep decay extending into the inner nerve tissue",
      "Traumatized teeth with underlying nerve inflammation"
    ],
    steps: [
      { title: "Diagnostic Digital Imaging", desc: "Targeted digital X-rays to map the root canal architecture and trace the infection bounds." },
      { title: "Nerve Cleaning & Disinfection", desc: "Using high-magnification microscopes and rotary instruments to thoroughly clean infected canals." },
      { title: "Biocompatible Sealing", desc: "Filling the disinfected root canals with gutta-percha sealants to prevent future bacterial intrusion." },
      { title: "Structural Crown Placement", desc: "Rebuilding the tooth's structural strength with a composite core and defensive crown." }
    ],
    timeline: "1 to 2 visits",
    technologies: ["Dental Operating Microscope", "Rotary Endodontics", "Apex Locator"],
    doctor: "Dr. Ananya Sharma",
    estimatedCostRange: "₹8,500 - ₹15,000",
    image: "/images/root-canal.jpg",
  },
  {
    slug: "preventive-care",
    category: "Preventive",
    title: "Preventive & Hygiene Cleanse",
    shortDescription: "Preserving natural gum health and tooth structure through precise preventive cleaning and assessments.",
    whoItIsFor: [
      "Everyone requiring routine check-ups every 6 months",
      "Patients seeking to prevent gum recession or plaque build-up",
      "Early stage detection of cavities or structural wear"
    ],
    steps: [
      { title: "Comprehensive Scan", desc: "Detailed intraoral inspection and cavity scanning to detect early signs of compromise." },
      { title: "Ultrasonic Scaling", desc: "Removing mineralized plaque, calculus, and surface staining using smooth ultrasonic scalers." },
      { title: "Polishing & Mineral Therapy", desc: "Smoothing tooth surfaces and applying mineralizing therapy to strengthen vulnerable enamel." }
    ],
    timeline: "45 - 60 minutes",
    technologies: ["Ultrasonic Scalers", "Intraoral HD Cameras"],
    doctor: "Dr. Karan Mehta",
    estimatedCostRange: "₹2,500 - ₹5,000",
    image: "/images/preventive.jpg",
  },
  {
    slug: "wisdom-teeth-surgery",
    category: "Surgical",
    title: "Wisdom Teeth Microsurgery",
    shortDescription: "Minimally invasive removal of impacted wisdom teeth to prevent crowding and discomfort.",
    whoItIsFor: [
      "Patients with pain, swelling, or pressure behind the second molars",
      "Impacted teeth causing localized gum inflammation",
      "Preventive removal to avoid root damage on adjacent teeth"
    ],
    steps: [
      { title: "3D Nerve Mapping", desc: "Assessing relationship between wisdom tooth roots and sensory nerves using high-resolution CBCT scan." },
      { title: "At-Ease Anesthesia", desc: "Administering precise computerized local anesthesia to numb the surgical area completely." },
      { title: "Gentle Extraction", desc: "Sectioning the tooth carefully to remove it with minimal bone disruption." },
      { title: "Regenerative Dressing", desc: "Placing platelet-rich fibrin or sutures to promote clean, rapid tissue healing." }
    ],
    timeline: "1 visit (30-60 mins), healing in 3-5 days",
    technologies: ["3D CBCT Scanner", "Piezoelectric Surgical Unit"],
    doctor: "Dr. Ananya Sharma",
    estimatedCostRange: "₹8,000 - ₹18,000",
    image: "/images/surgery.jpg",
  }
];
