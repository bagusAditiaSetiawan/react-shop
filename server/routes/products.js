const express = require('express');
const router = express.Router();

const { create, read } = require('./../controllers/products');
const { authCheck, adminCheck,  } = require('./../middleware/auth');


router.post('/products', authCheck, adminCheck, create);

router.get('/products', read)

module.exports = router;