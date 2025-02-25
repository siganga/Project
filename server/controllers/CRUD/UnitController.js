const Unit = require('../../models/CRUD/UnitModel.js');
const Lesson = require('../../models/CRUD/LessonModel.js');
const Question = require('../../models/CRUD/QuestionModel.js');
const Classroom = require('../../models/CRUD/ClassroomModel.js'); // Import Classroom model
const mongoose = require('mongoose');

// Get all units (optionally filtered by classroom)
const getUnits = async (req, res) => {
    try {
        let query = {};
        if (req.query.classroom) {
            query.classroom = req.query.classroom;
        }
        const units = await Unit.find(query);
        res.json(units);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create a new unit
const createUnit = async (req, res) => {
    const unit = new Unit({
        title: req.body.title,
        classroom: req.body.classroomId // Add classroom ID
    });
    try {
        const newUnit = await unit.save();
        const classroom = await Classroom.findById(req.body.classroomId);
        if(!classroom){
            return res.status(404).json({message:"Classroom not found"});
        }
        classroom.units.push(newUnit._id);
        await classroom.save();
        res.status(201).json(newUnit);
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
        const deletedUnit = await Unit.findByIdAndDelete(unitId);

        //Remove the unit from the classroom
        const classroom = await Classroom.findById(deletedUnit.classroom);
        classroom.units.pull(unitId);
        await classroom.save();

        res.json({ message: 'Unit and associated lessons and questions deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getSingleUnit = async (req, res) => {
    try {
        const unit = await Unit.findById(req.params.id);
        if (!unit) {
            return res.status(404).json({ message: 'Unit not found' });
        }
        res.json(unit);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { getUnits, createUnit, deleteUnit, getSingleUnit };