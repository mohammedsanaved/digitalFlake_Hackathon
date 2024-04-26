import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const uploadImageToCloudinary = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file);
    return result;
  } catch (error) {
    throw new Error("Error uploading image to Cloudinary");
  }
};
export default uploadImageToCloudinary;
