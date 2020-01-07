const { envVariableChecker } = require('../lib/utils');

const values = ['SERVER_NAME', 'SERVER_HOST', 'SERVER_APP_LINK'];
envVariableChecker(values);

module.exports = {
  name: process.env.SERVER_NAME,
  host: process.env.SERVER_HOST,
  port: Number(process.env.SERVER_PORT) || 4000,
  appLink: process.env.SERVER_APP_LINK,
};
