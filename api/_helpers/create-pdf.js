const PDFDocument = require('pdfkit');
const fs = require('fs');

module.exports = {
  eventParticipation
}

async function eventParticipation(event, student) {
  var doc = new PDFDocument({ bufferPages: true });

  doc
    .fontSize(25)
    .text('Certificate of Participation!', 100, 100);

  doc
    .fontSize(22)
    .text(`${student.name} attended ${event.name}`);

  doc
    .fontSize(18)
    .text(`${event.date}`);

  doc.end();

  return doc
}
