const jwt = require('jsonwebtoken')
const UserTwo = require('../models/userModel.js')

const requireAuth = async (req, res, next) =>{

  //verify authentication
  const { authorization } = req.headers

  if(!authorization){
    return res.status(401).json({error: 'Authorization token required'})
  }

  //Split operator splits whenever a specific character is found

  const token = authorization.split(' ')[1]

  try {
  const {_id} =  jwt.verify(token, process.env.SECRET)//returns token or payload of token

  req.user = await UserTwo.findOne({_id}).select('_id')//Get only id, slim down doc
  next()
  } catch (error) {
    console.log(error)
    res.status(401).json({error: 'Request is not authorized'})
  }
}


module.exports = requireAuth
