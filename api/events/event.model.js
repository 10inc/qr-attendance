const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: { type: String, unique: true, required: true },
    date: Date,
    attendees: [{ type: Schema.Types.ObjectId, ref: 'Student' }],
    created: { type: Date, default: Date.now },
    updated: Date
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false
});

module.exports = mongoose.model('Event', schema);