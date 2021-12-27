const PDFDocument = require('pdfkit');
const fs = require('fs');

module.exports = {
  eventParticipation
}

async function eventParticipation(event, student) {
  var doc = new PDFDocument({ bufferPages: true })

  doc.image('images/cert_top.png', 12, 0, { width: 600 })
  doc.moveDown(16);
  doc
    .font('Helvetica').fontSize(12)
    .text('THIS CERTIFICATE IS HEREBY AWARDED TO', { align: 'center' })
  doc.moveDown(1.5)
  doc.fillColor('#04a5db')
  doc
    .font('Helvetica-Bold').fontSize(26)
    .text(student.name.toUpperCase(), { align: 'center' })

  doc.fillColor('black')
  doc.moveDown(2.5)
  doc
    .font('Helvetica').fontSize(12)
    .text('Actively and successfully participated in', { align: 'center' })
  doc.moveDown(1.5)
  doc
    .font('Helvetica-Bold').fontSize(12)
    .text(event.name, { align: 'center' })

  doc.moveDown(1.5)
  doc
    .font('Helvetica').fontSize(12)
    .text('on the date of', { align: 'center' })
  doc.moveDown(1.5)
  doc
    .font('Helvetica-Bold').fontSize(12)
    .text(new Date(event.date).toLocaleDateString("fr-CA"), { align: 'center'})

  doc.image('images/cert_bottom.png', 0, doc.page.height - 209, { width: 600 })

  doc.end()

  return doc
}
