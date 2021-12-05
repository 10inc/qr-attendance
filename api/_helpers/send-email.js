const nodemailer = require('nodemailer');
const config = require('config.json');

module.exports = sendEmail;

// const smtpMailtrap = {
//     host: "smtp.mailtrap.io",
//     port: 2525,
//     auth: {
//         user: process.env.MAILTRAP_USER,
//         pass: process.env.MAILTRAP_PASS
//     }
// }

const smtpGoogle = {
    service: 'gmail',
    auth: {
        user: process.env.GOOGLE_SMTP_USER,
        pass: process.env.GOOGLE_SMTP_PASS,
    }
}

async function sendEmail({ to, subject, html, from = config.emailFrom, attachments=[] }) {
    const transporter = nodemailer.createTransport(smtpGoogle);
    await transporter.sendMail({ from, to, subject, html, attachments });
}