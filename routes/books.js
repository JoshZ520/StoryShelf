const router = require('express').Router();
const booksController = require('../controllers/books');

// GET all books
router.get('/', booksController.getAllBooks);

// GET single book by ID
router.get('/:id', booksController.getBookById);

// POST create new book
router.post(
	'/',
	/* #swagger.parameters['book'] = {
		in: 'body',
		description: 'Book payload',
		required: true,
		schema: { $ref: '#/definitions/BookInput' }
	} */
	booksController.createBook
);

// PUT update book by ID
router.put(
	'/:id',
	/* #swagger.parameters['book'] = {
		in: 'body',
		description: 'Book payload',
		required: true,
		schema: { $ref: '#/definitions/BookInput' }
	} */
	booksController.updateBook
);

// DELETE book by ID
router.delete('/:id', booksController.deleteBook);

module.exports = router;
