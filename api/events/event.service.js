const db = require('_helpers/db');
const studentService = require('students/student.service');
const sendEmail = require('_helpers/send-email');
const createPdf = require('_helpers/create-pdf');

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete,
    attend
};

// CRUD
async function getAll() {
    const events = await db.Event.find();
    return events;
}

async function getById(id) {
    const event = await db.Event.findById(id);
    return event;
}

async function create(params) {
    const event = new db.Event(params);
    await event.save();

    return event;
}

async function update(id, params) {
    const event = await db.Event.findById(id);
    Object.assign(event, params);
    event.updated = Date.now();
    await event.save();

    return event;
}

async function _delete(id) {
    const event = await db.Event.findById(id);
    await event.remove();
}

// Other
async function attend(id, student_id) {
    const event = await db.Event.findById(id);

    // if (event.attendees.includes(student_id)) {
    //     throw 'Student is already an attendee';
    // }

    event.attendees.push(student_id)
    await event.save();

    student = await studentService.getById(student_id)
    eventPdf = await createPdf.eventParticipation(event, student)
    message = `<p>Attached is Student ${student.name}'s Certificate of Participation for Event ${event.name}:</p>`;
    await sendEmail({
        to: student.email,
        subject: `Student ${student.name} Certificate of Participation`,
        html: message,
        attachments: [
            {
                filename: `certificate-for-${event.id}.pdf`,
                content: eventPdf,
                contentType: 'application/pdf'
            }
        ]
    });

    return event;
}
