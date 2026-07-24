const express = require('express');
const router = express.Router();
const resumeController = require('../controllers/resumeController');
const { protect } = require('../middleware/authMiddleware');

// Protect all resume routes
router.use(protect);

router.get('/dashboard', resumeController.renderDashboard);
router.get('/create', resumeController.renderCreatePage);
router.post('/create', resumeController.createResume);

router.get('/:id', resumeController.getResumeById);
router.get('/:id/edit', resumeController.renderEditPage);
router.post('/:id/update', resumeController.updateResume);
router.post('/:id/delete', resumeController.deleteResume);

module.exports = router;
