const Question = require('../../models/CRUD/QuestionModel.js')
const Lesson = require('../../models/CRUD/LessonModel.js')
const mongoose = require('mongoose')

// Get questions for a lesson
const getQuestions  = async (req, res) => {
  try {
    const questions = await Question.find({ lesson: req.params.lessonId }); // Assuming you have a 'lesson' field in Question model
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new question
const createQuestion  = async (req, res) => {
  const question = new Question({ 
    text: req.body.text,
    answer: req.body.answer,
    lesson: req.body.lessonId // Add the lesson ID
  });
  try {
    const newQuestion = await question.save();

    // Update the Lesson document (Crucial!)
    const lesson = await Lesson.findById(req.body.lessonId);
    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }
    lesson.questions.push(newQuestion._id);
    await lesson.save();

    res.status(201).json(newQuestion);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};





const deleteQuestion  = async (req, res) => {
  try {
    await Question.findByIdAndDelete(req.params.id);
    res.json({ message: 'Question deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {getQuestions,  createQuestion, deleteQuestion }