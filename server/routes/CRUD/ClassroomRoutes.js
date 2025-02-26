

const  express = require('express');
const { getClassrooms, createClassroom, deleteClassroom, getSingleClassroom, shareClassroom } = require('../../controllers/CRUD/ClassroomController.js')


  																						

const router = express.Router();




router.get('/', getClassrooms);
router.post('/', createClassroom);

router.delete('/:id',  deleteClassroom);

router.get('/:id', getSingleClassroom);

router.post('/:id/share', shareClassroom);


module.exports = router
