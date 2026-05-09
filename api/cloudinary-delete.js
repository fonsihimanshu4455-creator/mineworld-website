// Vercel serverless function — deletes a Cloudinary asset by public_id.
// Uses CLOUDINARY_API_SECRET (server-side only) so the secret never
// reaches the browser.
//
// POST /api/cloudinary-delete
// Body: { publicId: string, resourceType?: 'image' | 'video' | 'raw' }
// Response: { result: 'ok' | 'not found' | ... }

import { v2 as cloudinary } from "cloudinary";

const cloudName =
  process.env.CLOUDINARY_CLOUD_NAME || process.env.VITE_CLOUDINARY_CLOUD_NAME;
const apiKey =
  process.env.CLOUDINARY_API_KEY || process.env.VITE_CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

if (cloudName && apiKey && apiSecret) {
  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true,
  });
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!cloudName || !apiKey || !apiSecret) {
    return res.status(503).json({
      error:
        "Cloudinary delete is not configured. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET as environment variables.",
    });
  }

  let body = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      return res.status(400).json({ error: "Invalid JSON body" });
    }
  }

  const publicId = body?.publicId;
  const resourceType = body?.resourceType || "image";

  if (!publicId || typeof publicId !== "string") {
    return res.status(400).json({ error: "publicId is required" });
  }

  if (!["image", "video", "raw"].includes(resourceType)) {
    return res.status(400).json({ error: "Invalid resourceType" });
  }

  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType,
      invalidate: true,
    });
    return res.status(200).json(result);
  } catch (error) {
    console.error("[cloudinary-delete] error:", error);
    return res.status(500).json({
      error: error?.message || "Cloudinary deletion failed",
    });
  }
}
