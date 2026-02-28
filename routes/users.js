const router = require('express').Router();
const usersController = require('../controllers/users');
const { isAuthenticated } = require('../middleware/auth');

// GET all users (protected)
router.get('/',
	/* #swagger.tags = ['Users']
	   #swagger.description = 'Get all users. Requires Google OAuth authentication.' */
	isAuthenticated,
	usersController.getAllUsers
);

// GET single user by ID (protected)
router.get('/:id',
	/* #swagger.tags = ['Users']
	   #swagger.description = 'Get a specific user by ID. Requires Google OAuth authentication.' */
	isAuthenticated,
	usersController.getUserById
);

// POST create new user (protected)
router.post('/',
	/* #swagger.tags = ['Users']
	   #swagger.description = 'Create a new user. Requires Google OAuth authentication.' */
	isAuthenticated,
	usersController.createUser
);

// PUT update user by ID (protected)
router.put('/:id',
	/* #swagger.tags = ['Users']
	   #swagger.description = 'Update a user by ID. Requires Google OAuth authentication.' */
	isAuthenticated,
	usersController.updateUser
);

// DELETE user by ID (protected)
router.delete('/:id',
	/* #swagger.tags = ['Users']
	   #swagger.description = 'Delete a user by ID. Requires Google OAuth authentication.' */
	isAuthenticated,
	usersController.deleteUser
);

module.exports = router;
