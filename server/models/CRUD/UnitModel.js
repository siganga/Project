// models/Unit.js
const mongoose = require('mongoose');

const unitSchema = new mongoose.Schema({
  title: { type: String, required: true },
  lessons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'LessonOne' }] // Reference to Lesson model
});

module.exports = mongoose.model('UnitOne', unitSchema);