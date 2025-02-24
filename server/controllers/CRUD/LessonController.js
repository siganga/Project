const Unit = require('../../models/CRUD/UnitModel.js')
const Lesson = require('../../models/CRUD/LessonModel.js')
const Question = require('../../models/CRUD/QuestionModel.js')
const mongoose = require('mongoose')



// Get lessons for a unit

const getLessons  = async (req, res) => {
  try {
    const lessons = await Lesson.find({ unit: req.params.unitId }); // Assuming you have a 'unit' field in Lesson model
    res.json(lessons);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Create a new lesson

const createLesson  = async (req, res) => {
    const lesson = new Lesson({
      title: req.body.title,
      unit: req.body.unitId // Add the unit ID to the lesson
    });
    try {
      const newLesson = await lesson.save();
      const unit = await Unit.findById(req.body.unitId);
      if (!unit) {
      return res.status(404).json({ message: "Unit not found" }); // Handle if unit doesn't exist
    }

      unit.lessons.push(newLesson._id)
      await unit.save()
      res.status(201).json(newLesson); // 201 Created status
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };

// Delete a lesson
const deleteLesson  = async (req, res) => {
  try {
    await Lesson.findByIdAndDelete(req.params.id);
    // Delete associated questions 
     await Question.deleteMany({ lesson: req.params.id }); 
    res.json({ message: 'Lesson deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


module.exports = {getLessons,  createLesson, deleteLesson }