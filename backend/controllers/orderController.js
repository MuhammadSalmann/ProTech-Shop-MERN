import wrapAsync from '../middleware/wrapAsync.js';
import Order from '../models/orderModel.js';

// @desc    Create nre Order
// @route   POST /api/orders
// @access  Private
const addOrderItems = wrapAsync(async (req, res) => {
    res.status(201).json({message: 'add order item'});
});

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = wrapAsync(async (req, res) => {
    res.status(200).json({message: 'get my orders'});
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private/Admin
const getOrderById = wrapAsync(async (req, res) => {
    res.status(200).json({message: 'get order by id'});
});

// @desc    Update order to paid
// @route   GET /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = wrapAsync(async (req, res) => {
    res.status(200).json({message: 'update order to paid'});
});

// @desc    Update order to delivered
// @route   GET /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = wrapAsync(async (req, res) => {
    res.status(200).json({message: 'update order to delivered'});
});

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = wrapAsync(async (req, res) => {
    res.status(200).json({message: 'get orders'});
});

export { addOrderItems, getMyOrders, getOrderById, updateOrderToPaid, updateOrderToDelivered, getOrders };