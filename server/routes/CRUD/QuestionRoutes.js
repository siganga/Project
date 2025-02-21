

const  express = require('express');
const { getQuestions,  createQuestion, deleteQuestion} = require('../../controllers/CRUD/QuestionController.js')




const router = express.Router();




router.get('/lesson/:lessonId', getQuestions);
router.post('/', createQuestion);

router.delete('/:id',  deleteQuestion);






module.exports = router
