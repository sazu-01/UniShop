//module
import dotenv from "dotenv";

// Load the environment variables
dotenv.config();

// Retrieve the server port variable
const serverPort = process.env.SERVER_PORT;

//Retrive the MongoDB Database link
const MongodbURL = process.env.MongodbURL;

//retrive the secret jwt Private Key
const jwtPrivateKey = process.env.jwtPrivateKey;

//retrive the secret jwt access key
const jwtAccessKey = process.env.jwtAccessKey;

//retrive smtp username and password
const smtpUsername = process.env.smtpUsername;
const smtpPassword = process.env.smtpPassword;

//set the default Image for user and product , if user don't upload image
const defaultImageForUser = "public/images/users/default.png";

const defaultImageForProduct = "public/images/products/default.jpg";

//retrive resetPasswordKey from env
const resetPasswordKey = process.env.jwtResetPasswordKey;

//retrive refresh JWT Key from env
const jwtRefreshKey = process.env.jwtRefreshKey;

//client url
const clientUrl = process.env.clientUrl;

export {
  serverPort,
  MongodbURL,
  jwtPrivateKey,
  jwtAccessKey,
  smtpUsername,
  smtpPassword,
  clientUrl,
  defaultImageForUser,
  defaultImageForProduct,
  resetPasswordKey,
  jwtRefreshKey,
};
