const nodemailer = require('nodemailer');
require('dotenv').config();

const sendEmail = async (options) => {
    try {
        // Create a transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        // Define email options
        const mailOptions = {
            from: `"Jronix Website" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER, // Sending to yourself
            subject: options.subject,
            html: options.html
        };

        // Send the email
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully");
        return true;
    } catch (error) {
        console.error("Error sending email:", error);
        return false;
    }
};

module.exports = sendEmail;
