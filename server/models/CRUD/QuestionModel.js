// models/Question.js
const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  answer: { type: String, required: true },
  lesson: { type: mongoose.Schema.Types.ObjectId, ref: 'LessonOne', required: true },

});

module.exports = mongoose.model('QuestionOne', questionSchema);