const db = require('_helpers/db');

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
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

// TODO: Generate QR
//  -- existing helper to send email (build email wih QR and send)