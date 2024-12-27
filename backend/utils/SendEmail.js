import nodemailer from 'nodemailer'
import { MAILINGADDRESS, MAILINGKEY } from "../config.js"

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: MAILINGADDRESS,
        pass: MAILINGKEY
    }
});

const SendEmail = async ({ to, subject, html, cc = null, bcc = null }) => {
    const mailOptions = {
        from: "shivamkumarkashyap12@gmail.com",
        to,
        subject,
        html
    };

    if (cc) {
        mailOptions.cc = ['cc1@example.com', 'cc2@example.com'];
    }

    if (bcc) {
        mailOptions.bcc = ['bcc1@example.com', 'bcc2@example.com'];
    }

    return await transporter.sendMail(mailOptions)
}

export default SendEmail