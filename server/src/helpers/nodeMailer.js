
//helpers
import nodemailer from "nodemailer";

//env varaible
import { smtpUsername, smtpPassword } from "../hiddenEnv.js"

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: smtpUsername,
        pass: smtpPassword
    },
});


const SendEmail = async (emailData) => {
    try {
        const { email, name, subject, html } = emailData;

        await transporter.sendMail({
            from: smtpUsername,
            to: email,
            subject: subject,
            html: html
        })
    } catch (error) {
         console.error("Error in SendEmail Function");
         throw error;
    }

}

export { SendEmail }


