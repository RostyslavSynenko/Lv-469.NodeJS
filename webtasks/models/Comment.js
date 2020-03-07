const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentsSchema = new Schema({
  comment: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('comments', commentsSchema);
