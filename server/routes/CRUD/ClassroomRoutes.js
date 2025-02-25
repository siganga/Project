

const  express = require('express');
const {  getClassrooms, createClassroom, deleteClassroom, getSingleClassroom} = require('../../controllers/CRUD/ClassroomController.js')


  																						

const router = express.Router();




router.get('/', getClassrooms);
router.post('/', createClassroom);

router.delete('/:id',  deleteClassroom);

router.get('/:id', getSingleClassroom);




module.exports = router
