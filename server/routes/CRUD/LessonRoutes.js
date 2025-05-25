

const  express = require('express');
const { getLessons,  createLesson, deleteLesson, getLessonById, updateLessonAssets} = require('../../controllers/CRUD/LessonController.js')




const router = express.Router();




router.get('/unit/:unitId',getLessons);
router.post('/', createLesson);
router.delete('/:id',  deleteLesson);
router.get('/:id', getLessonById);//Get single lesson
router.put('/:id/assets', updateLessonAssets); // Route to update lesson assets





module.exports = router
