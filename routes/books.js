const router = require('express').Router();
const booksController = require('../controllers/books');

// GET all books
router.get('/', booksController.getAllBooks);

// GET single book by ID
router.get('/:id', booksController.getBookById);

// POST create new book
/* #swagger.parameters['book'] = {
	in: 'body',
	description: 'Book payload',
	required: true,
	schema: { $ref: '#/definitions/BookInput' }
} */
router.post('/', booksController.createBook);

// PUT update book by ID
/* #swagger.parameters['book'] = {
	in: 'body',
	description: 'Book payload',
	required: true,
	schema: { $ref: '#/definitions/BookInput' }
} */
router.put('/:id', booksController.updateBook);

// DELETE book by ID
router.delete('/:id', booksController.deleteBook);

module.exports = router;
