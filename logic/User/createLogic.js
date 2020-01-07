const User = require('../../models/User');
const { error } = require('../../constant/chalkEvent');

/**
 * @async
 * @static
 * @param {object} userObj
 * @returns {Promise<object | null>} User data(see your model).
 */

const createUser = async (userObj) => {
  try {
    const newUser = new User({ ...userObj });
    const savedUser = await newUser.save();
    return savedUser;
  } catch (ex) {
    error(ex);
  }
};
exports.createUser = createUser;
