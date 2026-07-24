const aiService = require('../services/aiService');

const generateSummary = async (req, res) => {
  try {
    const { jobTitle, skills, experience, education } = req.body;

    if (!jobTitle && !skills && !experience) {
      return res.status(400).json({
        success: false,
        message: 'Please provide at least a job title, skills, or experience background for AI generation.'
      });
    }

    const summary = await aiService.generateSummary({ jobTitle, skills, experience, education });

    return res.status(200).json({
      success: true,
      result: summary
    });
  } catch (error) {
    console.error('AI Generate Summary Error:', error.message);
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to generate AI summary. Please check your API configuration.'
    });
  }
};

const improveExperience = async (req, res) => {
  try {
    const { experience } = req.body;

    if (!experience || !experience.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Please enter work experience details before requesting AI improvement.'
      });
    }

    const improved = await aiService.improveExperience({ experience });

    return res.status(200).json({
      success: true,
      result: improved
    });
  } catch (error) {
    console.error('AI Improve Experience Error:', error.message);
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to improve experience with AI.'
    });
  }
};

const generateSkills = async (req, res) => {
  try {
    const { jobRole } = req.body;

    if (!jobRole || !jobRole.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a resume title or target job role to generate skills.'
      });
    }

    const skills = await aiService.generateSkillsSuggestion({ jobRole });

    return res.status(200).json({
      success: true,
      result: skills
    });
  } catch (error) {
    console.error('AI Generate Skills Error:', error.message);
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to suggest skills with AI.'
    });
  }
};

module.exports = {
  generateSummary,
  improveExperience,
  generateSkills
};
