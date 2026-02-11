const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    author: {
      type: String,
      required: true,
      trim: true
    },
    series: {
      type: String,
      trim: true
    },
    seriesOrder: {
      type: Number,
      min: 1
    },
    publisher: {
      type: String,
      trim: true
    },
    genres: {
      type: [String],
      default: []
    },
    tags: {
      type: [String],
      default: []
    },
    formatOptions: {
      type: [String],
      default: []
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 10
    },
    coverImageUrl: {
      type: String,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Book', bookSchema, 'Books');
