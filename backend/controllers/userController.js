import wrapAsync from '../middleware/wrapAsync.js';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

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
        generateToken(res, existingUser._id);
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
    const { name, email, password } = req.body;
    if(!name || !email || !password) {
        res.status(400).json({ message: 'All Fields should be Filled'})
        throw new Error('All Fields should be Filled');
    }

    const existingUser = await User.findOne({ email });
    if(existingUser) {
        res.status(400).json({ message: 'User already exists' });
        throw new Error('User already exists');
    }

    const newUser = await User.create(req.body);

    if(newUser) {
        generateToken(res, newUser._id);

        res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            isAdmin: newUser.isAdmin
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

// @desc    Logout user / cookie clear
// @route   POST /api/users/logout
// @access  Private
const logoutUser = wrapAsync(async (req, res) => {
    res.cookie('token', '', {
        httpOnly: true,
        expires: new Date(0),
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
    });

    res.status(200).json({ message: 'Logged out successfully' });
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = wrapAsync(async (req, res) => {
    const user = await User.findById(req.user._id);
    if(user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = wrapAsync(async (req, res) => {  // no need to pass the id in the URL, as we can get the id from the token
    const user = await User.findById(req.user._id);
    if(user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if(req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
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