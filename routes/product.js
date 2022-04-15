var express = require('express');
var router = express.Router();
const { protect, isAdmin } = require('../middleware/authMiddleware');
const { getProducts, createProduct, createReview, getProductById, updateProductById } = require('../controller/productController');

// 1.
// @desc: Get all products
// @route: GET /api/products
// @access: Public
router.get('/', getProducts);

// 2.
// @desc: Create a product
// @route: POST /api/products
// @access: Private/admin
router.post('/', protect, isAdmin, createProduct);

// 3.
// @desc: Create Review for product
// @route: POST /api/products/:id/reviews
// @access: Private
router.get('/:id/reviews', protect, createReview);

// @desc: Get product by ID
// @route: GET /api/products/search/:id
// @access: Public
router.get('/:id', getProductById);


// @desc: Delete product by ID
// @route: Delete /api/products/:id
// @access: Private/admin

// @desc: Update product by ID
// @route: PUT /api/products/:id
// @access: Private/admin
router.put('/:id', protect, isAdmin, updateProductById);

// @desc: Get top products by ID
// @route: GET /api/products/top
// @access: Public

module.exports = router;