import wrapAsync from '../middleware/wrapAsync.js';
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';

// @desc    Auth user and get token
// @route   POST /api/users/login
// @access  Public
const authUser = wrapAsync(async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password) {
        res.status(400).json({ message: 'All Fields should be Filled'})
        throw new Error('All Fields should be Filled');
    }
    
    const existingUser = await User.findOne({ email });
    if(existingUser && (await existingUser.matchPassword(password))) {
        
        const token = jwt.sign({ userId: existingUser._id }, process.env.JWT_SECRET, {expiresIn: '2d'});
        // Set the JWT token as the httpOnly cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 2 * 24 * 60 * 60 * 1000 // 2 days
        })

        res.json({
            _id: existingUser._id,
            name: existingUser.name,
            email: existingUser.email,
            isAdmin: existingUser.isAdmin
        })
    }
    else {
        res.status(401).json({ message: 'Invalid email or password' });
        throw new Error('Invalid email or password');
    }
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