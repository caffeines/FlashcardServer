const { authenticate, authorizeAdminOrOwner } = require('../../../middleware/auth');

module.exports = {
  get_index: [
    authenticate,
    async (req, res) => {
      res.ok({ hello: 'Hello' });
    }],
};
