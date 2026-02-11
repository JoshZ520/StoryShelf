const mongoose = require('mongoose');
const Book = require('../models/Book');

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
    return buildError(409, 'Duplicate value for a unique field');
  }
  return err;
};

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// GET all books
const getAllBooks = async (req, res, next) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (err) {
    next(handleDbError(err));
  }
};

// GET single book by ID
const getBookById = async (req, res, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return next(buildError(400, 'Invalid book id'));
  }

  try {
    const book = await Book.findById(id);
    if (!book) {
      return next(buildError(404, 'Book not found'));
    }
    res.status(200).json(book);
  } catch (err) {
    next(handleDbError(err));
  }
};

// POST create new book
const createBook = async (req, res, next) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch (err) {
    next(handleDbError(err));
  }
};

// PUT update book by ID
const updateBook = async (req, res, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return next(buildError(400, 'Invalid book id'));
  }

  if (!req.body || Object.keys(req.body).length === 0) {
    return next(buildError(400, 'Update body is required'));
  }

  try {
    const book = await Book.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });
    if (!book) {
      return next(buildError(404, 'Book not found'));
    }
    res.status(200).json(book);
  } catch (err) {
    next(handleDbError(err));
  }
};

// DELETE book by ID
const deleteBook = async (req, res, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return next(buildError(400, 'Invalid book id'));
  }

  try {
    const book = await Book.findByIdAndDelete(id);
    if (!book) {
      return next(buildError(404, 'Book not found'));
    }
    res.status(200).json({ message: 'Book deleted' });
  } catch (err) {
    next(handleDbError(err));
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook
};
