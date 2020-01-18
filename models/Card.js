const mongoose = require('mongoose');
const { getModel } = require('../lib/utils');

const CardSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: 5,
    required: true,
  },
  description: {
    type: String,
    maxlength: 3000,
  },
  state: {
    type: String, // known or unknown
    default: 'unknown',
  },
  topic: {
    type: [String],
    required: true,
  },
  created: {
    type: Number,
    default: Date.now(),
  },
  love: {
    type: Number,
  },
});
CardSchema.index({
  '$**': 'text',
});
module.exports = getModel('Card', CardSchema);
