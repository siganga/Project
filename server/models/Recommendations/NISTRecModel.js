const mongoose = require('mongoose');



const nistRecSchema = new mongoose.Schema({

    num: {
      type: Number,
      required: true,
      //required: true
    },

  rec: { //Recommendation
      type: String,
      required: true,
    },


    scen: {  //Scenario
      type: String,
      required: true,
    },
   
   imp: { //impact
      type: Number,
      required: true,
      //required: true
    },

    lik: {//likelihood
      type: Number,
      required: true,
      //required: true
    },


   
  
});


module.exports = mongoose.model('NistRecThree',nistRecSchema);