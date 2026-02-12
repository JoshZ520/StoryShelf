const mongoose = require('mongoose');
const User = require('../models/User');

const buildError = (statusCode, message) => {
  const err = new Error(message);
  err.statusCode = statusCode;
  return err;
};

const handleDbError = (err) => {
  if (err.name === 'ValidationError') {
    return buildError(400, err.message);
  }
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    return buildError(409, `${field} already exists`);
  }
  return err;
};

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// GET all users
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find()
      .select('-password')
      .populate('currentlyReading', 'title author')
      .populate('favorites', 'title author');
    res.status(200).json(users);
  } catch (err) {
    next(handleDbError(err));
  }
};

// GET single user by ID
const getUserById = async (req, res, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return next(buildError(400, 'Invalid user id'));
  }

  try {
    const user = await User.findById(id)
      .select('-password')
      .populate('currentlyReading', 'title author coverImageUrl')
      .populate('favorites', 'title author coverImageUrl');
    if (!user) {
      return next(buildError(404, 'User not found'));
    }
    res.status(200).json(user);
  } catch (err) {
    next(handleDbError(err));
  }
};

// POST create new user
const createUser = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    const userResponse = user.toObject();
    delete userResponse.password;
    res.status(201).json(userResponse);
  } catch (err) {
    next(handleDbError(err));
  }
};

// PUT update user by ID
const updateUser = async (req, res, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return next(buildError(400, 'Invalid user id'));
  }

  if (!req.body || Object.keys(req.body).length === 0) {
    return next(buildError(400, 'Update body is required'));
  }

  try {
    const user = await User.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    })
      .select('-password')
      .populate('currentlyReading', 'title author')
      .populate('favorites', 'title author');
    if (!user) {
      return next(buildError(404, 'User not found'));
    }
    res.status(200).json(user);
  } catch (err) {
    next(handleDbError(err));
  }
};

// DELETE user by ID
const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return next(buildError(400, 'Invalid user id'));
  }

  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return next(buildError(404, 'User not found'));
    }
    res.status(200).json({ message: 'User deleted' });
  } catch (err) {
    next(handleDbError(err));
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
