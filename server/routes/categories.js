const express = require('express');
const router = express.Router();

const { authCheck, adminCheck} = require('./../middleware/auth');
const { read, create, update, remove, list } = require('./../controllers/categories');


router.get('/categories', list);
router.get('/categories/:slug', authCheck, adminCheck, read);
router.post('/categories', authCheck, adminCheck, create);
router.put('/categories/:slug', authCheck, adminCheck, update);
router.delete('/categories/:slug', authCheck, adminCheck, remove );


module.exports = router;