const Unit = require('../../models/CRUD/UnitModel.js')
const Question = require('../../models/CRUD/QuestionModel.js')
const Lesson = require('../../models/CRUD/LessonModel.js')
const mongoose = require('mongoose')

//To populate lessons => const unit = await Unit.findById(unitId).populate('lessons');
// Get all units
const getUnits  = async (req, res) => {
  try {
    const units = await Unit.find();
    res.json(units);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};




// Create a new unit
const createUnit  = async (req, res) => {
  const unit = new Unit({
    title: req.body.title
  });
  try {
    const newUnit = await unit.save();
    res.status(201).json(newUnit); // 201 Created status
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a unit

const deleteUnit = async (req, res) => {
    try {
        const unitId = req.params.id;

        // Find all lessons associated with the unit
        const lessonsToDelete = await Lesson.find({ unit: unitId });

        // Extract lesson IDs
        const lessonIdsToDelete = lessonsToDelete.map(lesson => lesson._id);

        // Delete questions associated with the lessons
        await Question.deleteMany({ lesson: { $in: lessonIdsToDelete } });

        // Delete the lessons
        await Lesson.deleteMany({ unit: unitId });

        // Delete the unit
        await Unit.findByIdAndDelete(unitId);

        res.json({ message: 'Unit and associated lessons and questions deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};




const getSingleUnit = async (req, res) => {
  try {
    const unit = await Unit.findById(req.params.id);//.populate('lessons'); // Populate lessons if needed
    if (!unit) {
      return res.status(404).json({ message: 'Unit not found' }); // Handle the case where the unit doesn't exist
    }
    res.json(unit);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {getUnits,  createUnit, deleteUnit, getSingleUnit }