const { envVariableChecker } = require('../lib/utils');

const values = ['SALT_ROUNDS'];
envVariableChecker(values);

module.exports = {
  saltRound: Number(process.env.SALT_ROUND),
};
