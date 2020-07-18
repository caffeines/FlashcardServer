const User = require('../../models/User');

const addFavoriteTopicById = async (id, topicName) => {
  try {
    await User.updateOne(
      { _id: id },
      { $addToSet: { favouriteTopics: topicName } },
      { new: true },
    );
    return {};
  } catch (err) {
    return Promise.reject(err);
  }
};
exports.addFavoriteTopicById = addFavoriteTopicById;

const removeFavoriteTopicById = async (id, topicName) => {
  try {
    await User.updateOne(
      { _id: id },
      { $pull: { favouriteTopics: topicName } },
      { multi: true },
    );
    return {};
  } catch (err) {
    return Promise.reject(err);
  }
};
exports.removeFavoriteTopicById = removeFavoriteTopicById;
