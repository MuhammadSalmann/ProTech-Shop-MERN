// const express = require('express');  // CommonJS module syntax
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const app = express();
const PORT = process.env.PORT || 5000;
import path from 'path';
import cookieParser from 'cookie-parser';
import cors from 'cors';
app.use(cors());

// Connect to DB
import connectDB from './config/db.js';
connectDB();

// Middlewares for JSON and URL encoding
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie Parser Middleware
app.use(cookieParser());

// Logger Middleware
app.use((req, res, next) => {
    console.log(req.method, req.hostname, req.path);
    next();
});

// Product Route
import productRoutes from './routes/productRoutes.js';
app.use('/api/products', productRoutes);

// User Routes
import userRoutes from './routes/userRoutes.js';
app.use('/api/users', userRoutes);

// Order Routes
import orderRoutes from './routes/orderRoutes.js';
app.use('/api/orders', orderRoutes);

// Upload Routes
import uploadRoutes from './routes/uploadRoutes.js';
app.use('/api/upload', uploadRoutes);

const __dirname = path.resolve(); // Set __dirname to the current directory
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// Paypal Config Route
app.get('/api/config/paypal', (req, res) => res.send({ clientId: process.env.PAYPAL_CLIENT_ID}));

if(process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static(path.join(__dirname, '/frontend/dist')));
    // any route that is not the api route, will be redirected to the index.html file
    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html')));
} else {
    app.get('/', (req, res) => {
        res.send('API is running...');
    })
}

// Error Middleware
import { errorHandler, notFound } from './middleware/errorMiddleware.js';
app.use(notFound);
app.use(errorHandler);



app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));