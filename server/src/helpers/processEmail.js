
//helper function
import { SendEmail } from "./nodeMailer.js";

const ProcessEmail = async (emailData) => {
    try {
        await SendEmail(emailData);
       } catch (error) {
           console.log(error.message);

       }
 }

 export default ProcessEmail;