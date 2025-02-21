const Unit = require('../../models/CRUD/UnitModel.js')
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

const deleteUnit  = async (req, res) => {
  try {
    await Unit.findByIdAndDelete(req.params.id);
    // Delete associated lessons (optional, but good practice)
    await Lesson.deleteMany({ unit: req.params.id }); // If you have a 'unit' field in Lesson model
    res.json({ message: 'Unit deleted' });
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