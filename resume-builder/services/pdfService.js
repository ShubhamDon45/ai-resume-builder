const PDFDocument = require('pdfkit');

const generateResumePDF = (resumeData) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({
        size: 'A4',
        margin: 40
      });

      const buffers = [];
      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => {
        const pdfBuffer = Buffer.concat(buffers);
        resolve(pdfBuffer);
      });

      const primaryColor = '#1e293b';
      const secondaryColor = '#475569';
      const accentColor = '#4f46e5';

      // Header: Full Name
      doc.fillColor(primaryColor)
         .font('Helvetica-Bold')
         .fontSize(24)
         .text(resumeData.fullName.toUpperCase(), { align: 'center' });

      doc.moveDown(0.3);

      // Contact Line
      let contactText = resumeData.email;
      if (resumeData.phone) {
        contactText += `  •  ${resumeData.phone}`;
      }

      doc.fillColor(secondaryColor)
         .font('Helvetica')
         .fontSize(10)
         .text(contactText, { align: 'center' });

      doc.moveDown(0.8);

      // Divider Line
      doc.strokeColor('#cbd5e1')
         .lineWidth(1)
         .moveTo(40, doc.y)
         .lineTo(555, doc.y)
         .stroke();

      doc.moveDown(1);

      // Helper: Add Section Header
      const addSectionHeader = (title) => {
        doc.moveDown(0.5);
        doc.fillColor(accentColor)
           .font('Helvetica-Bold')
           .fontSize(13)
           .text(title.toUpperCase());

        doc.moveDown(0.2);
        doc.strokeColor('#e2e8f0')
           .lineWidth(0.8)
           .moveTo(40, doc.y)
           .lineTo(555, doc.y)
           .stroke();

        doc.moveDown(0.5);
      };

      // Summary Section
      if (resumeData.summary) {
        addSectionHeader('Professional Summary');
        doc.fillColor(primaryColor)
           .font('Helvetica')
           .fontSize(10)
           .text(resumeData.summary, { align: 'justify', lineGap: 3 });
      }

      // Skills Section
      if (resumeData.skills) {
        addSectionHeader('Key Skills');
        doc.fillColor(primaryColor)
           .font('Helvetica')
           .fontSize(10)
           .text(resumeData.skills, { lineGap: 3 });
      }

      // Work Experience Section
      if (resumeData.experience) {
        addSectionHeader('Work Experience');
        doc.fillColor(primaryColor)
           .font('Helvetica')
           .fontSize(10)
           .text(resumeData.experience, { lineGap: 3 });
      }

      // Education Section
      if (resumeData.education) {
        addSectionHeader('Education');
        doc.fillColor(primaryColor)
           .font('Helvetica')
           .fontSize(10)
           .text(resumeData.education, { lineGap: 3 });
      }

      // Projects Section
      if (resumeData.projects) {
        addSectionHeader('Projects');
        doc.fillColor(primaryColor)
           .font('Helvetica')
           .fontSize(10)
           .text(resumeData.projects, { lineGap: 3 });
      }

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  generateResumePDF
};
