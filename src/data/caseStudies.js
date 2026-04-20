import adsShowcase from "../assets/ads-showcase.jpg";
import adsShowcase1 from "../assets/ads-showcase1.jpg";
import reelsShowcase from "../assets/reels-showcase.jpg";
import reelsShowcase1 from "../assets/reels-showcase1.jpg";
import podcastShowcase from "../assets/podcast-showcase.jpg";
import podcastShowcase1 from "../assets/podcast-showcase1.jpg";
import podcastShowcase2 from "../assets/podcast-showcase2.jpg";
import portfolio1 from "../assets/portfolio-1.mp4";
import portfolio2 from "../assets/portfolio-2.mp4";
import portfolio3 from "../assets/portfolio-3.mp4";

export const caseStudies = [
  {
    slug: "aesthetic-clinic-lead-generation",
    eyebrow: "Aesthetic Clinic Campaign",
    title: "32 qualified leads in 7 days for a Delhi aesthetic clinic",
    summary:
      "A paid Meta ads + reels creative system built around a single high-intent offer — engineered for booked consultations, not vanity reach.",
    industry: "Aesthetic & Wellness Clinic",
    location: "Delhi NCR",
    timeline: "7 days",
    services: [
      "Meta Ads",
      "Reels Creative",
      "Ad Copywriting",
      "Funnel Alignment",
    ],
    heroMedia: {
      type: "image",
      src: adsShowcase,
      alt: "Meta ad creative for Delhi aesthetic clinic lead generation campaign",
    },
    metrics: [
      { label: "Qualified Leads", before: "4 / week", after: "32 in 7 days" },
      { label: "Cost Per Lead", before: "₹480", after: "₹135" },
      { label: "Ad CTR", before: "0.8%", after: "3.2%" },
      { label: "Booked Consults", before: "1–2 / week", after: "11 in 7 days" },
    ],
    challenge:
      "The clinic was running Meta ads on their own but getting low-intent form fills and very few real consultation bookings. The creative felt like a generic clinic ad — no clear hook, no reason to stop scrolling, and no sharp offer.",
    approach: [
      "Repositioned the offer around one high-intent treatment instead of listing every service.",
      "Built a 3-variant reel system — each with a different hook targeting a distinct pain point.",
      "Rewrote the ad copy to lead with outcome, not features, and added a friction-free WhatsApp CTA.",
      "Aligned the landing message + ad creative + form questions so leads arrived pre-qualified.",
    ],
    execution: [
      "Shot 3 short-form ad creatives with the clinic's doctor on camera for trust.",
      "Edited retention-first — first 1.2 seconds engineered for thumb-stop.",
      "Launched a 3-day test budget to find the winning combination before scaling.",
      "Scaled the winning creative to a 7-day lead generation campaign with daily review.",
    ],
    gallery: [
      { type: "image", src: adsShowcase, alt: "Ad creative v1" },
      { type: "image", src: adsShowcase1, alt: "Ad creative v2" },
      { type: "video", src: portfolio3, alt: "Reel creative sample" },
    ],
    testimonial: {
      quote:
        "Humne pehli baar itne genuine inquiries dekhe — 7 din mein hi calendar bhar gaya. Creative aur ad dono alag level pe thay.",
      author: "Clinic Owner",
      role: "Aesthetic Clinic, Delhi",
    },
    nextSteps:
      "Mineworld now manages this clinic's monthly ad creative + campaign management on retainer.",
    tags: ["Reels + Ads", "Lead Generation", "Clinic Growth"],
  },
  {
    slug: "personal-brand-reel-2-5m-views",
    eyebrow: "Personal Brand Content",
    title: "2.5M views on a single reel for a Delhi personal brand",
    summary:
      "A retention-first reel structure built around one non-negotiable rule: every second has to earn the next second.",
    industry: "Personal Brand / Creator",
    location: "Delhi",
    timeline: "Single reel — 14 days to viral",
    services: [
      "Retention Editing",
      "Hook Strategy",
      "Reel Structure",
      "Profile Positioning",
    ],
    heroMedia: {
      type: "image",
      src: reelsShowcase,
      alt: "Personal brand reel — 2.5M views case study",
    },
    metrics: [
      { label: "Views", before: "8K avg", after: "2.5M" },
      { label: "Followers Added", before: "~200 / month", after: "+14,800" },
      { label: "Avg Watch Time", before: "4.2s", after: "19.1s" },
      { label: "Profile Visits", before: "1.1K", after: "186K" },
    ],
    challenge:
      "The creator had strong content ideas but every reel was flattening at around 8K views. The edits were technically fine — but structurally they leaked attention in the first 3 seconds and had no re-watch trigger.",
    approach: [
      "Audited 20+ past reels and mapped where exactly viewers were dropping.",
      "Rebuilt the hook — shorter, sharper, visual-first instead of text-first.",
      "Engineered a mid-reel pattern-interrupt so viewers stayed past the 7-second decision point.",
      "Ended the reel with a loop trigger that pushed re-watches — which Instagram rewards.",
    ],
    execution: [
      "New hook structure: first 1 second = visual + motion, 2nd second = verbal claim.",
      "Cut filler b-roll; every shot earns its place.",
      "Sound design pass for tension + payoff curve.",
      "Captions styled for readability without visual clutter.",
    ],
    gallery: [
      { type: "image", src: reelsShowcase, alt: "Reel frame 1" },
      { type: "image", src: reelsShowcase1, alt: "Reel frame 2" },
      { type: "video", src: portfolio1, alt: "Reel sample" },
    ],
    testimonial: {
      quote:
        "Same topic, same face, same camera — sirf editing structure change hui aur reel fat gaya. Ab main har reel inhi ke saath banata hoon.",
      author: "Content Creator",
      role: "Personal Brand, Delhi",
    },
    nextSteps:
      "Now on a monthly reel editing retainer — 8 reels per month with retention-first structure.",
    tags: ["Retention Editing", "Reel Strategy", "Personal Brand"],
  },
  {
    slug: "local-business-revenue-driven",
    eyebrow: "Local Business Promotion",
    title: "₹1.8L in tracked revenue from a single offer campaign",
    summary:
      "An offer-led ad + content system for a local Delhi business that turned cold scrollers into walk-in customers in under 3 weeks.",
    industry: "Local D2C / Retail",
    location: "Delhi",
    timeline: "21 days",
    services: [
      "Meta Ads",
      "Offer Creative",
      "Video Production",
      "Campaign Management",
    ],
    heroMedia: {
      type: "image",
      src: podcastShowcase,
      alt: "Local business revenue campaign case study",
    },
    metrics: [
      { label: "Tracked Revenue", before: "~₹32K / month", after: "₹1.8L" },
      { label: "ROAS", before: "1.1x", after: "4.6x" },
      { label: "New Customers", before: "18 / month", after: "94" },
      { label: "Repeat Rate", before: "—", after: "22%" },
    ],
    challenge:
      "A local Delhi business had decent walk-ins but poor online-to-offline conversion. Their ads were running, but creative was product-heavy and missed the buying trigger — there was no compelling reason to act today.",
    approach: [
      "Built a time-boxed offer (valid for 21 days) to create urgency without killing brand value.",
      "Shifted the creative from product shots to a 15-second story: problem → offer → outcome.",
      "Ran offer-led video ads + carousel retargeting for warm audiences.",
      "Set up a simple tracking flow so revenue could be attributed, not guessed.",
    ],
    execution: [
      "Scripted and shot 2 hero video ads in one production day.",
      "Edited with strong offer overlay + final CTA — both on-screen and voiced.",
      "Launched cold + retargeting campaigns simultaneously with split budgets.",
      "Reviewed performance every 48 hours and killed underperforming creative fast.",
    ],
    gallery: [
      { type: "image", src: podcastShowcase1, alt: "Campaign creative 1" },
      { type: "image", src: podcastShowcase2, alt: "Campaign creative 2" },
      { type: "video", src: portfolio2, alt: "Ad creative sample" },
    ],
    testimonial: {
      quote:
        "First time hamari ads se actual revenue track hua. Har rupee jo lagaya, uska output dikha. Bahut clarity aayi.",
      author: "Business Owner",
      role: "Local Retail, Delhi",
    },
    nextSteps:
      "Campaign is now a recurring monthly offer-led sprint with Mineworld handling creative + ads end-to-end.",
    tags: ["Offer Creative", "Paid Growth", "Revenue Focus"],
  },
];

export function findCaseStudy(slug) {
  return caseStudies.find((c) => c.slug === slug);
}
