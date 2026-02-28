const router = require('express').Router();
const booksController = require('../controllers/books');
const { isAuthenticated } = require('../middleware/auth');

// GET all books (protected)
router.get('/',
	/* #swagger.tags = ['Books']
	   #swagger.description = 'Get all books. Requires Google OAuth authentication.' */
	isAuthenticated,
	booksController.getAllBooks
);

// GET single book by ID (protected)
router.get('/:id',
	/* #swagger.tags = ['Books']
	   #swagger.description = 'Get a specific book by ID. Requires Google OAuth authentication.' */
	isAuthenticated,
	booksController.getBookById
);

// POST create new book (protected)
router.post(
	'/',
	/* #swagger.tags = ['Books']
	   #swagger.description = 'Create a new book. Requires Google OAuth authentication.' */
	isAuthenticated,
	/* #swagger.parameters['book'] = {
		in: 'body',
		description: 'Book payload',
		required: true,
		schema: { $ref: '#/definitions/BookInput' }
	} */
	booksController.createBook
);

// PUT update book by ID (protected)
router.put(
	'/:id',
	/* #swagger.tags = ['Books']
	   #swagger.description = 'Update a book by ID. Requires Google OAuth authentication.' */
	isAuthenticated,
	/* #swagger.parameters['book'] = {
		in: 'body',
		description: 'Book payload',
		required: true,
		schema: { $ref: '#/definitions/BookInput' }
	} */
	booksController.updateBook
);

// DELETE book by ID (protected)
router.delete('/:id',
	/* #swagger.tags = ['Books']
	   #swagger.description = 'Delete a book by ID. Requires Google OAuth authentication.' */
	isAuthenticated,
	booksController.deleteBook
);

module.exports = router;
