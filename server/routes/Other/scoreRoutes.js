// backend/routes/scores.js
const express = require('express');
const router = express.Router();
const ScoreOne = require('../../models/Other/scoreModel.js');
const User = require('../../models/userModel.js'); // Assuming your user model is named UserThree
const Lesson = require('../../models/CRUD/LessonModel.js'); //Assuming your lesson model is named LessonOne.






// GET /api/scores/:lessonId
router.get('/:lessonId', async (req, res) => {
  try {
    const { lessonId } = req.params;

    const scores = await ScoreOne.find({ lessonId })
      .populate('userId', 'name') // Populate user names
      .populate('lessonId', 'title'); // Populate lesson titles

    res.json(scores);
  } catch (error) {
    console.error('Error fetching scores:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// POST /api/scores
router.post('/', async (req, res) => {
  try {
    const { userId, lessonId, score } = req.body;

    if (!userId || !lessonId || score === undefined) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newScore = new ScoreOne({
      userId,
      lessonId,
      score,
    });

    await newScore.save();
    res.status(201).json({ message: 'Score saved successfully' });
  } catch (error) {
    console.error('Error saving score:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
