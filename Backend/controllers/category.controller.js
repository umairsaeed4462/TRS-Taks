const Category = require('../models/category.model');
const { StatusCode } = require('../consts/const');
const { responseHandler } = require('../utils/responseHandler');

// Create a new category
const createCategory = async (req, res) => {
    const { title } = req.body;
    try {
        if (!title) {
            return responseHandler(res, StatusCode.BAD_REQUEST, 'Title is required');
        }
        const existingCategory = await Category.findOne({ title });
        if (existingCategory) {
            return responseHandler(res, StatusCode.CONFLICT, 'Category already exists');
        }

        const category = new Category({ title });
        await category.save();

        return responseHandler(res, StatusCode.CREATED, 'Category created successfully', category);
    } catch (error) {
        console.error(error);
        return responseHandler(res, StatusCode.INTERNAL_SERVER_ERROR, error.message, error);
    }
};

// Get all categories
const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        return responseHandler(res, StatusCode.SUCCESS, 'Categories fetched successfully', categories);
    } catch (error) {
        console.error(error);
        return responseHandler(res, StatusCode.INTERNAL_SERVER_ERROR, error.message, error);
    }
};

// Get a single category by ID
const getCategoryById = async (req, res) => {
    const { categoryId } = req.params;
    try {
        const category = await Category.findById(categoryId);
        if (!category) {
            return responseHandler(res, StatusCode.NOT_FOUND, 'Category not found');
        }
        return responseHandler(res, StatusCode.SUCCESS, 'Category fetched successfully', category);
    } catch (error) {
        console.error(error);
        return responseHandler(res, StatusCode.INTERNAL_SERVER_ERROR, error.message, error);
    }
};

// Update a category by ID
const updateCategory = async (req, res) => {
    const { categoryId } = req.params;
    const { title } = req.body;
    try {
        if (!title) {
            return responseHandler(res, StatusCode.BAD_REQUEST, 'Title is required');
        }

        const updatedCategory = await Category.findByIdAndUpdate(
            categoryId,
            { title },
            { new: true }
        );

        if (!updatedCategory) {
            return responseHandler(res, StatusCode.NOT_FOUND, 'Category not found');
        }

        return responseHandler(res, StatusCode.SUCCESS, 'Category updated successfully', updatedCategory);
    } catch (error) {
        console.error(error);
        return responseHandler(res, StatusCode.INTERNAL_SERVER_ERROR, error.message, error);
    }
};

// Delete a category by ID
const deleteCategory = async (req, res) => {
    const { categoryId } = req.params;
    try {
        const deletedCategory = await Category.findByIdAndDelete(categoryId);

        if (!deletedCategory) {
            return responseHandler(res, StatusCode.NOT_FOUND, 'Category not found');
        }

        return responseHandler(res, StatusCode.SUCCESS, 'Category deleted successfully', deletedCategory);
    } catch (error) {
        console.error(error);
        return responseHandler(res, StatusCode.INTERNAL_SERVER_ERROR, error.message, error);
    }
};

module.exports = {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory,
};
