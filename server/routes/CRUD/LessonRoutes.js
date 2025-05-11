

const  express = require('express');
const { getLessons,  createLesson, deleteLesson, getLessonById} = require('../../controllers/CRUD/LessonController.js')




const router = express.Router();




router.get('/unit/:unitId',getLessons);
router.post('/', createLesson);
router.delete('/:id',  deleteLesson);
router.get('/:id', getLessonById);//Get single lesson





module.exports = router
