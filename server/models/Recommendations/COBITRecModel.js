const mongoose = require('mongoose');


// Create an order schema
const cobitRecSchema = new mongoose.Schema({

   num: {
      type: Number,
      required: true,
      //required: true
    },

  rec: {
      type: String,
      required: true,
    },

   
  
});


module.exports = mongoose.model('CobitRecOne',cobitRecSchema);