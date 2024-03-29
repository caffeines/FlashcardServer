const mongoose = require('mongoose');
const { ObjectId } = require('mongoose').SchemaTypes;
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
    default: 'user',
  },
  token: {
    type: String,
  },
  tokenGeneratedAt: {
    type: Number,
    default: Date.now(),
  },
  tokenExpiresAt: {
    type: Number,
  },
  joinedAt: {
    type: Number,
    default: Date.now(),
  },
  suggestedTopics: {
    type: [String],
  },
  favouriteTopics: {
    type: [String],
  },
  lovedCard: {
    type: [ObjectId],
    ref: 'Card',
  },
});
UserSchema.index({
  '$**': 'text',
});
module.exports = getModel('User', UserSchema);
