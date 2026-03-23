import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL!); // TODO
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ DB connection error", err);
    process.exit(1);
  }
};