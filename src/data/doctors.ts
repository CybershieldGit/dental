export interface Doctor {
  id: string;
  name: string;
  role: string;
  qualifications: string;
  experience: string;
  interests: string[];
  bio: string;
  image: string;
}

export const doctors: Doctor[] = [
  {
    id: "dr-karan-anand",
    name: "Dr. Karan Anand",
    role: "Clinical Director & Implantologist",
    qualifications: "BDS, MDS (Oral Implantology), Fellow of ICOI",
    experience: "16 Years",
    interests: ["Computer-Guided Implants", "Full-Arch Rehabilitation", "Bone Grafting"],
    bio: "Dr. Anand specializes in micro-surgical implant placements, combining digital diagnostic workflows with advanced clinical techniques.",
    image: "/images/dr-karan.jpg",
  },
  {
    id: "dr-aparna-ghosh",
    name: "Dr. Aparna Ghosh",
    role: "Lead Aesthetic & Restorative Specialist",
    qualifications: "BDS, DDS (Aesthetic Dentistry)",
    experience: "12 Years",
    interests: ["Porcelain Veneers", "Digital Smile Design", "Minimally Invasive Dentistry"],
    bio: "Dr. Ghosh brings an artist's precision to smile transformations, utilizing ultra-conservative preparation protocols for maximum tooth preservation.",
    image: "/images/dr-aparna.jpg",
  },
  {
    id: "dr-prathap-shanker",
    name: "Dr. Prathap Shanker",
    role: "Oral & Maxillofacial Surgeon",
    qualifications: "BDS, MDS (Oral Surgery)",
    experience: "10 Years",
    interests: ["Wisdom Teeth Surgery", "Jaw Correction", "Dental Trauma"],
    bio: "Dr. Shanker is specialized in complex surgical procedures with a focus on minimally invasive techniques and rapid patient recovery.",
    image: "/images/dr-prathap.jpg",
  },
  {
    id: "dr-kevin-mathew",
    name: "Dr. Kevin Mathew",
    role: "Orthodontist & Aligner Specialist",
    qualifications: "BDS, MDS (Orthodontics)",
    experience: "8 Years",
    interests: ["Clear Aligners", "Invisible Braces", "Early Intervention"],
    bio: "Dr. Mathew is passionate about creating beautiful, aligned smiles using the latest in clear aligner technology and digital treatment planning.",
    image: "/images/dr-kevin.jpg",
  },
];
