const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    title: {
      type: String,
      //required: true,
    },
    author: {
      type: [String],
      //required: true
    },
    desc: {
      type: String,
      //required: true
    },

    price: {
      type: Number,
      //required: true
    },

    category: [
      {
        type: String,
        //required: true
      },
    ],

    image: {
      type: String,
      //required: true
    },

    // Add a new field to store the product reviews
    reviews: [
      {
        title: String,
        text: String,
        user: {
          _id: String,
          email: String
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('ProductOne', productSchema);
