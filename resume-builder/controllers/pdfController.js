const prisma = require('../utils/prisma');
const pdfService = require('../services/pdfService');

const downloadResumePDF = async (req, res, next) => {
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
        error: 'Resume not found or unauthorized access.'
      });
    }

    const pdfBuffer = await pdfService.generateResumePDF(resume);

    const safeFilename = `${resume.fullName.replace(/[^a-zA-Z0-9]/g, '_')}_Resume.pdf`;

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${safeFilename}"`);
    res.setHeader('Content-Length', pdfBuffer.length);

    return res.send(pdfBuffer);
  } catch (error) {
    console.error('PDF Generation Controller Error:', error);
    next(error);
  }
};

module.exports = {
  downloadResumePDF
};
