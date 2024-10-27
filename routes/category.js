const { getCategories } = require('../controllers/category');

const router = require('express').Router();

router.route('/').get(getCategories);

module.exports = router;