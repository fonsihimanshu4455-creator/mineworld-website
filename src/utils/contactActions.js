export function openContactModal() {
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