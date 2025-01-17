var nodemailer = require('nodemailer');
const { userSchema } = require('../models/user.model');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MY_MAIL,
        pass: process.env.MY_PASSWORD
    }
});
const sendApprovalMail = (mail, activityName) => {
    console.log(`Sending email to: ${mail}`);

    const mailOptions = {
        from: process.env.MY_MAIL,
        to: mail,
        subject: 'Your Activity Has Been Approved!',
        text: `Dear User,

We are excited to inform you that your activity "${activityName}" has been approved successfully. You can now proceed with the next steps.

If you have any questions or need assistance, feel free to reach out to us.

Best regards,  
The Support Team`
    };

    sendMail(mailOptions);
};

const upComingActivityMailToAllUsers = async (activityName) => {
    const users = await userSchema.find();
    const mails = users.map(user => user.email);
    const mailOptions = {
        from: process.env.MY_MAIL,
        to: mails.join(', '),
        subject: `A New Activity Has Been Created: "${activityName}"`,
        text: `Dear User,

We are excited to announce that a new activity titled "${activityName}" has been created and is now available. 

Stay tuned for further updates or visit your dashboard for more details about this activity.

If you have any questions or need assistance, feel free to reach out to us.

Best regards,  
The Support Team`
    };
    sendMail(mailOptions);
};

const sendEventDeletionMail = (mail, activityName) => {
    console.log(`Sending event deletion email to: ${mail}`);

    const mailOptions = {
        from: process.env.MY_MAIL,
        to: mail,
        subject: 'Important: Your Activity Has Been Deleted',
        text: `Dear User,

We regret to inform you that your activity "${activityName}" has been deleted. This may be due to administrative reasons or other circumstances.

If you believe this was done in error or need further clarification, please contact our support team.

We apologize for any inconvenience caused.

Best regards,  
The Support Team`
    };

    sendMail(mailOptions);
};


function sendMail(mailOptions) {
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log('Error sending email:', error);
        } else {
            console.log('Approval email sent: ' + info.response);
        }
    });
}








module.exports = { sendApprovalMail, upComingActivityMailToAllUsers, sendEventDeletionMail }; 