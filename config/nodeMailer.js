const { envVariableChecker } = require('../lib/utils');

const values = ['NODE_MAILER_EMAIL', 'NODE_MAILER_PASSWORD', 'NODE_MAILER_CLIENT_SECRET',
  'NODE_MAILER_USER_MAIL', 'NODE_MAILER_REFRESH_TOKEN'];
envVariableChecker(values);

module.exports = {
  email: process.env.NODE_MAILER_EMAIL,
  password: process.env.NODE_MAILER_PASSWORD,
  clientSecret: process.env.NODE_MAILER_CLIENT_SECRET,
  user: process.env.NODE_MAILER_USER_MAIL,
  refreshToken: process.env.NODE_MAILER_REFRESH_TOKEN,
};
