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
      const { userid, token } = req.query;
      console.log(userid, token);

      const status = await verifyConfirmToken(userid, token);
      console.log(status);

      if (status) {
        res.ok({ message: 'success' });
      } else {
        res.badRequest({ message: 'confirmation failed' });
      }
    }],

  get_isAvailable: [
    usernemaIsAvailebleValidator,
    async (req, res) => {
      const { username } = req.query;
      const { findByUsername } = userFindLogic;
      const user = await findByUsername(username);
      if (user) {
        res.ok(false);
      } else res.ok(true);
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
            const mailResponse = await mailer(email, 'Email verification', `<a href='${appLink}/verify?token=${token}&userid=${user._id}'>Verify</a>`);
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
      const token = await createConfirmToken(newUser._id);
      if (newUser && token) {
        const { status, message } = await mailer(email,
          'Email verification', `<a style="font-size: 50px;" href='${appLink}/verify?token=${token}&userid=${newUser._id}'>Verify</a>`);
        if (status) {
          res.ok({ message });
        } else {
          res.serverError({ message });
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
        const { verfied, token: tokn, email } = user;
        let verificationToken = tokn;
        if (!verificationToken) {
          verificationToken = await createConfirmToken(email);
        }
        try {
          if (!verfied && verificationToken) {
            const mailResponse = await mailer(user.email, 'Email verification', `<a href='${appLink}/verify?token=${verificationToken}&userid=${user._id}'>Verify</a>`);
            if (mailResponse) {
              res.forbidden({ message: 'Please confirm your email' });
              return;
            }
            res.serverError({ message: 'Something went wrong' });
            return;
          }
        } catch (ex) {
          console.log(ex);
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
          res.badRequest({ message: 'Email or Password incorrect' });
        }
      } catch (err) {
        error(err);
      }
    },
  ],
};
