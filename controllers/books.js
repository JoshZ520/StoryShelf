// GET all books
const getAllBooks = async (req, res, next) => {
  // TODO: Implement - fetch all books from MongoDB
  res.status(200).json({ message: 'Get all books' });
};

// GET single book by ID
const getBookById = async (req, res, next) => {
  // TODO: Implement - fetch book by ID from MongoDB
  const { id } = req.params;
  res.status(200).json({ message: `Get book with id: ${id}` });
};

// POST create new book
const createBook = async (req, res, next) => {
  // TODO: Implement - create new book in MongoDB
  // Remember: book needs 7+ fields (title, author, ISBN, publishedDate, genre, description, pages)
  res.status(201).json({ message: 'Book created' });
};

// PUT update book by ID
const updateBook = async (req, res, next) => {
  // TODO: Implement - update book in MongoDB
  const { id } = req.params;
  res.status(200).json({ message: `Update book with id: ${id}` });
};

// DELETE book by ID
const deleteBook = async (req, res, next) => {
  // TODO: Implement - delete book from MongoDB
  const { id } = req.params;
  res.status(200).json({ message: `Delete book with id: ${id}` });
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook
};
