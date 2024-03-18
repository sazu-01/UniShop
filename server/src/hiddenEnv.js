
//module
import dotenv from "dotenv";

// Load the environment variables
dotenv.config();

// Retrieve the server port variable
const serverPort = process.env.SERVER_PORT;

//Retrive the MongoDB Database link 
const MongodbURL = process.env.MongodbURL

//retrive the secret jwt Private Key
const jwtPrivateKey = process.env.jwtPrivateKey || "asdka!`9dad*/868sd&asd455asd";

//retrive smtp username and password
const smtpUsername = process.env.smtpUsername;
const smtpPassword = process.env.smtpPassword;

const clientUrl = process.env.clientUrl;
export { serverPort, MongodbURL, jwtPrivateKey, smtpUsername, smtpPassword, clientUrl }    