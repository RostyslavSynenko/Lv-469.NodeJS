const mongoose = require('mongoose');
const { Schema } = mongoose;

const newsSchema = new Schema({
  imgSrc: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('news', newsSchema);
