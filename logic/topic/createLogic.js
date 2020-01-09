const Topic = require('../../models/Topic');
const { error } = require('../../constant/chalkEvent');

/**
 * @async
 * @static
 * @param {object} topicObj
 * @returns {Promise<object | null>} Topic data(see your model).
 */

const createTopic = async (topicObj) => {
  try {
    const newTopic = new Topic({ ...topicObj });
    const topic = await newTopic.save();
    return topic;
  } catch (ex) {
    error(ex);
  }
};
exports.createTopic = createTopic;
