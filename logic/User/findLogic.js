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
    console.log(user);

    return user;
  } catch (ex) {
    error(ex);
  }
};
exports.findByUsername = findByUsername;

/**
 * @async
 * @static
 * @param {String} id (mongoose ObjectId)
 * @returns {Promise<object | null>} User data(see your model).
 */
const findById = async (id) => {
  try {
    const user = await User.findOne({ _id: id });
    return user;
  } catch (ex) {
    error(ex);
  }
};
exports.findById = findById;
