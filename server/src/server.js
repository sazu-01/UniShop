
//modules
import app from "./app.js"
import {serverPort} from "./hiddenEnv.js";

// Start the Express application listening
app.listen(serverPort, function () {
    console.log(`server running at http://localhost:${serverPort}`);
});
