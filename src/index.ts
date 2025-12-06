import app from './app';
import { connectDb } from './config/db.config';
import envConfig from './config/env.config';

const startApplication = async () => {
  try {
    // Database connection
    const dbName = await connectDb();
    console.info("Connected to Database:", dbName);

    // Start server
    const server = app.listen(envConfig.PORT, () => {
      console.info("Server Started on Port", envConfig.PORT);
    });

    // Set timeout
    server.timeout = envConfig.SERVER_REQUEST_TIMEOUT;

  } catch (err) {
    console.error("Application Error:", err);
  }
};

startApplication();
