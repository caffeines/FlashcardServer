const bcrypt = require('bcrypt');
const userCreateLogic = require('../../../logic/User/createLogic');
const userFindLogic = require('../../../logic/User/findLogic');
const { saltRound } = require('../../../config/security');
const { mailer } = require('../../../middleware/nodeMailer');
const { authenticate, authorizeAdminOrOwner } = require('../../../middleware/auth');
const { createConfirmToken, verifyConfirmToken } = require('../../../logic/auth/email');
const { signupValidator, loginValidator } = require('../../../middleware/validator/request/auth');
const { createToken, verifyToken } = require('../../../logic/auth/jwt');
const { error } = require('../../../constant/chalkEvent');


module.exports = {
  get_confirmEmail: [
    async (req, res) => {
      const { email, token } = req.query;
      const status = await verifyConfirmToken(email, token);
      if (status) {
        res.ok({ message: 'success' });
      } else {
        res.badRequest({ message: 'confirmation failed' });
      }
    }],

  post_signup: [
    signupValidator,
    async (req, res) => {
      const { createUser } = userCreateLogic;
      const { findByUsername } = userFindLogic;
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
        const mailResponse = await mailer(email, 'Email verification', `<a style="font-size: 50px;" href='http://localhost:4000/api/v1/auth/confirm-email?token=${token}&email=${email}'>Verify</a>`);
        if (mailResponse) {
          res.ok({ message: 'Email sent' });
        }
      } else {
        res.serverError({ message: 'Something went wrong' });
      }
    }],

  post_login: [
    loginValidator,
    async (req, res) => {
      const { findByUsername } = userFindLogic;
      const { username, password } = req.body;

      try {
        const user = await findByUsername(username);
        if (!user) {
          res.notFound({ message: 'User not found' });
          return;
        }

        if (!user.verfied && user.token) {
          const mailResponse = await mailer(user.email, 'Email verification', `<a href='http://localhost:4000/api/v1/auth/confirm-email?token=${user.token}&email=${user.email}'>Verify</a>`);
          if (mailResponse) {
            res.forbidden({ message: 'Please confirm your email' });
            return;
          }
          res.serverError({ message: 'Something went wrong' });
          return;
        }
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (isValidPassword) {
          const token = await createToken(user);
          res.ok({ token });
        } else {
          res.badRequest({ message: 'Email or Password incorrect' });
        }
      } catch (err) {
        error(err);
      }
    },
  ],
};
