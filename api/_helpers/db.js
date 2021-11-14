const config = require('config.json');
const mongoose = require('mongoose');
const connectionOptions = { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false };
mongoose.connect(process.env.MONGODB_URI || config.connectionString, connectionOptions);
mongoose.Promise = global.Promise;

module.exports = {
    // Accounts
    Account: require('accounts/account.model'),
    RefreshToken: require('accounts/refresh-token.model'),
    isValidId,
    // Other
    Student: require('students/student.model'),
    Event: require('events/event.model')
};

function isValidId(id) {
    return mongoose.Types.ObjectId.isValid(id);
}