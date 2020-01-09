/* eslint-disable object-curly-newline */
const { authenticate, authorizeAdminOrOwner } = require('../../../middleware/auth');
const userFindLogic = require('../../../logic/User/findLogic');

module.exports = {
  get_index: [
    authenticate,
    authorizeAdminOrOwner,
    async (req, res) => {
      res.ok({ hello: 'Hello' });
    }],
  get_profile: [
    authenticate,
    async (req, res) => {
      const { id } = req.admin || req.user;
      const { findById } = userFindLogic;
      const profile = await findById(id);
      if (profile) {
        const { username, name, email, role, joinedAt } = profile;
        res.ok({ username, name, email, role, joinedAt });
      } else {
        res.notFound({ message: 'user not found' });
      }
    },
  ],
};
