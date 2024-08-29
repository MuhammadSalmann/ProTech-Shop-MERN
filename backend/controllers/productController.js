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

// @desc Create a product
// @route POST /api/products
// @access Private/Admin
const createProduct = wrapAsync(async (req, res) => {
    const product = new Product({
        name: 'Sample name',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        brand: 'Sample brand',
        category: 'Sample category',
        countInStock: 0,
        numReviews: 0,
        description: 'Sample description'
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
});

// @desc Update a product
// @route PUT /api/products
// @access Private/Admin
const updateProduct = wrapAsync(async (req, res) => {
    const { name, price, description, image, brand, category, countInStock } = req.body;
    const product = await Product.findById(req.params.id);
    if(product) {
        product.name = name;
        product.price = price;
        product.description = description;
        product.image = image;
        product.brand = brand;
        product.category = category;
        product.countInStock = countInStock;

        const updatedProduct = await product.save();
        res.status(201).json(updatedProduct);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

// @desc Delete a product
// @route DELETE /api/products
// @access Private/Admin

const deleteProduct = wrapAsync(async (req, res) => {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.status(200).json({ message: 'Product removed' });
})

// @desc Create a review
// @route POST /api/products/:id/reviews
// @access Private/Admin

const createProductReview = wrapAsync(async (req, res) => {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);
    if(product) {
        const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString());
        if(alreadyReviewed) {
            res.status(400);
            throw new Error('Product already reviewed');
        }
        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id
        }
        product.reviews.push(review);
        product.numReviews = product.reviews.length;
        product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;
        await product.save();
        res.status(201).json({ message: 'Review added' });
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
})

export { getProducts, getProductById, createProduct, deleteProduct, updateProduct, createProductReview };