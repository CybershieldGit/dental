export interface BookingState {
  concern?: string;
  date?: string;
  time?: string;
  name?: string;
  phone?: string;
  email?: string;
  whatsapp?: string;
  message?: string;
}

export type CallbackRequest = {
  name: string;
  phone: string;
  preferredTime: string;
};
