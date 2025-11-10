import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";

export async function uploadToCloudinary(req) {
  // configure Cloudinary
  cloudinary.config({
    /*cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,*/

    cloud_name: 'dospr7srq',
    api_key: '642215764125218',
    api_secret: '_angitGuOZjDK42_EDXtoulusE8',
  });

  try {
    if (!req || !req.file) {
      throw new Error("No file provided on request (req.file is undefined)");
    }
    else{}
    let result;

    // If using multer with disk storage, file.path will exist
    if (req.file.path) {
      result = await cloudinary.uploader.upload(req.file.path, {
        folder: "ecommerce",
      });
    }
    // If using multer memory storage, file.buffer will exist; use upload_stream
    else if (req.file.buffer) {
      result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "ecommerce" },
          (error, uploaded) => {
            if (error) return reject(error);
            resolve(uploaded);
          }
        );
        stream.end(req.file.buffer);
      });
    } else {
      throw new Error("Provided file has neither path nor buffer");
    }

    return result.secure_url;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    // Throw the error so the caller (route handler) can respond appropriately
    throw error;
  }
}