const { envVariableChecker } = require('../lib/utils');

const values = ['SENDGRID_API_KEY'];
envVariableChecker(values);

module.exports = {
  sendgridApiKey: process.env.SENDGRID_API_KEY,
};
