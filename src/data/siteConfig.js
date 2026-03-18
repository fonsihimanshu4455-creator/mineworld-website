export const siteConfig = {
  brand: {
    name: "Mineworld Production",
    shortName: "Mineworld",
    tagline: "Content + Editing + Digital Growth Studio",
    website: "https://mineworldproduction.com",
  },

  contact: {
    whatsappNumber: "919758850933",
    whatsappMessage:
      "Hi Mineworld Production, I want to discuss a project for editing, content, podcast shoots, design, or digital growth.",
    email: "mineworldproduction@gmail.com",
    address: "Mayur Vihar Phase 1, Delhi, 110091",
  },

  social: {
    instagram:
      "https://www.instagram.com/mineworld.production?igsh=MTIyYzZpOXdicXl6aw==",
    facebook: "",
    youtube: "",
  },

  form: {
    // Formspree dashboard se apna real endpoint yahan daalna
    // Example: https://formspree.io/f/xblyqzzz
    endpoint: "https://formspree.io/f/YOUR_FORM_ID",
  },
};

export const whatsappLink = `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(
  siteConfig.contact.whatsappMessage
)}`;