const Unit = require('../../models/CRUD/UnitModel.js')
const Lesson = require('../../models/CRUD/LessonModel.js')
const Question = require('../../models/CRUD/QuestionModel.js')
const mongoose = require('mongoose')
const multer = require('multer');
const path = require('path');



//////////
// Configure multer for file storage (example: store in 'uploads' directory) ***
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../uploads/lessons')); // Ensure this directory exists
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});


const upload = multer({ storage: storage }).fields([
  { name: 'heroIdleImage', maxCount: 1 },
  { name: 'heroAttackImage', maxCount: 1 },
  { name: 'heroHurtImage', maxCount: 1 },
  { name: 'monsterIdleImage', maxCount: 1 },
  { name: 'monsterAttackImage', maxCount: 1 },
  { name: 'monsterHurtImage', maxCount: 1 },
  { name: 'backgroundImage', maxCount: 1 }
]);
//////////

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

const createLesson = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ message: 'Error uploading files', error: err });
    }

    const lessonData = {
      title: req.body.title,
      unit: req.body.unitId,
    };

    if (req.files['heroIdleImage']) lessonData.heroIdleImage = `/uploads/lessons/${req.files['heroIdleImage'][0].filename}`;
    if (req.files['heroAttackImage']) lessonData.heroAttackImage = `/uploads/lessons/${req.files['heroAttackImage'][0].filename}`;
    if (req.files['heroHurtImage']) lessonData.heroHurtImage = `/uploads/lessons/${req.files['heroHurtImage'][0].filename}`;
    if (req.files['monsterIdleImage']) lessonData.monsterIdleImage = `/uploads/lessons/${req.files['monsterIdleImage'][0].filename}`;
    if (req.files['monsterAttackImage']) lessonData.monsterAttackImage = `/uploads/lessons/${req.files['monsterAttackImage'][0].filename}`;
    if (req.files['monsterHurtImage']) lessonData.monsterHurtImage = `/uploads/lessons/${req.files['monsterHurtImage'][0].filename}`;
    if (req.files['backgroundImage']) lessonData.backgroundImage = `/uploads/lessons/${req.files['backgroundImage'][0].filename}`;

    const lesson = new Lesson(lessonData);

    try {
      const newLesson = await lesson.save();
      const unit = await Unit.findById(req.body.unitId);
      if (!unit) {
        return res.status(404).json({ message: "Unit not found" });
      }
      unit.lessons.push(newLesson._id);
      await unit.save();
      res.status(201).json(newLesson);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
};



// Get a specific lesson by ID (to include image paths)
const getLessonById = async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);
    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }
    res.json(lesson);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/////


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


// Controller to update the asset fields of a lesson
const updateLessonAssets = async (req, res) => {
  try {
    const lesson = await Lesson.findByIdAndUpdate(
      req.params.id,
      {
        heroIdleImage: req.body.heroIdleImage,
        heroAttackImage: req.body.heroAttackImage,
        heroHurtImage: req.body.heroHurtImage,
        monsterIdleImage: req.body.monsterIdleImage,
        monsterAttackImage: req.body.monsterAttackImage,
        monsterHurtImage: req.body.monsterHurtImage,
        backgroundImage: req.body.backgroundImage,
      },
      { new: true } // Return the updated document
    );

    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }

    res.json(lesson);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getLessons, createLesson, deleteLesson, getLessonById, updateLessonAssets };