import mongoose from "mongoose";

const connectDb = async () => {
  console.log("connecting....");
  mongoose.set("strictQuery", false);
  await mongoose.connect(process.env.MONGO_URI!);
  console.log("connected to database!");
};

export default connectDb;
