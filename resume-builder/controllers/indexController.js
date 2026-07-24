const renderHomePage = async (req, res, next) => {
  try {
    res.render('pages/index', {
      title: 'AI Resume Builder - Craft Professional Resumes Instantly'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  renderHomePage
};
