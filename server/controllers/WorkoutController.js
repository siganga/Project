const Workout = require('../models/WorkoutModel.js')
const mongoose = require('mongoose')

//Get all workouts

//Get a single workout


//Create new workout
const createWorkout  = async (req, res) => {
    const {title, reps, load} = req.body
    try{
        const workout = await Workout.create({title, load, reps})
        res.status(200).json(workout)
    }catch(error){
        res.json({error: error.message})
    }
}

//get all workouts
const getWorkouts  = async (req, res) => {
    try{
        const workout = await Workout.find({})//.sort({createdAt:-1})
        res.status(200).json(workout)
    }catch(error){
        res.json({error: error.message})
    }
}

//Get a single workout
const getWorkout  = async (req, res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such workout'})
    }
    try{
        const workout = await Workout.findById(id)
        /*
        if(!workout){
            return res.status(404).json({error: 'No such workout'})
        }*/
        res.status(200).json(workout)
    }catch(error){
        res.json({error: error.message})
    }
}


//Delete a workouts
const deleteWorkout  = async (req, res) => {
    const {id} = req.params
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such workout'})
    }

    try{
        const workout = await Workout.findOneAndDelete({_id:id})//.sort({createdAt:-1})
        res.status(200).json(workout)
    }catch(error){
        res.json({error: error.message})
    }
}



//Update a workouts
const updateWorkout  = async (req, res) => {
    const {id} = req.params
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such workout'})
    }

    try{
        const workout = await Workout.findOneAndUpdate({_id:id},{...req.body})//.sort({createdAt:-1})
        res.status(200).json(workout)
    }catch(error){
        res.json({error: error.message})
    }
}
//Searcg
const searchWorkout  = async (req, res) => {
    
    const query = {};
    
    

    try{

        if (req.query.search) {
            query.$or = [
              //{author: new RegExp(req.query.search, 'i')},
              {title: new RegExp(req.query.search, 'i')},
              //{genre: new RegExp(req.query.search, 'i')}
            ];
          }
          Item.find(query).then(items => res.json(items));
        
        
    }catch(error){
        res.json({error: error.message})
    }
}



module.exports = {createWorkout,
     getWorkouts, getWorkout, deleteWorkout, updateWorkout,
     searchWorkout
    
    }