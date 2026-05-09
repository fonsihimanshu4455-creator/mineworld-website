// Frontend Cloudinary helpers — unsigned uploads via the upload preset
// configured in the Cloudinary dashboard (mineworld_assets).
//
// The API_SECRET is NEVER referenced here — secret-based actions
// (deletion, signed transformations) live on the serverless side at
// api/cloudinary-delete.js.

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

export const cloudinaryEnabled = Boolean(CLOUD_NAME && UPLOAD_PRESET);

function ensureConfigured() {
  if (!cloudinaryEnabled) {
    throw new Error(
      "Cloudinary is not configured. Set VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET in .env."
    );
  }
}

function pickResourceType(file) {
  if (!file?.type) return "image";
  if (file.type.startsWith("video")) return "video";
  if (file.type === "image/svg+xml") return "image";
  return "image";
}

export async function uploadToCloudinary(file, options = {}) {
  ensureConfigured();

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);
  if (options.folder) formData.append("folder", options.folder);
  if (Array.isArray(options.tags) && options.tags.length) {
    formData.append("tags", options.tags.join(","));
  }
  if (options.context && typeof options.context === "object") {
    const contextStr = Object.entries(options.context)
      .map(([k, v]) => `${k}=${v}`)
      .join("|");
    if (contextStr) formData.append("context", contextStr);
  }

  const resourceType = options.resourceType || pickResourceType(file);
  const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${resourceType}/upload`;

  const response = await fetch(url, { method: "POST", body: formData });
  if (!response.ok) {
    const err = await safeReadError(response);
    throw new Error(err || `Cloudinary upload failed (${response.status})`);
  }
  return response.json();
}

export async function uploadFromUrl(remoteUrl, options = {}) {
  ensureConfigured();

  const formData = new FormData();
  formData.append("file", remoteUrl);
  formData.append("upload_preset", UPLOAD_PRESET);
  if (options.folder) formData.append("folder", options.folder);
  if (Array.isArray(options.tags) && options.tags.length) {
    formData.append("tags", options.tags.join(","));
  }

  const resourceType = options.resourceType || "image";
  const apiUrl = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${resourceType}/upload`;

  const response = await fetch(apiUrl, { method: "POST", body: formData });
  if (!response.ok) {
    const err = await safeReadError(response);
    throw new Error(err || `Cloudinary URL upload failed (${response.status})`);
  }
  return response.json();
}

export async function deleteAsset(publicId, resourceType = "image") {
  const response = await fetch("/api/cloudinary-delete", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ publicId, resourceType }),
  });
  if (!response.ok) {
    const err = await safeReadError(response);
    throw new Error(err || `Cloudinary delete failed (${response.status})`);
  }
  return response.json();
}

async function safeReadError(response) {
  try {
    const payload = await response.json();
    return payload?.error?.message || payload?.error || null;
  } catch {
    return null;
  }
}

export function buildCloudinaryUrl(publicId, opts = {}) {
  if (!CLOUD_NAME || !publicId) return "";
  const resourceType = opts.resourceType || "image";
  const transformations = [];
  if (opts.width) transformations.push(`w_${opts.width}`);
  if (opts.height) transformations.push(`h_${opts.height}`);
  if (opts.crop) transformations.push(`c_${opts.crop}`);
  if (opts.quality) transformations.push(`q_${opts.quality}`);
  if (opts.format) transformations.push(`f_${opts.format}`);
  const tx = transformations.length ? `${transformations.join(",")}/` : "";
  return `https://res.cloudinary.com/${CLOUD_NAME}/${resourceType}/upload/${tx}${publicId}`;
}

// Optimized delivery for video <source> tags.
// q_auto + f_auto + vc_auto = automatic quality, format, codec
// c_limit = downscale only, never upscale
// w_<n>   = cap viewport width (mobile uses 720, desktop 1280-1920)
export function getOptimizedVideoUrl(publicId, options = {}) {
  if (!CLOUD_NAME || !publicId) return null;
  const transforms = [
    "q_auto",
    "f_auto",
    "c_limit",
    `w_${options.maxWidth || 1280}`,
    "vc_auto",
  ].join(",");
  return `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/${transforms}/${publicId}.mp4`;
}

// 720p mp4 for narrow viewports (saves ~60-70% bytes vs 1080p).
export function getMobileVideoUrl(publicId) {
  return getOptimizedVideoUrl(publicId, { maxWidth: 720 });
}

// First-frame still as a JPEG poster — renders instantly while the
// video downloads.
export function getVideoPosterUrl(publicId, options = {}) {
  if (!CLOUD_NAME || !publicId) return null;
  const width = options.width || 1920;
  return `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/so_0,f_jpg,q_auto,w_${width}/${publicId}.jpg`;
}
