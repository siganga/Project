

const  express = require('express');
const { createRecommendation,  getRecommendations, getRecResults} = require('../../controllers/Recommendations/ISORecController.js')





const router = express.Router();




router.get('/',getRecommendations);
router.post('/', createRecommendation);

router.post('/iso-recommendations',  getRecResults);











module.exports = router
