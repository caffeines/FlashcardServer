/* eslint-disable object-curly-newline */
const cardCreateLogic = require('../../../logic/card/createLogic');
const { authenticate, authorizeAdminOrOwner } = require('../../../middleware/auth');
const { createCardValidator } = require('../../../middleware/validator/request/card');

module.exports = {
  get_index: [
    authenticate,
    async (req, res) => {
      res.ok();
    }],

  post_index: [
    authenticate,
    createCardValidator,
    async (req, res) => {
      const { createCard } = cardCreateLogic;
      const { title, back, state, style, topic } = req.body;
      const card = await createCard({ title, back, state, style, topic });
      if (card) {
        res.ok(card);
      } else {
        res.serverError();
      }
    }],
};
