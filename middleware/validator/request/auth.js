const { validateEmail } = require('../../../lib/utils');

const loginValidator = (req, res, next) => {
  const { username, password } = req.body;
  if (username === '' || password === '') {
    res.badRequest({ message: 'Username and password are required field' });
    return;
  }
  next();
};
exports.loginValidator = loginValidator;

const usernemaIsAvailebleValidator = (req, res, next) => {
  const { username } = req.query;
  if (!username || username === '') {
    res.badRequest({ message: 'no a valid request' });
    return;
  }
  next();
};
exports.usernemaIsAvailebleValidator = usernemaIsAvailebleValidator;

const signupValidator = (req, res, next) => {
  const userInfo = Object.keys(req.body);
  const allowedInfo = ['name', 'email', 'password', 'username'];
  const isValidOperation = userInfo.every((info) => allowedInfo.includes(info));

  if (!isValidOperation) {
    res.badRequest('not a valid request');
    return;
  }
  const {
    name, username, email, password,
  } = req.body;

  if (!name || name === '' || !username || username === '' || !email || email === '' || !password || password === '') {
    res.badRequest({ message: 'Check your input fields' });
    return;
  }
  if (!validateEmail(email)) {
    res.badRequest({ message: 'Invalid email' });
    return;
  }
  if (username && username.length < 5) {
    res.badRequest({ message: 'Invalid contact username' });
    return;
  }
  next();
};
exports.signupValidator = signupValidator;
