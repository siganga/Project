

const  express = require('express');
const { getUnits,  createUnit, deleteUnit, getSingleUnit} = require('../../controllers/CRUD/UnitController.js')




const router = express.Router();




router.get('/',getUnits);
router.post('/', createUnit);

router.delete('/:id',  deleteUnit);

router.get('/:id', getSingleUnit);




module.exports = router
