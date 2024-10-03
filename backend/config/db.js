import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://jagannathpatro234:khiladi786@cluster0.da6cc.mongodb.net/food-del"
    )
    .then(() => console.log("DB Connected"));
};
