if (ans1 && ans1.toLowerCase() === 'no') {
        const matchingRec = allRecs.find(rec => rec.num ===  1);
        if (matchingRec) {
          recommendations.push(matchingRec);
        }
      }



{
  "question": 1,
  "answer": ""
}const COBITRec = require('../../models/Recommendations/COBITRecModel.js')
const mongoose = require('mongoose')


//Get all products

//Get a single product


//Create new product   quest







const createRecommendation = async (req, res) => {
  const { num, rec } = req.body;
  try {
    const cobitRec = await COBITRec.create({num, rec });
    res.status(200).json(cobitRec);
  } catch (error) {
    res.json({ error: error.message });
  }
};




//get all products
const getRecommendations  = async (req, res) => {
    try{
        const cobitRec = await COBITRec.find({})//.sort({createdAt:-1})  sort number
        res.status(200).json(cobitRec)
    }catch(error){
        res.json({error: error.message})
    }
};



//get all products
const getRecResults =async (req, res) => {
  try {
        const {ans1} = req.body;
        let recommendations = [];
        
        // Get all recommendations
        const allRecs = await COBITRec.find({});
       



// Filter recommendations based on answers
   
      if (ans1.answer && ans1.answer.toLowerCase() === 'no') {
        const matchingRec = allRecs.find(rec => rec.num ===  1);
        if (matchingRec) {
          recommendations.push(matchingRec);
        }
      }

        
        res.status(200).json(recommendations);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};










/*




  const getProductReviews = async (req, res) => {
    const productId = req.params.productId;
    try {
      const product = await Product.findById(productId);
      if (!product) {
        res.status(404).json({ error: 'Product not found' });
        return;
      }
      res.json({ reviews: product.reviews });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

*/

module.exports = {createRecommendation,  getRecommendations, getRecResults }

