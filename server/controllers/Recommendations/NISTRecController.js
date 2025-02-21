const NISTRec = require('../../models/Recommendations/NISTRecModel.js')
const mongoose = require('mongoose')






const deleteAllRecommendations = async (req, res) => {
  try {
    await NISTRec.deleteMany({}); // Delete all documents in the ISORec collection
    res.status(200).json({ message: 'All recommendations deleted successfully' });
  } catch (error) {
    console.error('Error deleting recommendations:', error);
    res.status(500).json({ error: error.message });
  }
};



const createRecommendation = async (req, res) => {
  const { num, rec, scen, imp, lik } = req.body;
  try {
    const nistRec = await NISTRec.create({num, rec, scen, imp, lik });
    res.status(200).json(nistRec);
  } catch (error) {
    res.json({ error: error.message });
  }
};




//get all recommendations
const getRecommendations  = async (req, res) => {
    try{
        const nistRec = await NISTRec.find({}) 
        res.status(200).json(nistRec)
    }catch(error){
        res.json({error: error.message})
    }
};



//get recommendations based on answers given
const getRecResults =async (req, res) => {
  try {
        const {quest, quest2, quest3, quest4, quest5, quest6, quest7, quest8, quest9, quest10} = req.body;
        let recommendations = [];
        
        // Get all recommendations
        const allRecs = await NISTRec.find({});
       



// Filter recommendations based on answers
   
       if (quest.ans1 && quest.ans1.toLowerCase() === 'no') {
        const matchingRec = allRecs.find(rec => rec.num ===  1);
        if (matchingRec) {
          recommendations.push(matchingRec);
        }
      }


      if (quest2.ans2 && quest2.ans2.toLowerCase() === 'no') {
        const matchingRec = allRecs.find(rec => rec.num ===  2);
        if (matchingRec) {
          recommendations.push(matchingRec);
        }
      }

      
     if (quest3.ans3 && quest3.ans3.toLowerCase() === 'no') {
         const matchingRec = allRecs.find(rec => rec.num === 3);
         if (matchingRec) {
             recommendations.push(matchingRec);
         }
     }
     


     if (quest4.ans4 && quest4.ans4.toLowerCase() === 'no') {
         const matchingRec = allRecs.find(rec => rec.num === 4);
         if (matchingRec) {
             recommendations.push(matchingRec);
         }
     }


     if (quest5.ans5 && quest5.ans5.toLowerCase() === 'no') {
         const matchingRec = allRecs.find(rec => rec.num === 5);
         if (matchingRec) {
             recommendations.push(matchingRec);
         }
     }



     if (quest6.ans6 && quest6.ans6.toLowerCase() === 'no') {
         const matchingRec = allRecs.find(rec => rec.num === 6);
         if (matchingRec) {
             recommendations.push(matchingRec);
         }
     }


     
     if (quest7.ans7 && quest7.ans7.toLowerCase() === 'no') {
         const matchingRec = allRecs.find(rec => rec.num === 7);
         if (matchingRec) {
             recommendations.push(matchingRec);
         }
     }


     if (quest8.ans8 && quest8.ans8.toLowerCase() === 'no') {
         const matchingRec = allRecs.find(rec => rec.num === 8);
         if (matchingRec) {
             recommendations.push(matchingRec);
         }
     }


     if (quest9.ans9 && quest9.ans9.toLowerCase() === 'no') {
         const matchingRec = allRecs.find(rec => rec.num === 9);
         if (matchingRec) {
             recommendations.push(matchingRec);
         }
     }


     if (quest10.ans10 && quest10.ans10.toLowerCase() === 'no') {
    const matchingRec = allRecs.find(rec => rec.num === 10);
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

module.exports = {createRecommendation,  getRecommendations, getRecResults, deleteAllRecommendations }
