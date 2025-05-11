// models/Lesson.js
const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  unit: { type: mongoose.Schema.Types.ObjectId, ref: 'UnitOne', required: true },
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }], // Reference to Question model
  heroIdleImage: { type: String },       // Path or URL to hero idle image
  heroAttackImage: { type: String },     // Path or URL to hero attack image
  heroHurtImage: { type: String },       // Path or URL to hero hurt image
  monsterIdleImage: { type: String },    // Path or URL to monster idle image
  monsterAttackImage: { type: String },  // Path or URL to monster attack image
  monsterHurtImage: { type: String },    // Path or URL to monster hurt image
  backgroundImage: { type: String }      // Path or URL to background image (optional, could be global)
});

module.exports = mongoose.model('LessonOne', lessonSchema);