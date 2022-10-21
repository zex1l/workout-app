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


module.exports = createNewExercise