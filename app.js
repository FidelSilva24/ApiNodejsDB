const express = require('express');
const app = express();

app.use(express.json());

// Import routes
const userRoutes = require('./routes/userRoutes');

app.use('/', userRoutes);

module.exports = app;
