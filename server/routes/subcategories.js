const express = require('express');
const router = express.Router();

const { authCheck, adminCheck} = require('../middleware/auth');
const { read, create, update, remove, list } = require('../controllers/subcategories');


router.get('/sub-categories', list);
router.get('/sub-categories/:slug', authCheck, adminCheck, read);
router.post('/sub-categories', authCheck, adminCheck, create);
router.put('/sub-categories/:slug', authCheck, adminCheck, update);
router.delete('/sub-categories/:slug', authCheck, adminCheck, remove );


module.exports = router;