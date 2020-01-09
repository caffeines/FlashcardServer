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
        res.ok(profile);
      } else {
        res.notFound({ message: 'user not found' });
      }
    },
  ],
};
