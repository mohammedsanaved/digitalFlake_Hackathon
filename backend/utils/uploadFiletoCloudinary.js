import { v2 as cloudinary } from "cloudinary";
// import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const uploadFiletoCloudinary = async (req) => {
  try {
    const file = req.file;
    if (!file) return null;
    const result = await cloudinary.uploader.upload(file.path, {
      resource_type: "auto",
    });
    console.log("File is Uploaded on Cloudinary", result.url);
    return result;
  } catch (error) {
    // Proper error handling
    console.error("Error uploading file to Cloudinary:", error);
    // Cleanup only if file exists
    if (fs.existsSync(file)) {
      fs.unlinkSync(file);
    }
    // Throw error to propagate it to the caller
    throw error;
  }
};

export default uploadFiletoCloudinary;
