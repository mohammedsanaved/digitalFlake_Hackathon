import mongoose from "mongoose";

const connectionDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`DB connected: ${process.env.MONGO_URI}`);
  } catch (error) {
    console.error(`Error connecting to DB: ${error}`);
    throw error;
  }
};

export default connectionDB;
