import { trackEvent } from "./analytics";

export function openContactModal(source = "unknown") {
  trackEvent("contact_open", { source });
  window.dispatchEvent(new Event("open-contact-modal"));
}

export function closeContactModal() {
  window.dispatchEvent(new Event("close-contact-modal"));
}

export function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;

  const navbarOffset = 110;
  const top =
    el.getBoundingClientRect().top + window.pageYOffset - navbarOffset;

  window.scrollTo({
    top,
    behavior: "smooth",
  });
}

export function trackWhatsAppClick(source = "floating") {
  trackEvent("whatsapp_click", { source });
}

export function trackCtaClick(label, location = "unknown") {
  trackEvent("cta_click", { label, location });
}
