const router = require('express').Router();
const booksRoutes = require('./books');
const usersRoutes = require('./users');
const authRoutes = require('./auth');

router.use('/books', booksRoutes);
router.use('/users', usersRoutes);
router.use('/auth', authRoutes);

router.get('/', (req, res) => {
	res.status(200).json({ message: 'StoryShelf API is running' });
});

module.exports = router;
