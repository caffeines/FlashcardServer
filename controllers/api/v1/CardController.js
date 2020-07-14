/* eslint-disable object-curly-newline */
const cardCreateLogic = require('../../../logic/card/createLogic');
const createTopicLogic = require('../../../logic/topic/updateLogic');
const cardFindLogic = require('../../../logic/card/findLogic');
const { authenticate, authorizeAdminOrOwner } = require('../../../middleware/auth');
const { createCardValidator } = require('../../../middleware/validator/request/card');

module.exports = {
  get_index: [
    async (req, res) => {
      const { findCard } = cardFindLogic;
      const { type, lastId, page, limit, topics } = req.query;
      try {
        const cards = await findCard(type, lastId, page, limit, topics, {});
        res.ok({ cards });
      } catch (err) {
        res.serverError(err);
      }
    }],

  post_index: [
    authenticate,
    createCardValidator,
    async (req, res) => {
      const { title, description, topic, url } = req.body;
      const { id: createdBy } = req.admin || req.user;
      try {
        const card = await cardCreateLogic.createCard({
          title, description, url, topic, createdBy,
        });
        topic.forEach(async (topc) => {
          await createTopicLogic.createTopic(topc);
        });
        res.ok(card);
      } catch (err) {
        res.serverError(err);
      }
    }],
};
