

const  express = require('express');
const { createRecommendation,  getRecommendations, getRecResults, deleteAllRecommendations} = require('../../controllers/Recommendations/NISTRecController.js')





const router = express.Router();




router.get('/',getRecommendations);
router.post('/', createRecommendation);

router.post('/nist-recommendations',  getRecResults);
router.delete('/delete-all', deleteAllRecommendations);


module.exports = router
