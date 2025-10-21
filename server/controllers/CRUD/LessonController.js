const Unit = require('../../models/CRUD/UnitModel.js')
const Lesson = require('../../models/CRUD/LessonModel.js')
const Question = require('../../models/CRUD/QuestionModel.js')
const mongoose = require('mongoose')
const multer = require('multer');
const path = require('path');



//////////
// multer configuration for file storage 
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../uploads/lessons')); // the directory
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

const getLessons = async (req, res) => {
  try {
    const lessons = await Lesson.find({ unit: req.params.unitId }); 
    res.status(200).json(lessons);  // 
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// Create a new lesson

const createLesson = async (req, res) => {
  const { title, unitId } = req.body;

  if (!title || !unitId) {
    return res.status(400).json({ message: "Title and unitId are required" });
  }

  try {
    // Ensure the unit exists
    const unit = await Unit.findById(unitId);
    if (!unit) {
      return res.status(404).json({ message: "Unit not found" });
    }

    // Create the lesson
    const lesson = new Lesson({ title, unit: unitId });
    const newLesson = await lesson.save();

    // Add the lesson to the unit's lesson list
    unit.lessons.push(newLesson._id);
    await unit.save();

    res.status(201).json(newLesson);
  } catch (err) {
    console.error("Error creating lesson:", err);
    res.status(500).json({ message: "Failed to create lesson", error: err.message });
  }
};




// Gets a specific lesson by ID (to include image paths)
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


//  update the asset fields of a lesson
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