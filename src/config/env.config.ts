import dotenv from "dotenv";

dotenv.config();

const envConfig = {
  PORT: process.env.PORT || 5000,
  DATABASE_URI: process.env.DATABASE_URI || "",
  SERVER_REQUEST_TIMEOUT: Number(process.env.SERVER_REQUEST_TIMEOUT) || 30000,
};

export default envConfig;
