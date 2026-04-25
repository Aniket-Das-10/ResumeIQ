const nodemailer = require("nodemailer");
const config = require("../config/config");

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: config.GOOGLE_USER,
        clientId: config.GOOGLE_CLIENT_ID,
        clientSecret: config.GOOGLE_CLIENT_SECRET,
        refreshToken: config.GOOGLE_REFRESH_TOKEN,
    },
});

transporter.verify((error, success) => {
    if (error) {
        console.error('❌ EMAIL ERROR: Failed to verify transporter. Check your GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, and GOOGLE_REFRESH_TOKEN in .env');
        console.error('Specific Error Details:', error.message);
    } else {
        console.log('✅ Email transporter is ready to send messages');
    }
});

const sendEmail = async (to, subject, html) => {
    try {
        await transporter.sendMail({
            from: `"ResumeIQ" <${config.GOOGLE_USER}>`,
            to,
            subject,
            html,
        });
        console.log(`📧 Email sent successfully to ${to}`);
    } catch (error) {
        console.error("❌ Error sending email:", error.message);
        if (error.message.includes('invalid_grant') || error.message.includes('unauthorized_client')) {
            throw new Error("Email service is temporarily unavailable due to authentication issues. Please contact support or try again later.");
        }
        throw error; // Re-throw to handle in controller
    }
}

module.exports = { sendEmail };