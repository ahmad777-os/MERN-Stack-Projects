// server/utils/cloudinary.js
import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

export const uploadVideoBuffer = async (filePath, options = {}) => {
  // filePath can be path or buffer depending on Multer setup
  return await cloudinary.v2.uploader.upload(filePath, {
    resource_type: "video",
    folder: options.folder || "reels",
    chunk_size: 6000000, // helpful for larger files (6MB chunks)
    ...options
  });
};

export default cloudinary.v2;
