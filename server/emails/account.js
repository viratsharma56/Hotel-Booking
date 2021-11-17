require('dotenv').config();
const sgMail = require('@sendgrid/mail');

const sendGridApi = process.env.SENDGRID_API_KEY;

sgMail.setApiKey(sendGridApi);

exports.loginMessage = async (name, email) => {
    const msg = {
        to: email,
        from: 'viratsharma5129@gmail.com',
        subject: "Welcome to hotel booking app",
        text: `Hi ${name}, We are very happy to have you onboard. For any assistance you can reach out to us at +9319737344`
    }

    try {
        await sgMail.send(msg);
        return true;
    } catch (error) {
        return false;
    }
}