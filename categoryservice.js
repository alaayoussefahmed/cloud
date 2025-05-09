const slugify = require('slugify');
const asyncHandler = require('express-async-handler');
const Category = require('../models/categoryModel');

// @desc    Get list of categories
// @route   GET /api/v1/categories
// @access  Public
exports.getCategories = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page)  1;
    const limit = parseInt(req.query.limit)  5;
    const skip = (page - 1) * limit;

    const categories = await Category.find().skip(skip).limit(limit);
    res.status(200).json({
        results: categories.length,
        page,
        data: categories,
    });
});

// @desc    Get specific category by ID
// @route   GET /api/v1/categories/:id
// @access  Public
exports.getCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const category = await Category.findById(id);

    if (!category) {
        return res.status(404).json({ msg: No category found for this ID: ${id} });
    }

    res.status(200).json({ data: category });
});

// @desc    Create new category
// @route   POST /api/v1/categories
// @access  Private
exports.createCategory = asyncHandler(async (req, res) => {
    const { name } = req.body;
    const category = await Category.create({
        name,
        slug: slugify(name),
    });

    res.status(201).json({ data: category });
});

// @desc    Update specific category
// @route   PUT /api/v1/categories/:id
// @access  Private
exports.updateCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    const category = await Category.findByIdAndUpdate(
        id,
        { name, slug: slugify(name) },
        { new: true }
    );

    if (!category) {
        return res.status(404).json({ msg: No category found for this ID: ${id} });
    }

    res.status(200).json({ data: category });
});

// @desc    Delete specific category
// @route   DELETE /api/v1/categories/:id
// @access  Private
exports.deleteCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const category = await Category.findByIdAndDelete(id);

    if (!category) {
        return res.status(404).json({ msg: No category found for this ID: ${id} });
    }

    res.status(204).send(); // No content
});
