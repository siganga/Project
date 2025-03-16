

const  express = require('express');
const { getClassrooms, createClassroom, deleteClassroom, getSingleClassroom, shareClassroom, getSharedUsers, getOwner } = require('../../controllers/CRUD/ClassroomController.js')


  																						

const router = express.Router();




router.get('/', getClassrooms);
router.post('/', createClassroom);

router.delete('/:id',  deleteClassroom);

router.get('/:id', getSingleClassroom);

router.post('/:id/share', shareClassroom);

router.get('/:id/sharedUsers', getSharedUsers);
router.get('/:id/owner', getOwner);


module.exports = router
