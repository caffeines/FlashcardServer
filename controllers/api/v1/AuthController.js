const bcrypt = require('bcrypt');
const createLogic = require('../../../logic/User/createLogic');
const findLogic = require('../../../logic/User/findLogic');
const { saltRound } = require('../../../config/security');
const { mailer } = require('../../../middleware/nodeMailer');
const { authenticate, authorizeAdminOrOwner } = require('../../../middleware/auth');
const { createConfirmToken, verifyConfirmToken } = require('../../../logic/auth/email');
const { signupValidator, loginValidator } = require('../../../middleware/validator/request/auth');


module.exports = {
  post_signup: [
    signupValidator,
    async (req, res) => {
      const { createUser } = createLogic;
      const { findByUsername } = findLogic;
      const {
        username, name, email, password,
      } = req.body;
      const user = await findByUsername(username);
      if (user) {
        const token = await createConfirmToken(email);
        if (!user.verfied) {
          if (token) {
            const mailResponse = await mailer(email, 'Email verification', `<a href='http://localhost:4000/api/v1/auth/confirm-email?token=${token}&email=${email}'>Verify</a>`);
            if (mailResponse) {
              res.forbidden({ message: 'User name allready exist, confirm your mail' });
              return;
            }
          }
        }
        res.badRequest({ message: 'User name allready exist' });
        return;
      }
      const hashedPassword = await bcrypt.hash(password, saltRound);
      const newUser = await createUser({
        username, password: hashedPassword, email, name,
      });
      const token = await createConfirmToken(email);
      if (newUser && token) {
        const mailResponse = await mailer(email, 'Email verification', `<a href='http://localhost:4000/api/v1/auth/confirm-email?token=${token}&email=${email}'>Verify</a>`);
        if (mailResponse) {
          res.ok({ message: 'Email sent' });
        }
      } else {
        res.serverError({ message: 'Something went wrong' });
      }
    },
  ],
};
