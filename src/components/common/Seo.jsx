import { Helmet } from "react-helmet-async";

const DEFAULTS = {
  siteName: "Mineworld Production",
  siteUrl: "https://mineworldproduction.com",
  description:
    "Mineworld Production — Delhi-based content & digital growth studio. Premium video editing, websites, mobile apps, ad campaigns, and social media systems built for real businesses.",
  image: "/og-cover.jpg",
  twitter: "@mineworld",
};

function Seo({
  title,
  description = DEFAULTS.description,
  image = DEFAULTS.image,
  path = "",
  type = "website",
  noIndex = false,
}) {
  const fullTitle = title
    ? `${title} | ${DEFAULTS.siteName}`
    : `${DEFAULTS.siteName} — Delhi Content & Digital Growth Studio`;
  const url = path ? `${DEFAULTS.siteUrl}${path}` : DEFAULTS.siteUrl;
  const absImage = image?.startsWith("http")
    ? image
    : `${DEFAULTS.siteUrl}${image}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noIndex ? <meta name="robots" content="noindex, nofollow" /> : null}

      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={absImage} />
      <meta property="og:site_name" content={DEFAULTS.siteName} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={absImage} />
    </Helmet>
  );
}

export default Seo;
