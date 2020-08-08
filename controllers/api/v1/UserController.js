/* eslint-disable object-curly-newline */
const { authenticate, authorizeAdminOrOwner } = require('../../../middleware/auth');
const userFindLogic = require('../../../logic/User/findLogic');
const updateLogic = require('../../../logic/User/updateLogic');
const { isNameAvilable } = require('../../../middleware/validator/request/user');

module.exports = {
  get_index: [
    authenticate,
    authorizeAdminOrOwner,
    async (req, res) => {
      // TODO: Implement later
      res.ok({ hello: 'Hello' });
    }],
  get_profile: [
    authenticate,
    async (req, res) => {
      const { id } = req.admin || req.user;
      const { findById } = userFindLogic;
      const profile = await findById(id);
      if (profile) {
        const { username, name, email, role, joinedAt, favouriteTopics } = profile;
        res.ok({ username, name, email, role, joinedAt, id, favouriteTopics });
      } else {
        res.notFound({ message: 'User not found' });
      }
    },
  ],
  patch_addFavourite: [
    authenticate,
    isNameAvilable,
    async (req, res) => {
      try {
        const { name } = req.body;
        const { id } = req.admin || req.user;
        await updateLogic.addFavoriteTopicById(id, name);
        res.ok({ message: 'success' });
      } catch (err) {
        res.serverError(err);
      }
    },
  ],
  patch_removeFavourite: [
    authenticate,
    isNameAvilable,
    async (req, res) => {
      try {
        const { name } = req.body;
        const { id } = req.admin || req.user;
        await updateLogic.removeFavoriteTopicById(id, name);
        res.ok({ message: 'success' });
      } catch (err) {
        res.serverError(err);
      }
    },
  ],
};
