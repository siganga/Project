const express = require('express')

const{loginUser, signupUser, signupAdmin} = require('../controllers/userController')

const UserTwo = require('../models/userModel');


const router = express.Router()

//login route
router.post('/login', loginUser)

//signup route

router.post('/signup', signupUser)

//admin signup router
router.post('/signup/admin', signupAdmin)

//A PUT route for /:userId/suspend that updates the specified user in the database and sets their suspended attribute to true.
router.put('/:userId/suspend', async (req, res) => {
  await UserTwo.updateOne({ _id: req.params.userId }, { suspended: true });
  res.json({ message: 'User account suspended' });
});


//A PUT route for /:userId/unsuspend that updates the specified user in the database and sets their suspended attribute to false
router.put('/:userId/unsuspend', async (req, res) => {
  await UserTwo.updateOne({ _id: req.params.userId }, { suspended: false });
  res.json({ message: 'User account unsuspended' });
});




// A GET route for /users that returns a list of all users
router.get('/users', async (req, res) => {
  const allUsers = await UserTwo.find(); // Assuming you're using Mongoose
  res.json(allUsers);
});


// Delete User Route
router.delete('/:id',  async (req, res) => {
  
    // Find the user by ID and remove them
    await UserTwo.findOneAndRemove({ _id: req.params.id });
   res.json({ message: 'User account deleted' });
  
});

/*
// Middleware to check if the user is authenticated
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/'); // Redirect to the homepage if not authenticated
}

*/




router.get('/:userId/streak', async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find the user by ID
    const user = await UserTwo.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Send the user's streak in the response
    res.json({ streak: user.streak });
  } catch (error) {
    console.error('Error fetching user streak:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


module.exports = router
