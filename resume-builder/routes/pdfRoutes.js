const express = require('express');
const router = express.Router();
const pdfController = require('../controllers/pdfController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.get('/resume/:id', pdfController.downloadResumePDF);

module.exports = router;
