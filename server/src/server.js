/*global console */
"use strict";

//import files
import app from "./app.js"
import ConnectDatabase from "./config/DB.js";

//env variables
import {serverPort} from "./hiddenEnv.js";


// Start the Express application listening
const startServer = async () => {
    try {
      // Connect to database first
      await ConnectDatabase();
      
      // Only start listening once database is connected
      app.listen(serverPort, () => {
        console.log(`Server running at http://localhost:${serverPort}`);
      });
    } catch (error) {
      console.error('Failed to start server:', error);
      process.exit(1);
    }
};

startServer();