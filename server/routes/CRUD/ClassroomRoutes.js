

const  express = require('express');
const { getClassrooms, createClassroom, deleteClassroom, getSingleClassroom, shareClassroom, getSharedUsers } = require('../../controllers/CRUD/ClassroomController.js')


  																						

const router = express.Router();




router.get('/', getClassrooms);
router.post('/', createClassroom);

router.delete('/:id',  deleteClassroom);

router.get('/:id', getSingleClassroom);

router.post('/:id/share', shareClassroom);

router.get('/:id/sharedUsers', getSharedUsers);


module.exports = router
