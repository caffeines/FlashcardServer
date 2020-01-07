const Promise = require('bluebird');
const jwt = require('jsonwebtoken');
const { secret, TTL: jwtTTL } = require('../../config/jwt');

const { error } = require('../../constant/chalkEvent');

const signAsync = Promise.promisify(jwt.sign);
const verifyAsync = Promise.promisify(jwt.verify);

/**
 * @static
 * @async
 * @param {User <Object>} user
 * @return {Promise<object | null>} JWT token (string)
 */

const createToken = async (user) => {
  const {
    username, _id: id, role, email,
  } = user;
  let TTL;
  if (role === 'admin' || role === 'moderator') TTL = 1000 * 60 * 60;
  const payload = {
    username, role, email, id,
  };

  try {
    const token = await signAsync(payload, { expiresIn: TTL || jwtTTL || '30d' });
    return token;
  } catch (ex) {
    error(ex);
    return null;
  }
};
exports.createToken = createToken;

/**
 * @static
 * @async
 * @param {String} token
 * @returns {Promise<object | null>} payload
 */
const verifyToken = async (token) => {
  try {
    const payload = await verifyAsync(token);
    return payload;
  } catch (ex) {
    error(ex);
    return null;
  }
};
exports.verifyToken = verifyToken;
