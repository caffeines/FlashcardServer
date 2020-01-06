const mongoose = require('mongoose');
const ObjectId = require('mongoose').SchemaType;
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
  url: {
    type: String,
  },
  tag: [{
    type: String,
  }],
  skill: {
    type: Number,
    default: 0,
  }
});

TopicSchema.index({
  "$**": "text"
});

module.exports = getModel('Topic', TopicSchema);