import mongoose from "mongoose";

export async function connectToDB() {
  try {
    await mongoose
      .connect(
        "mongodb+srv://ecomm:4FjFgOrFPGrDBuLx@ecomm.crleoko.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Ecomm"
      )
      .then(() => {
        
      });
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
}
