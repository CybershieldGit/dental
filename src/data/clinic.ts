export interface ClinicConfig {
  name: string;
  tagline: string;
  phone: string;
  phoneRaw: string;
  whatsapp: string;
  whatsappRaw: string;
  status: "open" | "closed";
  statusText: string;
  address: string;
  city: string;
  country: string;
  email: string;
}

export const clinic: ClinicConfig = {
  name: "AnjMohi Dental Clinic",
  tagline: "Your smile, our passion.",
  phone: "+91 99990 12345",
  phoneRaw: "+919999012345",
  whatsapp: "+91 99990 12345",
  whatsappRaw: "919999012345",
  status: "open",
  statusText: "Clinic Open",
  address: "Premium Plaza, Sector 43, Golf Course Road",
  city: "Gurugram",
  country: "India",
  email: "care@anjmohi.in",
};
