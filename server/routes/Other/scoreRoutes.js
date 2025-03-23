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


/// POST /api/scores
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

    // Update user's streak
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const today = new Date();
    const lastSaveDate = user.lastScoreSaveDate;

    if (lastSaveDate) {
      if (
        lastSaveDate.getDate() === today.getDate() &&
        lastSaveDate.getMonth() === today.getMonth() &&
        lastSaveDate.getFullYear() === today.getFullYear()
      ) {
        // User already saved a score today
      } else {
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);

        if (
          lastSaveDate.getDate() === yesterday.getDate() &&
          lastSaveDate.getMonth() === yesterday.getMonth() &&
          lastSaveDate.getFullYear() === yesterday.getFullYear()
        ) {
          user.streak += 1;
        } else {
          user.streak = 1;
        }
      }
    } else {
      user.streak = 1;
    }

    user.lastScoreSaveDate = today;
    await user.save();

    res.status(201).json({ message: 'Score saved successfully', streak: user.streak }); //send back the streak.
  } catch (error) {
    console.error('Error saving score:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});







module.exports = router;
