/* eslint-disable no-param-reassign */
const crypto = require('crypto');
const mongoose = require('mongoose');

const { error } = require('../constant/chalkEvent');

const envVariableChecker = (arr) => {
  arr.forEach((key) => {
    if (process.env[key] === null || process.env[key] === undefined) {
      error(`${key} is null or undefined`);
    }
  });
};
exports.envVariableChecker = envVariableChecker;

/**
 * @description returns a random string of specified length
 * @param {number} length
 * @param {Object(upperCase, lowerCase, numeric)} options
 * @returns {string}
 */
const cryptoRandomString = (length, options) => {
  const defaultOptions = {
    upperCase: true, lowerCase: true, numeric: true,
  };

  options = options || {};
  options = { ...defaultOptions, ...options };

  let chars = '';
  if (options.lowerCase) chars += 'abcdefghijklmnopqrstuvwxyz';
  if (options.upperCase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (options.numeric) chars += '0123456789';

  return new Promise((resolve, reject) => {
    crypto.randomBytes(length, (err, buffer) => {
      if (err) reject(err);
      const len = chars.length;
      const ret = [];
      for (let i = 0; i < length; i += 1) {
        ret[i] = chars.charAt(buffer[i] % len);
      }
      resolve(ret.join(''));
    });
  });
};

exports.cryptoRandomString = cryptoRandomString;

const validateEmail = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};
exports.validateEmail = validateEmail;


const getModel = (modelName, schema) => (
  mongoose.modelNames().indexOf(modelName) === -1
    ? mongoose.model(modelName, schema)
    : mongoose.connection.model(modelName));

exports.getModel = getModel;
