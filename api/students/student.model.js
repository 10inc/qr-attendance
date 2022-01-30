const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    email: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    section: { type: String, required: true },
    course: { type: String, required: true },
    year: { type: String, required: true },
    created: { type: Date, default: Date.now },
    updated: Date
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false
});

module.exports = mongoose.model('Student', schema);