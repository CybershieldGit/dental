type TrackableEvent =
  | { type: "hero_book_click"; data?: never }
  | { type: "phone_click"; data: { source: string } }
  | { type: "whatsapp_click"; data: { source: string } }
  | { type: "treatment_category_select"; data: { category: string } }
  | { type: "treatment_detail_open"; data: { slug: string } }
  | { type: "case_study_open"; data: { id: string } }
  | { type: "case_study_cta_click"; data: { id: string } }
  | { type: "smile_plan_view"; data: { planId: string } }
  | { type: "calculator_started"; data?: never }
  | { type: "calculator_completed"; data: { treatment: string; savings: number } }
  | { type: "nri_form_started"; data?: never }
  | { type: "nri_form_completed"; data: { country: string; treatment: string } }
  | { type: "booking_started"; data?: never }
  | { type: "booking_step_completed"; data: { step: number; value?: string } }
  | { type: "booking_completed"; data: { concern: string; date: string } }
  | { type: "booking_abandoned"; data: { step: number } }
  | { type: "blog_search"; data: { query: string } }
  | { type: "blog_filter"; data: { filter: string } };

export const trackEvent = (event: TrackableEvent["type"], data?: any) => {
  if (process.env.NODE_ENV === "development") {
    console.log(`[Analytics Event Logged] : ${event}`, data || "");
  }
  // Hook up provider-agnostic analytics scripts below if desired in future
};
