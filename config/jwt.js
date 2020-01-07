const { envVariableChecker } = require('../lib/utils');

const values = ['JWT_SECRET', 'JWT_TTL'];
envVariableChecker(values);


module.exports = {
  secret: process.env.JWT_SECRET,
  TTL: process.env.JWT_TTL || '30d',
};