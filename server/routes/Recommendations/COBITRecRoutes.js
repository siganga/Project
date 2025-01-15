

const  express = require('express');
const { createRecommendation,  getRecommendations, getRecResults} = require('../../controllers/Recommendations/COBITRecController.js')



//const requireAuth = require('../middleware/requireAuth')

const router = express.Router();



//router.use(requireAuth)
/*
*/

router.get('/',getRecommendations);
router.post('/', createRecommendation);

router.post('/cobit-recommendations',  getRecResults);

//router.get('/:id',getProduct);







//router.delete('/:id',deleteProduct);

//router.patch('/:id',updateProduct);

//router.post('/search', searchProduct);

//router.post('/:productId/reviews', submitProductReview);

//router.get('/:productId/reviews', getProductReviews); 

module.exports = router
