import mongoose from "mongoose";

// Define connection states
const states = {
  disconnected: 0,
  connected: 1,
  connecting: 2,
  disconnecting: 3,
};

// Global connection object to maintain connection across API calls
type ConnectionObject = {
  isConnected?: number;
  connection?: typeof mongoose;
};

// Use global to prevent multiple connections in serverless environment
const globalWithMongoose = global as typeof globalThis & {
  mongoose: { conn: ConnectionObject | null; promise: Promise<typeof mongoose> | null };
};

// Initialize the global connection object
if (!globalWithMongoose.mongoose) {
  globalWithMongoose.mongoose = { conn: null, promise: null };
}

/**
 * Connect to MongoDB with retry logic and connection pooling
 */
async function connectToDatabase(): Promise<void> {
  const uri = process.env.NEXT_PUBLIC_MONGO_URI;
  if (!uri) throw new Error("MONGODBURI not found in environment variables");

  // If we already have a connection, use it
  if (globalWithMongoose.mongoose.conn && globalWithMongoose.mongoose.conn.isConnected === states.connected) {
    console.log("Using existing database connection");
    return;
  }

  // If a connection is in progress, wait for it
  if (globalWithMongoose.mongoose.promise) {
    console.log("Using existing connection promise");
    await globalWithMongoose.mongoose.promise;
    return;
  }

  // Configure connection options
  const options = {
    bufferCommands: false, // Disable mongoose buffering
    maxPoolSize: 10, // Limit number of sockets
    minPoolSize: 1, // Keep at least one connection open
    socketTimeoutMS: 30000, // Close sockets after 30 seconds of inactivity
    connectTimeoutMS: 30000, // Give up initial connection after 30 seconds
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    heartbeatFrequencyMS: 10000, // Check connection every 10 seconds
    retryWrites: true,
    retryReads: true,
  };

  try {
    // Implement retry logic
    let retries = 0;
    const maxRetries = 3;
    let lastError: Error | null = null;

    while (retries < maxRetries) {
      try {
        console.log(`Connecting to MongoDB (attempt ${retries + 1}/${maxRetries})...`);
        
        // Store the connection promise
        globalWithMongoose.mongoose.promise = mongoose.connect(uri, options);
        
        // Wait for connection
        const connection = await globalWithMongoose.mongoose.promise;
        
        // Store the connection
        globalWithMongoose.mongoose.conn = {
          isConnected: connection.connections[0].readyState,
          connection,
        };
        
        console.log("MongoDB connected successfully");
        return;
      } catch (error) {
        lastError = error as Error;
        console.log(`Connection attempt ${retries + 1} failed:`, error);
        
        // Wait with exponential backoff before retrying
        const waitTime = Math.min(1000 * Math.pow(2, retries), 10000);
        console.log(`Waiting ${waitTime}ms before retry...`);
        await new Promise(resolve => setTimeout(resolve, waitTime));
        
        retries++;
      }
    }

    // If we got here, all retries failed
    console.error(`Failed to connect to MongoDB after ${maxRetries} attempts`);
    throw lastError;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    
    // Reset the promise so future calls can try again
    globalWithMongoose.mongoose.promise = null;
    
    // Don't call process.exit in a serverless function!
    // process.exit(1) will terminate the entire serverless instance
    // Instead, throw the error to be handled by the caller
    throw error;
  }
}

export default connectToDatabase;
