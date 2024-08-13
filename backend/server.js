// const express = require('express');  // CommonJS module syntax
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to DB
import connectDB from './config/db.js';
connectDB();

// Middlewares
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


// Error Middleware
import { errorHandler, notFound } from './middleware/errorMiddleware.js';
app.use(notFound);
app.use(errorHandler);





app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));