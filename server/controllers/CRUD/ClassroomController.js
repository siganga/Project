// controllers/ClassroomController.js
const Classroom = require('../../models/CRUD/ClassroomModel.js');

const getClassrooms = async (req, res) => {
    try {
        const classrooms = await Classroom.find();
        res.json(classrooms);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const createClassroom = async (req, res) => {
    const classroom = new Classroom({
        title: req.body.title
    });
    try {
        const newClassroom = await classroom.save();
        res.status(201).json(newClassroom);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const deleteClassroom = async (req, res) => {
    try {
        await Classroom.findByIdAndDelete(req.params.id);
        res.json({ message: 'Classroom deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getSingleClassroom = async (req, res) => {
    try {
        const classroom = await Classroom.findById(req.params.id);
        if (!classroom) {
            return res.status(404).json({ message: 'Classroom not found' });
        }
        res.json(classroom);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { getClassrooms, createClassroom, deleteClassroom, getSingleClassroom };