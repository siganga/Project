// backend/models/scoreModel.js
const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserThree', required: true },
  lessonId: { type: mongoose.Schema.Types.ObjectId, ref: 'LessonOne', required: true },
  score: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ScoreOne', scoreSchema);
