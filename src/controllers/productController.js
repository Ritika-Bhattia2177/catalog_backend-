const mongoose = require('mongoose');
const Product = require('../models/Product');
const connectDB = require('../config/db');
const asyncHandler = require('../utils/asyncHandler');

const buildProductQuery = (query) => {
  const filter = { isActive: true };

  if (query.search) {
    filter.name = { $regex: query.search, $options: 'i' };
  }

  if (query.category) {
    filter.category = { $regex: `^${query.category}$`, $options: 'i' };
  }

  if (query.minPrice || query.maxPrice) {
    filter.price = {};
    if (query.minPrice) filter.price.$gte = Number(query.minPrice);
    if (query.maxPrice) filter.price.$lte = Number(query.maxPrice);
  }

  if (query.inStock === 'true') {
    filter.stock = { $gt: 0 };
  }

  return filter;
};

const getProducts = asyncHandler(async (req, res) => {
  await connectDB();
  const filter = buildProductQuery(req.query);
  const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
  const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 10, 1), 100);
  const skip = (page - 1) * limit;
  const sortBy = req.query.sort || '-createdAt';

  const [products, total] = await Promise.all([
    Product.find(filter)
      .populate('createdBy', 'name email')
      .sort(sortBy)
      .skip(skip)
      .limit(limit),
    Product.countDocuments(filter),
  ]);

  res.status(200).json({
    success: true,
    count: products.length,
    total,
    page,
    pages: Math.ceil(total / limit),
    data: products,
  });
});

const getProductById = asyncHandler(async (req, res) => {
  await connectDB();
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: 'Invalid product ID' });
  }

  const product = await Product.findById(id).populate('createdBy', 'name email');

  if (!product) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }

  res.status(200).json({ success: true, data: product });
});

const createProduct = asyncHandler(async (req, res) => {
  await connectDB();
  const product = await Product.create({
    ...req.body,
    createdBy: req.user._id,
  });

  res.status(201).json({
    success: true,
    message: 'Product created successfully',
    data: product,
  });
});

const updateProduct = asyncHandler(async (req, res) => {
  await connectDB();
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: 'Invalid product ID' });
  }

  const product = await Product.findById(id);

  if (!product) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }

  const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  }).populate('createdBy', 'name email');

  res.status(200).json({
    success: true,
    message: 'Product updated successfully',
    data: updatedProduct,
  });
});

const deleteProduct = asyncHandler(async (req, res) => {
  await connectDB();
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: 'Invalid product ID' });
  }

  const product = await Product.findById(id);

  if (!product) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }

  await Product.findByIdAndDelete(id);

  res.status(200).json({
    success: true,
    message: 'Product deleted successfully',
  });
});

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
