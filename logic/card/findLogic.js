const Card = require('../../models/Card');
const { error } = require('../../constant/chalkEvent');

/**
 * @async
 * @static
 * @param {String} id (mongoose ObjectId)
 * @returns {Promise<object | null>} Card data(see your model).
 */
const findById = async (id) => {
  try {
    const card = await Card.findById(id);
    return card;
  } catch (ex) {
    error(ex);
    return Promise.reject(ex);
  }
};
exports.findById = findById;

/**
 * @async
 * @static
 * @param {Number} page
 * @param {Number} limit
 * @param {Object} query
 * @returns {Promise<object | null>} Card data(see your model).
 */

const paginateByLove = async (limit, page, query) => {
  try {
    const Limit = Number(limit) || 25;
    const Page = Number(page) || 1;
    let cards;
    if (Page === 1) {
      cards = await Card.find({ ...query })
        .sort({ love: 'Desc' })
        .limit(Limit);
    } else {
      const skips = Limit * (Page - 1);
      cards = await Card.find({ ...query })
        .sort({ love: 'Desc' })
        .skip(skips)
        .limit(Limit);
    }
    const totalProduct = await Card.countDocuments(query);
    const hasMore = totalProduct > Page * Limit;
    return { cards, hasMore };
  } catch (ex) {
    error(ex);
    return Promise.reject(ex);
  }
};
exports.paginate = paginateByLove;

/**
 * @async
 * @static
 * @param {String} lastId (mongoose ObjectId)
 * @param {Number} limit
 * @param {Number} page
 * @param {Array} topics
 * @param {Object} options
 * @returns {Promise<object | null>} Card data(see your model).
 */
const paginateByDate = async (limit, page, query) => {
  try {
    const Limit = Number(limit) || 25;
    const Page = Number(page);
    const cards = await Card.find({ ...query })
      .sort({ created: -1 })
      .limit(Limit);
    const totalProduct = await Card.countDocuments(query);
    const hasMore = totalProduct > Page * Limit;
    return { cards, hasMore };
  } catch (ex) {
    error(ex);
    return ex;
  }
};
exports.paginateByDate = paginateByDate;

/**
 * @async
 * @static
 * @param {String} lastId (mongoose ObjectId)
 * @param {Number} limit
 * @param {Number} page
 * @param {Array} topics
 * @param {Object} options {state: 'unknown, title: Segment Tree}
 * @description it will return paginated chunk of data.
 * @returns {Promise<object | null>} Card data(see your model).
 */
const findCard = async (type, lastId, page, limit, topics, options) => {
  let query = {};
  if (topics) {
    query = {
      topic: { $in: [...topics] },
      ...options,
    };
  }
  let cards;
  if (type === 'love') {
    cards = await paginateByLove(limit, page, query);
  } else {
    if (lastId) {
      query = {
        ...query,
        _id: { $lt: lastId },
      };
    }
    cards = await paginateByDate(limit, page, query);
  }
  return cards;
};
exports.findCard = findCard;
