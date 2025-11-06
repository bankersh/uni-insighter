const nodemailer = require('nodemailer');


const to_mail = 'api.backend@zoxima.com';
const cc_mail = '';

module.exports = {
    email_error_log
};

function email_error_log(subject, text) {

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'api.backend@zoxima.com',
            pass: 'sqrzcqidvbhfowbj',
        }
    });

    var mailOptions = {
        //team member
        to: `${to_mail}`,
        cc: `${cc_mail}`,
        subject: `${subject}`,
        text: `${text}`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

