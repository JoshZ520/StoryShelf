const router = require('express').Router();
const booksRoutes = require('./books');

router.use('/books', booksRoutes);

router.get('/', (req, res) => {
	res.status(200).json({ message: 'StoryShelf API is running' });
});

module.exports = router;
