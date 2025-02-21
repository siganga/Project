

const  express = require('express');
const { createRecommendation,  getRecommendations, getRecResults} = require('../../controllers/Recommendations/COBITRecController.js')




const router = express.Router();




router.get('/',getRecommendations);
router.post('/', createRecommendation);

router.post('/cobit-recommendations',  getRecResults);






module.exports = router
