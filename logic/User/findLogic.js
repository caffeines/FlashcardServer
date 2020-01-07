const User = require('../../models/User');
const { error } = require('../../constant/chalkEvent');

/**
 * @async
 * @static
 * @param {String} username
 * @returns {Promise<object | null>} User data(see your model).
 */
const findByUsername = async (username) => {
  try {
    const user = await User.findOne({ username });
    return user;
  } catch (ex) {
    error(ex);
  }
};
exports.findByUsername = findByUsername;
