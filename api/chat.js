import Anthropic from "@anthropic-ai/sdk";

const SYSTEM_PROMPT = `You are the friendly chat assistant for Mineworld Production, a Delhi-based content & digital growth studio founded by Himanshu Bhardwaj.

WHAT MINEWORLD DOES
- Premium video editing — YouTube long-form, reels, ads, podcast post-production, brand films
- Websites & mobile apps — Next.js sites, React Native / Flutter apps, e-commerce on Shopify
- Performance marketing — Meta (Instagram + Facebook) ads, Google ads, lead generation funnels
- Social media systems — content calendars, monthly reels, carousels, thumbnails, brand consistency
- Graphic design & creative support — thumbnails, ad creatives, decks, brand assets

WHO IT'S FOR
Founders, clinics, D2C brands, creators, and local businesses in Delhi (and remote across India) who want a single team handling content + ads + web instead of stitching freelancers together.

CONTACT
- WhatsApp: +91 97588 50933
- Email: mineworldproduction4455@gmail.com
- Office: Mayur Vihar Phase 1, Delhi 110091
- Instagram: @mineworld.production

PRICING & PACKAGES
- Monthly retainer model (transparent — no upsell games)
- Visit /packages on the site for current tiers
- For a custom quote, ask for the budget range and goals, then suggest they ping WhatsApp for a 15-min discovery call

YOUR STYLE
- Warm, direct, helpful — like a smart friend who knows the studio inside out
- Hindi/Hinglish is welcome — match whatever language the visitor uses
- Keep replies short (2-4 sentences max). Use line breaks for readability.
- If you don't know something specific (exact pricing, project timeline, delivery dates), say so honestly and offer to connect them with the team on WhatsApp
- Never make up case study numbers, client names, or guarantees
- For anything that requires a real human (custom quotes, scheduling calls, urgent project starts) — point them to WhatsApp +91 97588 50933

WHAT TO AVOID
- Don't pretend to be human — you're an AI assistant for the studio
- Don't promise specific delivery times or prices without a real quote
- Don't argue with criticism — acknowledge and offer to connect them with Himanshu
- Don't get pulled into off-topic conversations (politics, personal advice, etc.) — politely redirect to what Mineworld can help with`;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(503).json({
      error: "Chat is not configured",
      fallback: "whatsapp",
    });
  }

  let body = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      return res.status(400).json({ error: "Invalid JSON" });
    }
  }

  const messages = Array.isArray(body?.messages) ? body.messages : null;
  if (!messages || messages.length === 0) {
    return res.status(400).json({ error: "messages required" });
  }

  if (messages.length > 20) {
    return res.status(400).json({ error: "Too many messages (max 20)" });
  }

  const sanitized = [];
  for (const m of messages) {
    if (!m || (m.role !== "user" && m.role !== "assistant")) {
      return res.status(400).json({ error: "Invalid message role" });
    }
    const content = typeof m.content === "string" ? m.content : "";
    if (!content.trim()) continue;
    if (content.length > 2000) {
      return res.status(400).json({ error: "Message too long (max 2000 chars)" });
    }
    sanitized.push({ role: m.role, content: content.trim() });
  }

  if (sanitized.length === 0 || sanitized[0].role !== "user") {
    return res.status(400).json({ error: "First message must be user" });
  }

  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  try {
    const response = await client.messages.create({
      model: "claude-haiku-4-5",
      max_tokens: 512,
      system: [
        {
          type: "text",
          text: SYSTEM_PROMPT,
          cache_control: { type: "ephemeral" },
        },
      ],
      messages: sanitized,
    });

    const text = response.content
      .filter((b) => b.type === "text")
      .map((b) => b.text)
      .join("");

    return res.status(200).json({
      reply: text,
      usage: {
        input: response.usage.input_tokens,
        output: response.usage.output_tokens,
        cache_read: response.usage.cache_read_input_tokens || 0,
      },
    });
  } catch (error) {
    if (error instanceof Anthropic.RateLimitError) {
      return res.status(429).json({
        error: "Too busy right now",
        fallback: "whatsapp",
      });
    }
    if (error instanceof Anthropic.APIError) {
      return res.status(502).json({
        error: "Chat unavailable",
        fallback: "whatsapp",
      });
    }
    return res.status(500).json({
      error: "Something went wrong",
      fallback: "whatsapp",
    });
  }
}
