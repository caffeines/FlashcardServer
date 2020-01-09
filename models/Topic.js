const mongoose = require('mongoose');
const ObjectId = require('mongoose').SchemaTypes;
const { getModel } = require('../lib/utils');

const TopicSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 5,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdBy: {
    type: ObjectId,
    ref: 'User',
    required: true,
  },
  url: {
    type: String,
  },
  tag: [{
    type: String,
  }],
  skill: {
    type: Number,
    default: 0,
  },
});

TopicSchema.index({
  '$**': 'text',
});

module.exports = getModel('Topic', TopicSchema);
