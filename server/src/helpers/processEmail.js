"use strict";

//helper function
import { SendEmail } from "./nodeMailer.js";

const ProcessEmail = async (emailData) => {
    try {
         await SendEmail(emailData);
       } catch (error) {
           throw error.message

       }
 }

 export default ProcessEmail;