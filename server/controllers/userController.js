const UserTwo = require('../models/userModel.js')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');

const createToken = (_id) =>{
	return jwt.sign({_id}, process.env.SECRET, {expiresIn:'3d'})
}





const   loginUser =  async (req, res) => {
    const {email, password} = req.body
    try{
        const user = await UserTwo.login(email, password);

        const token = createToken(user._id)
        res.status(200).json({ email, token, userId: user._id, role: user.role });

    }catch(error){
        res.json({error: error.message})
    }
}

const   signupUser = async (req, res) => {
    const {name, email, password} = req.body
    const role = 'user'
    try{
        const user = await UserTwo.signup(email, password, role)
        const token = createToken(user._id)
        res.status(200).json({email, token, userId: user._id, role: user.role})
    }catch(error){
        res.json({error: error.message})
    }
}



const   signupAdmin = async (req, res) => {
    const {name, email, password, accessCode} = req.body
    const role = 'admin'
    try{

			if (req.body.accessCode !== 'abcd1234') {//'abcd1234'  process.env.SECRET_ACCESS_CODE
				return res.status(401).json({ message: 'Invalid access code' });
			}

        const user = await UserTwo.signup(email, password, role)
        const token = createToken(user._id)
        res.status(200).json({email, token, userId: user._id, role: user.role})
    }catch(error){
        res.json({error: error.message})
    }
}





module.exports = {loginUser, signupUser, signupAdmin}
