import wrapAsync from '../middleware/wrapAsync.js';
import User from '../models/userModel.js';

// @desc    Auth user and get token
// @route   POST /api/users/login
// @access  Public
const authUser = wrapAsync(async (req, res) => {
    res.send('auth user');
});

// @desc    Register user
// @route   POST /api/users
// @access  Public
const registerUser = wrapAsync(async (req, res) => {
    res.send('register user');
});

// @desc    Logout user / cookie clear
// @route   POST /api/users/logout
// @access  Private
const logoutUser = wrapAsync(async (req, res) => {
    res.send('Logout user');
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = wrapAsync(async (req, res) => {
    res.send('get user profile');
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = wrapAsync(async (req, res) => {  // no need to pass the id in the URL, as we can get the id from the token
    res.send('update user profile');
});

// @desc    Get users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = wrapAsync(async (req, res) => {
    res.send('get users');
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = wrapAsync(async (req, res) => {
    res.send('delete user');
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = wrapAsync(async (req, res) => {
    res.send('get user by id');
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = wrapAsync(async (req, res) => {
    res.send('update user');
});

export { authUser, registerUser, logoutUser, getUserProfile, updateUserProfile, getUsers, deleteUser, getUserById, updateUser };