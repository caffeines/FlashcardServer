const nodemailer = require('nodemailer');
const { email, password } = require('../config/nodeMailer');
const { error, success } = require('../constant/chalkEvent');

const mailer = async (to, subject, htmlBody) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: email,
      pass: password,
    },
  });

  try {
    const info = await transporter.sendMail({
      from: '"Flash Card" <no-reply@gmail.com>', // sender address
      to, // list of receivers
      subject, // Subject line
      html: htmlBody, // html body
    });
    if (info) {
      success(`Mail messageId: ${info.messageId}`);
      return { status: false, message: 'Mail sending failed!' };
    }
  } catch (err) {
    error(err);
    return { status: false, message: 'Mail sending failed!' };
  }
};
exports.mailer = mailer;
