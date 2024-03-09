
//module
import dotenv from "dotenv";
dotenv.config();// Load the environment variables

// Retrieve the server port variable
const serverPort = process.env.SERVER_PORT;


export { serverPort}    