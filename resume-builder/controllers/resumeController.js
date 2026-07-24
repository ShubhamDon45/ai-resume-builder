const prisma = require('../utils/prisma');

const renderDashboard = async (req, res, next) => {
  try {
    const userId = req.user.userId;

    const resumes = await prisma.resume.findMany({
      where: { userId },
      orderBy: { updatedAt: 'desc' }
    });

    res.render('pages/dashboard', {
      title: 'Dashboard - AI Resume Builder',
      resumes,
      user: req.user
    });
  } catch (error) {
    next(error);
  }
};

const renderCreatePage = (req, res) => {
  res.render('pages/createResume', {
    title: 'Create New Resume - AI Resume Builder',
    error: null,
    formData: {}
  });
};

const createResume = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const { title, fullName, email, phone, summary, skills, education, experience, projects } = req.body;

    if (!title || !fullName || !email) {
      return res.status(400).render('pages/createResume', {
        title: 'Create New Resume - AI Resume Builder',
        error: 'Title, Full Name, and Email are required fields.',
        formData: req.body
      });
    }

    await prisma.resume.create({
      data: {
        title: title.trim(),
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone ? phone.trim() : null,
        summary: summary ? summary.trim() : null,
        skills: skills ? skills.trim() : null,
        education: education ? education.trim() : null,
        experience: experience ? experience.trim() : null,
        projects: projects ? projects.trim() : null,
        userId
      }
    });

    return res.redirect('/resume/dashboard');
  } catch (error) {
    next(error);
  }
};

const getResumeById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const resume = await prisma.resume.findUnique({
      where: { id }
    });

    if (!resume || resume.userId !== userId) {
      return res.status(404).render('pages/dashboard', {
        title: 'Dashboard - AI Resume Builder',
        resumes: await prisma.resume.findMany({ where: { userId } }),
        error: 'Resume not found or access denied.'
      });
    }

    res.render('pages/resumeView', {
      title: `${resume.title} - AI Resume Builder`,
      resume
    });
  } catch (error) {
    next(error);
  }
};

const renderEditPage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const resume = await prisma.resume.findUnique({
      where: { id }
    });

    if (!resume || resume.userId !== userId) {
      return res.status(404).redirect('/resume/dashboard');
    }

    res.render('pages/editResume', {
      title: `Edit ${resume.title} - AI Resume Builder`,
      error: null,
      resume
    });
  } catch (error) {
    next(error);
  }
};

const updateResume = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;
    const { title, fullName, email, phone, summary, skills, education, experience, projects } = req.body;

    const existingResume = await prisma.resume.findUnique({
      where: { id }
    });

    if (!existingResume || existingResume.userId !== userId) {
      return res.status(403).redirect('/resume/dashboard');
    }

    if (!title || !fullName || !email) {
      return res.status(400).render('pages/editResume', {
        title: `Edit ${title} - AI Resume Builder`,
        error: 'Title, Full Name, and Email are required fields.',
        resume: { id, ...req.body }
      });
    }

    await prisma.resume.update({
      where: { id },
      data: {
        title: title.trim(),
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone ? phone.trim() : null,
        summary: summary ? summary.trim() : null,
        skills: skills ? skills.trim() : null,
        education: education ? education.trim() : null,
        experience: experience ? experience.trim() : null,
        projects: projects ? projects.trim() : null
      }
    });

    return res.redirect(`/resume/${id}`);
  } catch (error) {
    next(error);
  }
};

const deleteResume = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const existingResume = await prisma.resume.findUnique({
      where: { id }
    });

    if (!existingResume || existingResume.userId !== userId) {
      return res.status(403).redirect('/resume/dashboard');
    }

    await prisma.resume.delete({
      where: { id }
    });

    return res.redirect('/resume/dashboard');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  renderDashboard,
  renderCreatePage,
  createResume,
  getResumeById,
  renderEditPage,
  updateResume,
  deleteResume
};
