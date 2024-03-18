/*global console */
"use strict";

//import files
import app from "./app.js"
import ConnectDatabase from "./config/DB.js";
import {serverPort} from "./hiddenEnv.js";


// Start the Express application listening
app.listen(serverPort, async function () {
    console.log(`server running at http://localhost:${serverPort}`);
    await ConnectDatabase()
});
