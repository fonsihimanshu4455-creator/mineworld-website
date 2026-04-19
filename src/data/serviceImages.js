// Default hero images for each service slug. Used when the admin
// hasn't uploaded a custom image in the Services editor.
// Admin can still override per-service via the heroImage field.
import marketingImg from "../assets/marketing.JPG";
import adsShowcase from "../assets/ads-showcase.jpg";
import editorImg from "../assets/editor.JPG";
import reelsShowcase from "../assets/reels-showcase.jpg";
import podcastShowcase from "../assets/podcast-showcase.jpg";
import productionImg from "../assets/production.JPG";
import designerImg from "../assets/designer.JPG";

const MAP = {
  "digital-marketing": marketingImg,
  "meta-ads": adsShowcase,
  "video-editing": editorImg,
  "social-media": reelsShowcase,
  "shoots": podcastShowcase,
  "podcast-shoots": productionImg,
  "graphic-design": designerImg,
};

// Fallback pool (cycled) for any slug not in MAP
const FALLBACK_POOL = [
  marketingImg,
  editorImg,
  productionImg,
  podcastShowcase,
  reelsShowcase,
  adsShowcase,
];

export function getServiceImage(service, index = 0) {
  if (!service) return null;
  if (service.heroImage) return service.heroImage;
  if (service.slug && MAP[service.slug]) return MAP[service.slug];
  return FALLBACK_POOL[index % FALLBACK_POOL.length];
}
