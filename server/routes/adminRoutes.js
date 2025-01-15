const express = require('express');
const router = express.Router();
const User = require('../models/userModel'); // Mongoose User model

// Admin sign-up route
router.post('/signup', async (req, res) => {
  try {
    // Validate the data received from the frontend
    // ...

    // Check that the access code is correct
    //if (req.body.accessCode !== 'SECRET_ACCESS_CODE') {
    if (req.body.accessCode !== 'abcd1234') {
      return res.status(401).json({ message: 'Invalid access code' });
    }

    // Create a new user document in the users collection
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      role: 'admin' // Set the role to 'admin'
    });
    await user.save();

    // Send a success response back to the frontend
    res.status(201).json({ message: 'Admin account created' });
  } catch (error) {
    // Handle any errors
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
