const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    permissions: {create: Boolean, delete: Boolean, update: Boolean, join: Boolean},
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    eventsAttending: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }]
});

module.exports = { userSchema: mongoose.model('User', userSchema) };