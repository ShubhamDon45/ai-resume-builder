const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.post('/generate-summary', aiController.generateSummary);
router.post('/improve-experience', aiController.improveExperience);
router.post('/generate-skills', aiController.generateSkills);

module.exports = router;
