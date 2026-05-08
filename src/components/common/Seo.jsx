import { Helmet } from "react-helmet-async";
import { useSiteSettings } from "../../admin/hooks";
import { siteConfig as defaultSiteConfig } from "../../data/siteConfig";

const SITE_NAME = "Mineworld Production";
const SITE_URL = "https://mineworldproduction.com";
const DEFAULT_DESCRIPTION =
  "Mineworld Production — Delhi-based content & digital growth studio. Premium video editing, websites, mobile apps, ad campaigns, and social media systems built for real businesses.";

function Seo({
  title,
  description,
  image,
  path = "",
  type = "website",
  noIndex = false,
  jsonLd,
}) {
  const settings = useSiteSettings(defaultSiteConfig);
  const finalDescription =
    description ||
    settings.seo?.defaultDescription ||
    DEFAULT_DESCRIPTION;
  const finalImage = image || settings.seo?.defaultOgImage || "/og-cover.jpg";
  const brandName = settings.brand?.name || SITE_NAME;
  const siteUrl = settings.brand?.website || SITE_URL;

  const fullTitle = title
    ? `${title} | ${brandName}`
    : `${brandName} — Delhi Content & Digital Growth Studio`;
  const url = path ? `${siteUrl}${path}` : siteUrl;
  const absImage = finalImage?.startsWith("http")
    ? finalImage
    : `${siteUrl}${finalImage}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={finalDescription} />
      <link rel="canonical" href={url} />
      {noIndex ? <meta name="robots" content="noindex, nofollow" /> : null}

      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={absImage} />
      <meta property="og:site_name" content={brandName} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={absImage} />

      {jsonLd ? (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      ) : null}
    </Helmet>
  );
}

export default Seo;
