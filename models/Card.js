const mongoose = require('mongoose');
const ObjectId = require('mongoose').SchemaTypes;
const { getModel } = require('../lib/utils');

const CardSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: 5,
    required: true,
  },
  back: {
    type: String,
    required: true,
  },
  state: {
    type: String, // Known or unknown
    default: 'unknown',
  },
  style: {
    type: String,
  },
  topic: {
    type: ObjectId,
    ref: 'Topic',
    required: true,
  },
  created: {
    type: Number,
    default: Date.now(),
  },
});
CardSchema.index({
  '$**': 'text',
});
module.exports = getModel('Card', CardSchema);
