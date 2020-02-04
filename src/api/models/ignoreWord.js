const mongoose = require('mongoose');

const { Schema } = mongoose;

const wordSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model('ignoreWord', wordSchema);
