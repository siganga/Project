const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const orderSchema = require('./orderModel').schema


const Schema = mongoose.Schema

const userSchema = new Schema({
	name: {
    type: String,
    //required: true
  },

	email:{
		type:String,
		required: true,
		unique: true
	},

	password: {
		type: String,
		required: true
	},

	orders: [orderSchema],

	role: {
    type: String,
    //required: true
  },

  suspended: {
    type: Boolean,
    default: false
  }


})



userSchema.statics.signup = async function (email, password, role){

    //Validation
    if(!email || !password){
		throw Error('All fields must be filled')
	}
	if(!validator.isEmail(email)){
		throw Error('Email is not valid')
	}
	if(!validator.isStrongPassword(password)){
	throw Error('Password not strong enough')

	}

	const exists = await this.findOne({ email})

	if(exists){
		throw Error('Email already in use')
	}

	const salt = await bcrypt.genSalt(10)
	const hash = await bcrypt.hash(password, salt)

	const user = await this.create({email, password:hash, role})

	return user
}


userSchema.statics.login = async function(email, password) {

    if(!email || !password){
   throw Error('All fields must be filled')
}

const user = await this.findOne({ email})

if(!user){
   throw Error('Incorrect email')
}

// Check if the user's account is suspended
if(user.suspended) {
      throw Error('Your account has been suspended');
    }

const match = await bcrypt.compare(password, user.password)

if(!match){
   throw Error('Incorrect password')
}

return user
}

module.exports = mongoose.model('UserTwo',userSchema)
