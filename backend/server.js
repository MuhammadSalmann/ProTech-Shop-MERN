// const express = require('express');  // CommonJS module syntax
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const app = express();
const PORT = process.env.PORT || 5000;
import products from './data/products.js';

// Connect to MongoDB
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

app.get('/api/products', (req, res) => {
    res.json(products);
})

app.get('/api/products/:id', (req, res) => {
    const product = products.find(p => p._id === req.params.id);
    res.json(product);
})

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));