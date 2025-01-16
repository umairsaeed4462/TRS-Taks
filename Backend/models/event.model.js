

const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: Date,
  location: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, enum: ['pending', 'approved'], default: 'pending' },
  attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

const joinEventSchema = new mongoose.Schema({
  eventID: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
  userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});


module.exports = { eventSchema: mongoose.model('Event', eventSchema), joinEventSchema: mongoose.model('Event_Joining', joinEventSchema) };