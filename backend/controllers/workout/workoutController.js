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




/* 
    [X] - Workouts log models
    [] - Update exercise & workout
    [] - Delete exercise & workout
    [] - Get statistics for profile
 */

module.exports = {createNewWorkout, getWorkout}