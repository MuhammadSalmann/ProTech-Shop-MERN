import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import wrapAsync from './wrapAsync.js';

export const protect = wrapAsync(async (req, res, next) => {
    const { token } = req.cookies;
    console.log('protect middleware hit');
    if(token) {
        try {
            const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decodeToken.userId).select('-password');
            next();
        } catch (error) {
            res.status(401);
            throw new Error('Not Authorized, Token Failed');
        }
    } else {
        res.status(401);
        throw new Error('Not Authorized, No Token');
    }
})

export const isAdmin = (req, res, next) => {
    console.log('isAdmin middleware hit');
    if(req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401);
        throw new Error('Not Authorized as an Admin');
    }
}