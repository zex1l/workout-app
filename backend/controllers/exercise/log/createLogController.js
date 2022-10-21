const asyncHandler = require('express-async-handler')
const ExerciseLog = require('../../../models/exerciseLogModel')

// create exercise log or take previos
const createNewExerciseLog = asyncHandler(async (req, res) => {
    const {exerciseId, times} = req.body

    let timesArray = []


    
    for(let i = 0; i < times; i++) {
        timesArray.push({
            weight: 0,
            repeat: 0
        })
    }


    const exerciseLog = await ExerciseLog.create({
        user: req.user._id,
        exercise: exerciseId,
        times: timesArray
    })

    res.json(exerciseLog)
    
})



module.exports = createNewExerciseLog