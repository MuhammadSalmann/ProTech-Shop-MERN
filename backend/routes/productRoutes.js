import express from 'express';
const router = express.Router();
import products from '../data/products.js';
import Product from '../models/productModel.js';
import wrapAsync from '../middleware/wrapAsync.js';

router.get('/', wrapAsync( async (req, res) => {
    const products = await Product.find({});
    res.status(200).json({products, message: 'Products fetched successfully'});
}))

router.get('/:id', wrapAsync( async (req, res) => {
    const product = await Product.findById(req.params.id);
    product ? res.json(product) : res.status(404).json({ message: 'Product not found' });
}))

export default router;