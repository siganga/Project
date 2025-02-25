// models/Classroom.js
const mongoose = require('mongoose');

const classroomSchema = new mongoose.Schema({
    title: { type: String, required: true },
    units: [{ type: mongoose.Schema.Types.ObjectId, ref: 'UnitOne' }] // Reference to Unit model
});

module.exports = mongoose.model('ClassroomOne', classroomSchema);