const { cryptoRandomString } = require('../../lib/utils');
const { error } = require('../../constant/chalkEvent');
const User = require('../../models/User');

/**
 * @static
 * @async
 * @param {String} email
 * @returns {Promise <object | null>} tokens
 */
const createConfirmToken = async (id) => {
  const token = await cryptoRandomString(29);
  try {
    const now = Date.now();
    const expiresAt = new Date(now + 1000 * 60 * 10);

    const updatedToken = await User.findOneAndUpdate({ _id: id }, {
      token,
      tokenGeneratedAt: now,
      tokenExpiresAt: expiresAt.valueOf(),
    });
    if (updatedToken) {
      return token;
    }
    return null;
  } catch (err) {
    error(err);
    return Promise.reject(err);
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
const verifyConfirmToken = async (_id, token) => {
  try {
    const user = await User.findOne({ _id });
    if (!user) {
      return { code: 'notFound', status: 'notFound' };
    }
    if (user.tokenExpiresAt < Date.now()) {
      return { code: 'expired', status: 'badRequest' };
    }
    if (token === user.token) {
      const updatedUser = await User.findOneAndUpdate({ _id }, { verfied: true }, { new: true });
      if (updatedUser) return { code: 'success', status: 'ok' };
    }
    return { code: 'notMatch', status: 'badRequest' };
  } catch (err) {
    error(err);
    return false;
  }
};
exports.verifyConfirmToken = verifyConfirmToken;
