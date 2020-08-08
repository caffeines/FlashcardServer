const sgMail = require('@sendgrid/mail');
const { sendgridApiKey } = require('../config/mailer');
const { error, success } = require('../constant/chalkEvent');

const mailer = async (to, subject, htmlBody) => {
  sgMail.setApiKey(sendgridApiKey);
  try {
    const mail = {
      from: 'me.caffeines@gmail.com', // sender address
      to, // list of receivers
      subject, // Subject line
      html: htmlBody, // html body
    };
    await sgMail.send(mail);
    success('Email sent');
    return { status: true, message: 'Email sent!' };
  } catch (err) {
    error(err);
    return { status: false, message: 'Mail sending failed!' };
  }
};
exports.mailer = mailer;
