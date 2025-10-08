import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";
import Category from "../models/Category.js";

const router = express.Router();
// ✅ GET all categories
router.get('/categories', async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch categories' });
  }
});

// ✅ POST /admin/categories - Add new category
router.post(
  '/admin/categories',
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Category name is required' });
    }

    try {
      const existing = await Category.findOne({ name });
      if (existing) {
        return res.status(400).json({ message: 'Category already exists' });
      }

      const category = new Category({ name, subcategories: [] });
      await category.save();

      res.status(201).json({ message: 'Category created successfully', category });
    } catch (err) {
      res.status(500).json({ message: 'Failed to create category', error: err.message });
    }
  }
);

// ✅ POST /admin/categories/:categoryId/subcategories - Add subcategories
router.post(
  '/admin/categories/:categoryId/subcategories',
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    const { categoryId } = req.params;
    const { subcategories } = req.body;

    if (!Array.isArray(subcategories) || subcategories.length === 0) {
      return res.status(400).json({ message: 'Subcategories must be a non-empty array' });
    }

    try {
      const category = await Category.findById(categoryId);
      if (!category) return res.status(404).json({ message: 'Category not found' });

      const newSubcategories = subcategories.map((name) => ({ name }));
      category.subcategories.push(...newSubcategories);

      await category.save();

      res.status(201).json({ message: 'Subcategories added', category });
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  }
);

// ✅ DELETE /admin/categories/:id - Delete category
router.delete(
  '/admin/categories/:id',
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await Category.findByIdAndDelete(id);

      if (!deleted) {
        return res.status(404).json({ message: 'Category not found' });
      }

      res.json({ message: 'Category deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Failed to delete category', error: err.message });
    }
  }
);

// ✅ DELETE /admin/categories/:categoryId/subcategories/:subId - Delete subcategory
router.delete(
  '/admin/categories/:categoryId/subcategories/:subId',
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    const { categoryId, subId } = req.params;

    try {
      const category = await Category.findById(categoryId);
      if (!category) return res.status(404).json({ message: 'Category not found' });

      const sub = category.subcategories.id(subId);
      if (!sub) return res.status(404).json({ message: 'Subcategory not found' });

      sub.remove();
      await category.save();

      res.json({ message: 'Subcategory deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Failed to delete subcategory', error: err.message });
    }
  }
);

export default router;
