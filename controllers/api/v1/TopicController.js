/* eslint-disable object-curly-newline */
const topicCreateLogic = require('../.././../logic/topic/updateLogic');
const { authenticate, authorizeAdminOrOwner } = require('../../../middleware/auth');
const { createValidator } = require('../../../middleware/validator/request/topic');

module.exports = {
  get_index: [
    async (req, res) => {
      res.ok({ message: 'Hello Docker!' });
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
