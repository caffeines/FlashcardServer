const { cryptoRandomString } = require('../../lib/utils');
const { error } = require('../../constant/chalkEvent');
const User = require('../../models/User');

/**
 * @static
 * @async
 * @param {String} email
 * @returns {Promise <object | null>} tokens
 */
const createConfirmToken = async (email) => {
  const token = await cryptoRandomString(29);
  try {
    const updatedToken = await User.findOneAndUpdate({ email }, { token });
    if (updatedToken) {
      return token;
    }
  } catch (err) {
    error(err);
    return null;
  }
};
exports.createConfirmToken = createConfirmToken;

/**
 * @static
 * @async
 * @param {String} email
 * @param {String} Token
 * @returns {Promise <object | null>} true or false
 */
const verifyConfirmToken = async (email, token) => {
  try {
    const user = await User.findOne({ email });
    if (token === user.token) {
      const updatedUser = await User.findOneAndUpdate({ email }, { isVarified: true }, { new: true });
      if (updatedUser) return true;
      return false;
    }
    return false;
  } catch (err) {
    error(err);
    return false;
  }
};
exports.verifyConfirmToken = verifyConfirmToken;
