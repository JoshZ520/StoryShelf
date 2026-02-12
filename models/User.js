const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 30
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address']
    },
    firstName: {
      type: String,
      required: true,
      trim: true
    },
    lastName: {
      type: String,
      required: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      minlength: 6
    },
    bio: {
      type: String,
      trim: true,
      maxlength: 500
    },
    favoriteGenres: {
      type: [String],
      default: []
    },
    readingGoal: {
      type: Number,
      min: 0
    },
    booksRead: {
      type: Number,
      default: 0,
      min: 0
    },
    currentlyReading: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book'
    }],
    favorites: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book'
    }],
    profileImageUrl: {
      type: String,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('User', userSchema);
