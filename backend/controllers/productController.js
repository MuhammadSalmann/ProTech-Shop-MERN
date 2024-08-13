import wrapAsync from '../middleware/wrapAsync.js';
import Product from '../models/productModel.js';

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = wrapAsync(async (req, res) => {
    const products = await Product.find({});
    res.status(200).json({products, message: 'Products fetched successfully'});
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = wrapAsync(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if(product) {
        return res.status(200).json({product, message: 'Product fetched successfully'});
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

export { getProducts, getProductById };