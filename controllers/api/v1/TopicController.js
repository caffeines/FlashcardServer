/* eslint-disable object-curly-newline */
const topicCreateLogic = require('../.././../logic/topic/createLogic');
const { authenticate, authorizeAdminOrOwner } = require('../../../middleware/auth');
const { createValidator } = require('../../../middleware/validator/request/topic');

module.exports = {
  get_index: [
    async (req, res) => {
      res.ok({ message: 'Hello Docker!' });
    }],
  post_index: [
    authenticate,
    createValidator,
    async (req, res) => {
      const { name, description, url, tag, skill } = req.body;
      const { id: createdBy } = req.admin || req.user;
      const { createTopic } = topicCreateLogic;
      const topic = await createTopic({ name, description, createdBy, url, tag, skill });
      if (topic) {
        res.ok(topic);
      } else {
        res.serverError();
      }
    }],
};
