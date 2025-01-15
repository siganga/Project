const mongoose = require('mongoose');
const productSchema = require('./productModel').schema;

// Create an order schema
const orderSchema = new mongoose.Schema({
  userId: String,
  products: [productSchema],
  email:String,
  subtotal: Number,
  date: Date,
  address: String,
  startDate: Date,
  endDate: Date,
  returned: Boolean
});

// Create an order model
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
