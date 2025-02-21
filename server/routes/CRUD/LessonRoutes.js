

const  express = require('express');
const { getLessons,  createLesson, deleteLesson} = require('../../controllers/CRUD/LessonController.js')




const router = express.Router();




router.get('/unit/:unitId',getLessons);
router.post('/', createLesson);

router.delete('/:id',  deleteLesson);






module.exports = router
