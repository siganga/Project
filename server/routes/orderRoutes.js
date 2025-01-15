const express = require('express')
const UserTwo = require('../models/userModel.js')
const Order = require('../models/orderModel'); // Adjust the path as needed


const router = express.Router()

// Get all orders
router.get('/', async (req, res) => {
  try {
    const allOrders = await Order.find();
    res.json(allOrders);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
});

router.post('/order', async (req, res) => {
  const newOrder = new Order(req.body);
  await newOrder.save();

  // Update the user document
  await UserTwo.updateOne({ _id: req.body.userId }, { $push: { orders: newOrder } });

  res.json(newOrder);
});

//Updates the specified order in the database and sets its returned attribute to true
router.put('/:orderId/returned', async (req, res) => {
  await Order.updateOne({ _id: req.params.orderId }, { returned: true });
  res.json({ message: 'Order marked as returned' });
});

// Route to get all overdue orders
router.get('/overdue/all', async (req, res) => {
  try {
    const currentDate = new Date(); // Get the current date

    const overdueOrders = await Order.find({
      endDate: { $lt: currentDate }, // Orders with end date before the current date
      returned: false // Orders that haven't been returned
    })
    .populate('products')
    
    res.json(overdueOrders);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch overdue orders' });
  }
});


//that returns a list of all overdue orders for the specified user. This route uses the find method of the Order model to query the database for all orders that belong to the specified user, have an end date that is before the current date, and have not been returned.
router.get('/overdue/:userId', async (req, res) => {
  const currentDate = new Date();
  const overdueOrders = await Order.find({
    userId: req.params.userId,
    endDate: { $lt: currentDate },
    returned: false
  })
  .populate('userId', 'name') // populate the user field with the user's name
  .populate('products'); // populate the products field with product documents

  res.json(overdueOrders);
});



module.exports = router
