const express = require('express');
const { body } = require('express-validator');
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');
const validateRequest = require('../middleware/validateRequest');

const router = express.Router();

const productValidators = [
  body('name').optional().trim().isLength({ min: 2 }).withMessage('Product name must be at least 2 characters long'),
  body('description').optional().trim().isLength({ min: 10 }).withMessage('Description must be at least 10 characters long'),
  body('price').optional().isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('category').optional().trim().notEmpty().withMessage('Category cannot be empty'),
  body('stock').optional().isInt({ min: 0 }).withMessage('Stock must be a non-negative integer'),
  body('imageUrl').optional().isString().withMessage('Image URL must be a string'),
  body('isActive').optional().isBoolean().withMessage('isActive must be true or false'),
];

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', protect, productValidators, validateRequest, createProduct);
router.put('/:id', protect, productValidators, validateRequest, updateProduct);
router.patch('/:id', protect, productValidators, validateRequest, updateProduct);
router.delete('/:id', protect, deleteProduct);

module.exports = router;
