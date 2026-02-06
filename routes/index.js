// Central route aggregator
const router = require('express').Router();

router.use('/books', require('./books'));
// router.use('/users', require('./users'));

module.exports = router;
