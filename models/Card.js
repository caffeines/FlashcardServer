const mongoose = require('mongoose');
const { getModel } = require('../lib/utils');

const CardSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: 100,
    required: true,
  },
  description: {
    type: String,
    maxlength: 5000,
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
  createdBy: {
    type: String,
    required: true,
  },
  url: {
    type: String,
  },
});
CardSchema.index({
  '$**': 'text',
});
module.exports = getModel('Card', CardSchema);
