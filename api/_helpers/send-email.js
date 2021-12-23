const nodemailer = require('nodemailer');
const config = require('config.json');

module.exports = sendEmail;

let smtpClient = {
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
}

if (process.env.SMTP_CLIENT === "mailtrap") {
    smtpClient["host"] = "smtp.mailtrap.io"
    smtpClient["port"] = 2525
} else if (process.env.SMTP_CLIENT === "gmail") {
    smtpClient["service"] = 'gmail'
}

async function sendEmail({ to, subject, html, from = config.emailFrom, attachments=[] }) {
    const transporter = nodemailer.createTransport(smtpClient);
    await transporter.sendMail({ from, to, subject, html, attachments });
}