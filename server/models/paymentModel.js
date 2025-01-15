const mongoose = require('mongoose')

const Schema = mongoose.Schema

const paymentSchema = new Schema({
   user: {
    type:Array,
    default:[]
    //required: true,
    },
    data:{
        type: Array,
        default: []
        //required: true
    },
    product: {
        type: Array,
        defaults: []
        //required: true
    },



 }, {timestamps: true})


module.exports = mongoose.model('ProductOne', productSchema)
