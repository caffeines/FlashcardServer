/* eslint-disable object-curly-newline */
const topicCreateLogic = require('../.././../logic/topic/updateLogic');
const topicFindLogic = require('../.././../logic/topic/findLogic');
const { authenticate, authorizeAdminOrOwner } = require('../../../middleware/auth');
const { createValidator } = require('../../../middleware/validator/request/topic');

module.exports = {
  get_index: [
    async (req, res) => {
      const { findTopic } = topicFindLogic;
      const { page } = req.query;
      try {
        const topics = await findTopic(page);
        res.ok(topics);
      } catch (error) {
        res.serverError({ message: 'Something went wrong' });
      }
    }],
  patch_index: [
    authenticate,
    authorizeAdminOrOwner,
    createValidator,
    async (req, res) => {
      const { name } = req.body;
      const { createTopic } = topicCreateLogic;
      const topic = await createTopic(name);
      if (topic) {
        res.ok(topic);
      } else {
        res.serverError();
      }
    }],
};
