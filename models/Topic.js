const mongoose = require('mongoose');
const { getModel } = require('../lib/utils');

const TopicSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true,
    unique: true,
  },
  score: {
    type: Number,
    default: 0,
  },
});

TopicSchema.index({
  '$**': 'text',
});

module.exports = getModel('Topic', TopicSchema);
