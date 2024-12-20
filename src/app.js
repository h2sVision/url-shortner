const express = require('express');
const cors = require('cors');
const path = require('path');
const urlRoutes = require('./routes/urlRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Static Files (Frontend)
app.use(express.static(path.join(__dirname, '../client')));

// Routes
app.use('/', urlRoutes);
app.use('/', authRoutes);

module.exports = app;
