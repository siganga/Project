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

        // Get the current date
        const currentDate = new Date();
        
        // Get the last score save date from the user object
        const lastSaveDate = user.lastScoreSaveDate;

        let streakToReturn = user.streak; // Initialize with the user's current streak

        // Check if lastSaveDate exists and if more than one day has passed
        if (lastSaveDate) {
            const timeDifference = currentDate.getTime() - lastSaveDate.getTime();
            const daysDifference = timeDifference / (1000 * 60 * 60 * 24); // Convert milliseconds to days

            if (daysDifference > 1) {
                // If more than one day has passed, reset the streak
                streakToReturn = 0;
                // Optionally, update the user's streak in the database
                user.streak = 0;
                await user.save(); // Saves the updated user object
            }
        } else {
            // If lastScoreSaveDate is null, it means no score has ever been saved.
            // In this case, the streak should be 0.
            if (user.streak !== 0) {
                streakToReturn = 0;
                user.streak = 0;
                await user.save();
            }
        }
        
        // Send the potentially updated streak in the response
        res.json({ streak: streakToReturn });

    } catch (error) {
        console.error('Error fetching user streak:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});



module.exports = router
