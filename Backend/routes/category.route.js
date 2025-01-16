const express = require('express');
const router = express.Router();
const { createCategory, getAllCategories, getCategoryById, updateCategory, deleteCategory } = require('../controllers/category.controller');
const authenticateToken = require('../middlewares/authenticate');

router.route('/')
    .get(authenticateToken, getAllCategories) 
    .post(authenticateToken, createCategory); 

router.route('/:categoryId')
    .get(authenticateToken, getCategoryById)
    .put(authenticateToken, updateCategory)
    .delete(authenticateToken, deleteCategory);

module.exports = router;
