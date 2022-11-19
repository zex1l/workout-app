const asyncHandler = require('express-async-handler')
const Workout = require('../../models/workoutModel')

const createNewWorkout = asyncHandler(async (req, res) => {
    const {name, exerciseIds} = req.body

    const workout = await Workout.create({
        name,
        exercises: exerciseIds
    })

    res.json(workout)
})

const getWorkout = asyncHandler(async (req, res) => {
    const workout = await Workout.findById(req.params.id).populate('exercises').lean()
    
    const minutes = Math.ceil( workout.exercises.length * 3.7)

    res.json({...workout, minutes})

})

const getWorkouts = asyncHandler(async (req, res) => {
    const workouts = await Workout.find({}).populate('exercises')

    res.json(workouts)
})

 const updateWorkout = asyncHandler(async (req, res) => {
    const {name, exerciseIds, workoutId} = req.body

    const workout = await Workout.findById(workoutId)

    if(!workout) {
        res.status(404)
        throw new Error('Workout not found')
    }

    workout.name = name
    workout.exercises = exerciseIds

    const updateWorkout = await workout.save()

    res.json(updateWorkout)

})

const deleteWorkout = asyncHandler(async (req, res) => {
    const { workoutId} = req.body

    const workout = await Workout.findById(workoutId)

    if(!workout) {
        res.status(404)
        throw new Error('Workout not found')
    }


    await workout.remove()

    res.json({message: 'workout was deleted'})

})


/* 
    [X] - Workouts log models
    [] - Update exercise & workout
    [] - Delete exercise & workout
    [] - Get statistics for profile
 */

module.exports = {createNewWorkout, getWorkout, updateWorkout, deleteWorkout, getWorkouts}