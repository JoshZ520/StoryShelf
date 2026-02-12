const router = require('express').Router();
const usersController = require('../controllers/users');

// GET all users
router.get('/', usersController.getAllUsers);

// GET single user by ID
router.get('/:id', usersController.getUserById);

// POST create new user
router.post('/', usersController.createUser);

// PUT update user by ID
router.put('/:id', usersController.updateUser);

// DELETE user by ID
router.delete('/:id', usersController.deleteUser);

module.exports = router;
