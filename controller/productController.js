const Product = require('../model/productModel');
const expressAsyncHandler = require('express-async-handler');

const getProducts = expressAsyncHandler(async(req, res) => {
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;
    const keyword = req.query.keyword ? { name: { $regex: req.query.keyword } } : {};
    const countProducts = await Product.countDocuments({...keyword });
    const products = await Product.find({...keyword }).limit(pageSize).skip(pageSize * (page - 1));
    res.json({
        products,
        countProducts,
        page
    });
});

const createProduct = expressAsyncHandler(async(req, res) => {
    const { name, description, price, image, brand, category, countInStock } = req.body;
    const { _id } = req.user;
    const product = new Product({
        user: _id,
        name: name,
        description: description,
        price: price,
        image: image,
        brand: brand,
        category: category,
        countInStock: countInStock
    });
    const resultProduct = await product.save();
    res.status(200).json(resultProduct);
});

const createReview = expressAsyncHandler(async(req, res) => {
    const { rating, comment } = req.body;
    const productId = req.params.id;
    const userId = req.user._id;
    //1. check id exist in database
    const product = await Product.findById(productId);
    if (product) {

    } else {
        res.status(400);
        throw new Error('Product not found');
    }
    //2 check user reviewed or not yet
    const isReview = product.reviews.find((review) => review.user.toString() === userId.toString());
    if (isReview) {
        res.status(400);
        throw new Error('You already reviewed for this product');
    }
    //3 luu thong tin nguoi review vao cot review trong bang product
    const reviewContent = {
        name: req.user.name,
        rating: Number(rating),
        comment: comment,
        user: userId
    }
    product.reviews.push(reviewContent);
    //4 tinh toan so luong nguoi dang review -> luu vao cot numReview trong bang product
    product.numReviews = product.reviews.length;
    //5 tinh toan so luong rating va chia trung binh
    rvArray = product.reviews;
    product.rating = rvArray.reduce(function(total, currentValue, index, { length }) {
        return total + currentValue.rating / length;
    }, 0);
    //6 thong bao ket qua review ve client
    await product.save();
    res.status(200).json({
        message: "Insert successful"
    })
});

const getProductById = expressAsyncHandler(async(req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        res.json(product);
    } else {
        res.status(400).json({
            message: "not found product"
        });
    };
});

const updateProductById = expressAsyncHandler(async(req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        product.name = req.body.name || product.name;
        product.image = req.body.image || product.image;
        product.brand = req.body.brand || product.brand;
        product.description = req.body.description || product.description;
        product.price = req.body.price || product.price;
        product.countInStock = req.body.countInStock || product.countInStock;
        const productUpdate = await product.save();
        res.json(productUpdate);
    } else {
        res.status(400).json({
            message: "not found product"
        });
    };
})


module.exports = {
    getProducts,
    createProduct,
    createReview,
    getProductById,
    updateProductById
}