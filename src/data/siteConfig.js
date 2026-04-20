export const siteConfig = {
  brand: {
    name: "Mineworld Production",
    shortName: "Mineworld",
    website: "https://mineworldproduction.com",
  },

  contact: {
    whatsappNumber: "919758850933",
    email: "mineworldproduction4455@gmail.com",
    address: "Mayur Vihar Phase 1, Delhi, 110091",
  },

  social: {
    instagram:
      "https://www.instagram.com/mineworld.production?igsh=MTIyYzZpOXdicXl6aw==",
  },

  integrations: {
    sheetWebhook:
      import.meta.env.VITE_SHEET_WEBHOOK_URL ||
      "https://script.google.com/macros/s/AKfycby-F_y5bbvEwCapMtOn74W7j9t65l9KnL1-bzY1gpeeS7Tbr0xc3YQrQYnW3pdi8E_bvg/exec",
  },
};