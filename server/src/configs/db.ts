import mongoose from "mongoose";
import { MONGO_URI } from "./env";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Database is connected");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

export default connectDB;
