/* eslint-disable no-param-reassign */
const crypto = require('crypto');
const mongoose = require('mongoose');

const envVariableChecker = (arr) => {
  arr.forEach((key) => {
    if (process.env[key] === null || process.env[key] === undefined) {
      console.log(`${key} is null or undefined`);
    }
  });
};
exports.envVariableChecker = envVariableChecker;

/**
 * @description returns a random string of specified length
 * @param {number} length
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

const getModel = (modelName, schema) => (
  mongoose.modelNames().indexOf(modelName) === -1
    ? mongoose.model(modelName, schema)
    : mongoose.connection.model(modelName));

exports.getModel = getModel;