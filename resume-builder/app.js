const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const indexRoutes = require('./routes/indexRoutes');
const authRoutes = require('./routes/authRoutes');
const resumeRoutes = require('./routes/resumeRoutes');
const aiRoutes = require('./routes/aiRoutes');
const pdfRoutes = require('./routes/pdfRoutes');
const { optionalAuth } = require('./middleware/authMiddleware');

const app = express();

// View Engine Setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static Folder Setup
app.use(express.static(path.join(__dirname, 'public')));

// Middleware Parsing Setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Global Optional Auth Middleware to make user state available to EJS views
app.use(optionalAuth);

// Routes Configuration
app.use('/', indexRoutes);
app.use('/auth', authRoutes);
app.use('/resume', resumeRoutes);
app.use('/ai', aiRoutes);
app.use('/pdf', pdfRoutes);

// Dashboard direct route redirect
app.get('/dashboard', (req, res) => {
  res.redirect('/resume/dashboard');
});

// 404 Handler
app.use((req, res, next) => {
  res.status(404).render('pages/index', {
    title: '404 - Page Not Found'
  });
});

// Centralized Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

module.exports = app;
