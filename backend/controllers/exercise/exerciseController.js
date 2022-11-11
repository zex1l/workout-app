const asyncHandler = require('express-async-handler')
const Exercise = require('../../models/exerciseModel')

const createNewExercise = asyncHandler(async (req, res) => {
    const {name, times, imageId} = req.body

    const exercise = await Exercise.create({
        name,
        times,
        imageId
    })

    res.json(exercise)
})


const updateExercise = asyncHandler(async (req, res) => {
    const {name, times, imageId, exerciseId} = req.body

    const exercise = await Exercise.findById(exerciseId)

    if(!exercise) {
        res.status(404)
        throw new Error('Exercise not found')
    }

    exercise.name = name
    exercise.times = times
    exercise.imageId = imageIndex

    const updateExercise = await exercise.save()

    res.json(updateExercise)
})

const deleteExercise = asyncHandler(async (req, res) => {
    const {exerciseId} = req.body

    const exercise = await Exercise.findById(exerciseId)

    if(!exercise) {
        res.status(404)
        throw new Error('Exercise not found')
    }

    await exercise.remove()

    res.json({message: 'Exercise was deleted'})
})

const getExercises = asyncHandler(async(req, res) => {
    const exercises = await Exercise.find({})

    res.json(exercises)
})


module.exports = {createNewExercise, updateExercise, deleteExercise, getExercises}