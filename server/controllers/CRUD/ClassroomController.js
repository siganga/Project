const Classroom = require('../../models/CRUD/ClassroomModel.js');
const UserThree= require('../../models/userModel.js'); // Import your User model
const mongoose = require('mongoose');

const getClassrooms = async (req, res) => {
    try {

const userId = req.query.userId; // Get userId from query parameters

        if (!userId) {
            return res.status(400).json({ message: 'UserId is required' });
        }
        const classrooms = await Classroom.find({
            $or: [
                { owner: userId },
                { sharedWith: userId }
            ]
        });
        res.json(classrooms);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const createClassroom = async (req, res) => {

    const userId = req.query.userId; 

    const classroom = new Classroom({
        title: req.body.title,
        owner: userId // Set the owner to the current user's ID
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
        const classroom = await Classroom.findById(req.params.id);
        if (!classroom) {
            return res.status(404).json({ message: 'Classroom not found' });
        }
        if (classroom.owner.toString() !== req.query.userId) {
            return res.status(403).json({ message: 'Forbidden' }); // Only the owner can delete
        }
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
        if (classroom.owner.toString() !== req.user.id && !classroom.sharedWith.includes(req.user.id)) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        res.json(classroom);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const shareClassroom = async (req, res) => {
    try {
        const classroom = await Classroom.findById(req.params.id);
        if (!classroom) {
            return res.status(404).json({ message: 'Classroom not found' });
        }

         const userId = req.query.userId;

        if (classroom.owner.toString() !== userId) {
            return res.status(403).json({ message: 'Forbidden' }); // Only the owner can share
        }
        const userToShare = await UserThree.findOne({ email: req.body.email });
        if (!userToShare) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (classroom.sharedWith.includes(userToShare._id)) {
            return res.status(400).json({message: 'User already has access to this classroom'})
        }

        classroom.sharedWith.push(userToShare._id);
        await classroom.save();
        res.json({ message: 'Classroom shared successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};



const getSharedUsers = async (req, res) => {
    try {
        const classroomId = req.params.id;
        const userId = req.query.userId;

        const classroom = await Classroom.findById(classroomId).populate('sharedWith', 'email _id'); // Populate sharedWith

        if (!classroom) {
            return res.status(404).json({ message: 'Classroom not found' });
        }

        if (classroom.owner.toString() !== userId) {
            return res.status(403).json({ message: 'Forbidden' });
        }

        res.json(classroom.sharedWith);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};




const getOwner = async (req, res) => {
    try {
        const classroomId = req.params.id;
        const userId = req.query.userId;

        const classroom = await Classroom.findById(classroomId).populate('owner', 'email _id');  // Populate sharedWith

        if (!classroom) {
            return res.status(404).json({ message: 'Classroom not found' });
        }


        res.json(classroom.owner);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { getClassrooms, createClassroom, deleteClassroom, getSingleClassroom, shareClassroom, getSharedUsers, getOwner };