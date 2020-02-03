/* eslint-disable no-console */
const Topic = require('../../models/Topic');

const findTopic = async (Page, Limit) => {
  try {
    const page = Page || 1;
    const limit = Limit || 20;
    let topics;
    if (page === 1) {
      topics = await Topic.find({}).sort({ score: 'Desc' }).limit(limit);
    } else {
      const skips = limit * (page - 1);
      topics = await Topic.find({})
        .sort({ score: 'Desc' })
        .limit(limit)
        .skip(skips);
    }
    const totalProduct = await Topic.countDocuments();
    const hasMore = totalProduct > Page * Limit;
    return { topics, hasMore };
  } catch (err) {
    console.error(err);
    return new Error(err);
  }
};
exports.findTopic = findTopic;
