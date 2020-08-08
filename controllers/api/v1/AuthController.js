/* eslint-disable no-underscore-dangle */
const bcrypt = require('bcrypt');
const userCreateLogic = require('../../../logic/User/createLogic');
const userFindLogic = require('../../../logic/User/findLogic');
const { saltRound } = require('../../../config/security');
const { mailer } = require('../../../middleware/nodeMailer');
const { createConfirmToken, verifyConfirmToken } = require('../../../logic/auth/email');
const { signupValidator, loginValidator, usernemaIsAvailebleValidator } = require('../../../middleware/validator/request/auth');
const { createToken } = require('../../../logic/auth/jwt');
const { error } = require('../../../constant/chalkEvent');
const { appLink } = require('../../../config/server');

module.exports = {
  get_confirmEmail: [
    async (req, res) => {
      try {
        const { userid, token } = req.query;
        const { code, status } = await verifyConfirmToken(userid, token);
        res[status]({ message: code });
      } catch (err) {
        res.serverError(err);
      }
    }],

  get_isAvailable: [
    usernemaIsAvailebleValidator,
    async (req, res) => {
      const { username } = req.query;
      const { findByUsername } = userFindLogic;
      try {
        const user = await findByUsername(username);
        if (user) {
          res.ok(false);
        } else res.ok(true);
      } catch (err) {
        res.serverError(err);
      }
    }],

  post_signup: [
    signupValidator,
    async (req, res) => {
      try {
        const { createUser } = userCreateLogic;
        const { findByUsername } = userFindLogic;
        const {
          username, name, email, password,
        } = req.body;
        const user = await findByUsername(username);
        if (user) {
          if (!user.verfied) {
            res.forbidden({ message: 'User not verified. Please, confirm your mail' });
            const token = await createConfirmToken(user._id);
            if (token) {
              await mailer(email, 'Email verification', `<a href='${appLink}/verify?token=${token}&userid=${user._id}'>Verify</a>`);
            }
            return;
          }
          res.badRequest({ message: 'User name already exist' });
          return;
        }
        const hashedPassword = await bcrypt.hash(password, saltRound);
        const newUser = await createUser({
          username, password: hashedPassword, email, name,
        });
        const token = await createConfirmToken(newUser._id);
        if (newUser && token) {
          res.ok({ message: 'Email send, please verify your email' });
          await mailer(email,
            'Email verification', `<a style="font-size: 50px;" href='${appLink}/verify?token=${token}&userid=${newUser._id}'>Verify</a>`);
          return;
        }
      } catch (err) {
        res.serverError(err);
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
        const { verfied, token: tokn } = user;
        let verificationToken = tokn;
        if (!verificationToken) {
          verificationToken = await createConfirmToken(user._id);
        }
        if (!verfied && verificationToken) {
          res.forbidden({ message: 'Please confirm your email' });
          await mailer(user.email, 'Email verification', `<a href='${appLink}/verify?token=${verificationToken}&userid=${user._id}'>Verify</a>`);
          return;
        }

        if (verfied === undefined && !verificationToken) {
          res.serverError({ message: 'Something went wrong' });
          return;
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (isValidPassword) {
          const jwtToken = await createToken(user);
          res.ok({ jwtToken });
        } else {
          res.unauthorized({ message: 'Username or Password incorrect' });
        }
      } catch (err) {
        error(err);
        res.serverError(err);
      }
    },
  ],
};
