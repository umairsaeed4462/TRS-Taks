

const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: String,
    description: String,
    date: Date,
    location: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, enum: ['pending', 'approved'], default: 'pending' },
    attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
  });
  

module.exports = { eventSchema: mongoose.model('Event', eventSchema) };