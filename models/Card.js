const mongoose = require('mongoose');
const ObjectId = require('mongoose').SchemaType;
const { getModel } = require('../lib/utils');

const CardSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: 5,
    unique: true,
    required: true,
  },
  back: {
    type: String,
  },
  state: {
    type: String,
  },
  style: {
    type: String,
  },
  topic: {
    type: ObjectId,
    ref: 'Topic',
  },

});
CardSchema.index({
  "$**": "text"
});
module.exports = getModel('Card', CardSchema);
