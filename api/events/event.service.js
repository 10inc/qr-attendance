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