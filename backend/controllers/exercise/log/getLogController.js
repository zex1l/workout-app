const asyncHandler = require('express-async-handler')
const reBuildTimes = require('../../../helpers/exerciseLog')
const ExerciseLog = require('../../../models/exerciseLogModel')

// Get exercise log
const getExerciseLog = asyncHandler(async (req, res) => {
    let exerciseLog = await ExerciseLog.findById(req.params.id).populate('exercise', 'name imageName').lean()

    if(!exerciseLog){
        res.status(404)
        throw new Error("This log not found")
    }

    const prevExercises = await ExerciseLog.find({
        user: req.user._id,
        exercise: exerciseLog._id
    }).sort('desc')

    const prevExLog = prevExercises[0]

    let newTimes = reBuildTimes(exerciseLog)

    if(prevExLog){
        newTimes = reBuildTimes(exerciseLog, prevExLog)
    }

    exerciseLog = {...exerciseLog, times: newTimes}

    res.json(exerciseLog)
})

module.exports = getExerciseLog