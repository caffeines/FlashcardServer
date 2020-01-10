
const { createRoadMapValidator } = require('../../../middleware/validator/request/roadMap');
const { authorizeAdminOrOwner, authenticate } = require('../../../middleware/auth');

module.exports = {
  get_index: [
    async (req, res) => {
      res.ok();
    }],
  post_index: [
    authenticate,
    createRoadMapValidator,
    async (req, res) => {
      res.ok(req.body);
    }],
};
