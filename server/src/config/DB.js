/*global console */

//package module
import mongoose from "mongoose";

//file module
import { MongodbURL } from "../hiddenEnv.js";

//Function to Connect to the mongoDB Database
const ConnectDatabase = async function (options={}) {
   try {
    // Connect via provided URL and options receive for connection customization
    await mongoose.connect(MongodbURL,options);
    console.log("connected To Database successfully");

    //event listener for database connection error
    mongoose.connection.on("error", function (error) {
        console.error(`error in database connection:` + error);
     });
   } catch (error) {
      console.error("could not connect to database");
   }
};

export default ConnectDatabase