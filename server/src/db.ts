import mongoose from "mongoose";
import  {MONGODB_URL}  from "./config";


export async function connectDB() {
    try {
        await mongoose.connect(MONGODB_URL as string);
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
      } catch(error) {
        console.log(error);
      }
};
