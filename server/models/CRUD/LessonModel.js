// models/Lesson.js
const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  unit: { type: mongoose.Schema.Types.ObjectId, ref: 'UnitOne', required: true },
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }] // Reference to Question model
});

module.exports = mongoose.model('LessonOne', lessonSchema);
