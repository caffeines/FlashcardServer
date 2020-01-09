const mongoose = require('mongoose');
const { getModel } = require('../lib/utils');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    minlength: 5,
    unique: true,
    required: true,
  },
  name: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  verfied: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    default: 'owner',
  },
  token: {
    type: String,
  },
  joinedAt: {
    type: Number,
    default: Date.now(),
  },
});
UserSchema.index({
  '$**': 'text',
});
module.exports = getModel('User', UserSchema);
