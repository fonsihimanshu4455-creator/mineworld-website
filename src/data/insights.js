export const insights = [
  {
    slug: "why-your-reels-flatline-at-8k-views",
    title:
      "Why your reels flatline at 8K views (and the 3 structural fixes that unlock growth)",
    excerpt:
      "If your reels consistently stall at 5–10K views, it's rarely a content problem. It's a retention structure problem. Here's what to audit first.",
    category: "Editing Strategy",
    readTime: "6 min read",
    date: "2025-03-18",
    author: "Mineworld Team",
    content: [
      {
        type: "p",
        text: "Most creators and brands we audit share the same pattern: their reels get 5–10K views consistently, then plateau. Before you blame the algorithm or post frequency, audit these three things.",
      },
      {
        type: "h2",
        text: "1. The first 1 second",
      },
      {
        type: "p",
        text: "Instagram doesn't decide in 3 seconds anymore — it decides in 1. If your opening frame is text-heavy, static, or slow, most viewers have already scrolled. The fix: every reel should open with motion + a visual claim. Not a talking head mid-sentence.",
      },
      {
        type: "h2",
        text: "2. The 7-second decision point",
      },
      {
        type: "p",
        text: "Viewers who stay past 7 seconds are likely to finish. But most reels have flat pacing here — single energy, no interrupt. Add a pattern break at the 5–7 second mark: a zoom, a beat drop, a tone shift. Something that re-engages.",
      },
      {
        type: "h2",
        text: "3. The ending loop trigger",
      },
      {
        type: "p",
        text: "Instagram rewards re-watches exponentially. Most reels end with a fade or a hard stop. Instead, engineer a soft cliffhanger or a visual that loops into the opening. Re-watches multiply your retention metric without you doing anything different on publish.",
      },
      {
        type: "h2",
        text: "The quick audit",
      },
      {
        type: "p",
        text: "Pull your last 10 reels. Check the first 1 second, the 7-second mark, and the ending. If any of these are soft, fix that before you post the next reel. Retention is the lever — not frequency.",
      },
    ],
  },
  {
    slug: "meta-ads-2025-what-works-for-delhi-clinics",
    title:
      "Meta Ads in 2025: what actually works for Delhi clinics (from 40+ campaigns)",
    excerpt:
      "Offer-led creative, pre-qualifying forms, and doctor-led authority content — plus the one thing that consistently kills clinic ad performance.",
    category: "Meta Ads",
    readTime: "8 min read",
    date: "2025-02-24",
    author: "Mineworld Team",
    content: [
      {
        type: "p",
        text: "After running 40+ Meta ad campaigns for clinics in Delhi — aesthetic, dental, wellness — a few patterns emerged. Some are obvious. A few aren't.",
      },
      {
        type: "h2",
        text: "What works: one treatment, one offer, one creative",
      },
      {
        type: "p",
        text: "The clinics that scale quickest do not list every service in their ads. They pick one high-intent treatment, build a time-boxed offer around it, and concentrate creative + ad spend on that single angle for 21–30 days before rotating.",
      },
      {
        type: "h2",
        text: "What works: doctor-led trust content",
      },
      {
        type: "p",
        text: "Generic clinic reels don't build trust. A doctor explaining a treatment, addressing a fear, or showing before/after results — that builds trust. Trust drops cost-per-lead significantly.",
      },
      {
        type: "h2",
        text: "What kills performance: asking too little in the form",
      },
      {
        type: "p",
        text: "Most clinics think shorter forms = more leads. True on paper, false in practice. A 2-field form brings curious browsers. A 4-field form with a qualifying question brings real consultations. Lead quality > lead quantity.",
      },
      {
        type: "h2",
        text: "The thing most people get wrong",
      },
      {
        type: "p",
        text: "Running ads without aligning landing message, creative, and form. A viewer clicks an ad for 'hair restoration — ₹X,XXX off this month' and lands on a homepage talking about 5 services. That friction silently kills your ROAS. Alignment is worth more than a new creative.",
      },
    ],
  },
  {
    slug: "content-system-vs-content-calendar",
    title:
      "Content system vs content calendar: why one compounds and the other doesn't",
    excerpt:
      "A calendar tells you what to post. A system tells you why each piece exists and how it connects to revenue. Here's how to build one.",
    category: "Content Strategy",
    readTime: "5 min read",
    date: "2025-01-30",
    author: "Mineworld Team",
    content: [
      {
        type: "p",
        text: "Most brands we talk to have a content calendar. Very few have a content system. That difference is why some pages compound and others stay stuck.",
      },
      {
        type: "h2",
        text: "A calendar is a schedule. A system is a structure.",
      },
      {
        type: "p",
        text: "A calendar says: Monday reel, Tuesday carousel, Wednesday story. A system says: every reel either builds authority, drives inquiry, or strengthens brand perception — and here's how we measure which one it did.",
      },
      {
        type: "h2",
        text: "The three buckets",
      },
      {
        type: "p",
        text: "Every piece of content should be classified into one of three buckets: Authority (builds trust), Acquisition (drives inquiry), or Brand (strengthens perception). If a piece doesn't fit any of these, you probably don't need to post it.",
      },
      {
        type: "h2",
        text: "Why systems compound",
      },
      {
        type: "p",
        text: "In a calendar world, each post is isolated. In a system, authority content feeds acquisition credibility. Acquisition content feeds brand perception. Brand content increases authority. Each piece lifts the others — so month 6 is disproportionately stronger than month 2.",
      },
    ],
  },
];

export function findInsight(slug) {
  return insights.find((i) => i.slug === slug);
}
