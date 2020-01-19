const Topic = require('../../models/Topic');
const { error } = require('../../constant/chalkEvent');

/**
 * @async
 * @static
 * @param {object} topicObj
 * @returns {Promise<object | null>} Topic data(see your model).
 */

const createTopic = async (name) => {
  try {
    const Name = name.trim();
    const topic = await Topic.findOneAndUpdate(
      { name: Name },
      {
        $inc: { score: 1 },
        $set: { name: Name },
      },
      { upsert: true, new: true },
    );
    return topic;
  } catch (ex) {
    error(ex);
  }
};
exports.createTopic = createTopic;
