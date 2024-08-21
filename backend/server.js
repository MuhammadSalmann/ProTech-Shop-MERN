// const express = require('express');  // CommonJS module syntax
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const app = express();
const PORT = process.env.PORT || 5000;
import cookieParser from 'cookie-parser';

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
})

app.get('/', (req, res) => {
    res.send('API is running...');
})

// Product Route
import productRoutes from './routes/productRoutes.js';
app.use('/api/products', productRoutes);

// User Routes
import userRoutes from './routes/userRoutes.js';
app.use('/api/users', userRoutes);

// Error Middleware
import { errorHandler, notFound } from './middleware/errorMiddleware.js';
app.use(notFound);
app.use(errorHandler);





app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));