

// //package module
// import mongoose from "mongoose";

// //file module
// import { MongodbURL } from "../hiddenEnv.js";

// //Function to Connect to the mongoDB Database
// const ConnectDatabase = async function (options={}) {
//    try {
//     // Connect via provided URL and options receive for connection customization
//     await mongoose.connect(MongodbURL,options);
//     console.log("connected To Database successfully");

//     //event listener for database connection error
//     mongoose.connection.on("error", function (error) {
//         console.error(`error in database connection:` + error);
//      });
//    } catch (error) {
//       console.error("could not connect to database");
//    }
// };

// export default ConnectDatabase



import mongoose from "mongoose";
import { MongodbURL } from "../hiddenEnv.js";

const ConnectDatabase = async function (options = {}) {
  try {
    // Default connection options optimized for Vercel environment
    const defaultOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,   // Timeout after 5 seconds
      socketTimeoutMS: 45000,           // Close sockets after 45 seconds
      family: 4,                        // Use IPv4, skip trying IPv6
      connectTimeoutMS: 10000,          // Give up initial connection after 10 seconds
    };

    // Combine default options with any provided options
    const connectionOptions = { ...defaultOptions, ...options };

    // Create the initial connection
    await mongoose.connect(MongodbURL, connectionOptions);
    console.log("Connected to Database successfully");

    // Handle connection errors
    mongoose.connection.on("error", function (error) {
      console.error("Database connection error:", error);
    });

    // Handle disconnection
    mongoose.connection.on("disconnected", function () {
      console.log("Database disconnected. Attempting to reconnect...");
    });

    // Handle successful reconnection
    mongoose.connection.on("reconnected", function () {
      console.log("Database reconnected successfully");
    });

    return mongoose.connection;

  } catch (error) {
    console.error("Database connection error:", error);
    // Throw the error to be handled by the caller
    throw error;
  }
};

// Ensure we handle process termination
process.on("SIGINT", async () => {
  try {
    await mongoose.connection.close();
    console.log("Database connection closed due to app termination");
    process.exit(0);
  } catch (error) {
    console.error("Error closing database connection:", error);
    process.exit(1);
  }
});

export default ConnectDatabase;