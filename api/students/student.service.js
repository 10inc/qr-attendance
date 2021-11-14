const db = require('_helpers/db');
const sendEmail = require('_helpers/send-email');
var QRCode = require('qrcode')

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete,
    email_qr
};

// CRUD
async function getAll() {
    const students = await db.Student.find();
    return students;
}

async function getById(id) {
    const student = await db.Student.findById(id);
    return student;
}

async function create(params) {
    const student = new db.Student(params);
    await student.save();

    return student;
}

async function update(id, params) {
    const student = await db.Student.findById(id);
    Object.assign(student, params);
    student.updated = Date.now();
    await student.save();

    return student;
}

async function _delete(id) {
    const student = await db.Student.findById(id);
    await student.remove();
}

// Other

async function email_qr(id) {
    student = await getById(id)
    message = `<p>Attached is Student ${student.name}'s QR Code:</p>`;
    img = await QRCode.toDataURL(id);

    await sendEmail({
        to: student.email,
        subject: `Student ${student.name} QR Code`,
        html: `
            ${message}
            <p>
                <img src="${img}">
            </p>
        `,
        attachments: [
            {
                filename: `qr-${student.id}.jpg`,
                content: img.split("base64,")[1],
                encoding: 'base64'
            }
        ]
    });
}
// TODO: Generate QR
//  -- existing helper to send email (build email wih QR and send)