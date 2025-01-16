const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  role: String,
  permission: {
    dashboard: {view: Boolean, totalUser: Boolean, totalPendingEvent: Boolean, totalActiveEvent: Boolean, totalEventJoins: Boolean},
    user: {view: Boolean, create: Boolean, edit: Boolean, delete: Boolean},
    event: {view: Boolean, create: Boolean, edit: Boolean, delete: Boolean, approved: Boolean, join: Boolean},
    role: {view: Boolean, create: Boolean, edit: Boolean, delete: Boolean}
  }
});

module.exports = { roleSchema: mongoose.model('Roles-Permissions', roleSchema) };