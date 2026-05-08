const SITE_URL = "https://mineworldproduction.com";

export function organizationLd(settings = {}) {
  const url = settings.brand?.website || SITE_URL;
  const name = settings.brand?.name || "Mineworld Production";
  const phone = settings.contact?.whatsappNumber
    ? `+${settings.contact.whatsappNumber}`
    : "+919758850933";
  const email = settings.contact?.email || "mineworldproduction4455@gmail.com";
  const address = settings.contact?.address || "Mayur Vihar Phase 1, Delhi, 110091";

  const sameAs = [
    settings.social?.instagram,
    settings.social?.facebook,
    settings.social?.youtube,
    settings.social?.linkedin,
  ].filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    url,
    logo: `${url}/og-cover.jpg`,
    email,
    telephone: phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: address,
      addressCountry: "IN",
    },
    sameAs: sameAs.length ? sameAs : undefined,
  };
}

export function websiteLd(settings = {}) {
  const url = settings.brand?.website || SITE_URL;
  const name = settings.brand?.name || "Mineworld Production";
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name,
    url,
  };
}

export function serviceLd(service, settings = {}) {
  const url = settings.brand?.website || SITE_URL;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.short || service.tagline,
    serviceType: service.name,
    provider: {
      "@type": "Organization",
      name: settings.brand?.name || "Mineworld Production",
      url,
    },
    areaServed: "IN",
  };
}

export function reviewAggregateLd(testimonials = [], settings = {}) {
  const rated = testimonials.filter((t) => Number(t.rating) > 0);
  if (!rated.length) return null;
  const avg = (
    rated.reduce((acc, t) => acc + Number(t.rating || 0), 0) / rated.length
  ).toFixed(1);

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: settings.brand?.name || "Mineworld Production",
    url: settings.brand?.website || SITE_URL,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: avg,
      reviewCount: rated.length,
      bestRating: "5",
      worstRating: "1",
    },
    review: rated.slice(0, 6).map((t) => ({
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: String(t.rating || 5),
        bestRating: "5",
      },
      author: {
        "@type": "Person",
        name: t.author || t.name || "Client",
      },
      reviewBody: t.quote || "",
    })),
  };
}

export function breadcrumbLd(items = []) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
