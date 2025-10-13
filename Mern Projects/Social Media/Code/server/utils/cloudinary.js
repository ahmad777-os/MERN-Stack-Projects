// server/utils/cloudinary.js
import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export const uploadVideoBuffer = async (filePath, options = {}) => {
  return await cloudinary.v2.uploader.upload(filePath, {
    resource_type: "video",
    folder: options.folder || "reels",
    chunk_size: 6000000,
    ...options,
  });
};

// ✅ ADD THIS FUNCTION ↓↓↓
export const deleteFromCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.v2.uploader.destroy(publicId, {
      resource_type: "video",
    });
    console.log("🗑️ Deleted from Cloudinary:", result);
    return result;
  } catch (err) {
    console.error("❌ Cloudinary delete error:", err);
    throw err;
  }
};

export default cloudinary.v2;
