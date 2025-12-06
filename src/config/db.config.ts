import mongoose from "mongoose"
import envConfig from "./env.config"

export const connectDb = async () => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(envConfig.DATABASE_URI)
      .then(() => resolve(mongoose.connection.name))
      .catch((err) => reject(err));
  });
};
