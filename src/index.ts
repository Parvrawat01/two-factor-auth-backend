import app from './app';
import { connectDb } from './config/db.config'
import envConfig from './config/env.config'

const startApplication = async () => {
  try {
    // Database connection
    const dbName = await connectDb()
    console.info('Database Connected', dbName)

    // Server connection
    const server = app.listen(envConfig.PORT)
    // Set timeout
    const server = app.listen(envConfig.PORT)
    server.timeout = envConfig.SERVER_REQUEST_TIMEOUT
    console.info('Server started on port', envConfig.PORT)
    } 
        catch (err) 
        {
    console.error("Application Error:", err);
  }
}

void startApplication()