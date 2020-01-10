const mongoose = require('mongoose');
const ObjectId = require('mongoose').SchemaTypes;
const { getModel } = require('../lib/utils');

const RoadMapSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 5,
    required: true,
  },
  topic: [{
    topicId: {
      type: ObjectId,
      ref: 'Topic',
      required: true,
    },
    sequence: {
      type: Number,
      default: 0,
    },
  }],
  created: {
    type: Number,
    default: Date.now(),
  },
  creator: {
    type: ObjectId,
    ref: 'User',
  },
  star: [{
    type: ObjectId,
    ref: 'User',
  }],
});
RoadMapSchema.index({
  '$**': 'text',
});
module.exports = getModel('RoadMap', RoadMapSchema);
