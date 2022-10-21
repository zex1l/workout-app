const asyncHandler = require('express-async-handler')
const ExerciseLog = require('../../../models/exerciseLogModel')

const updateExerciseLog = asyncHandler(async(req, res) => {
    const {logId ,timeIndex, key, value} = req.body

    let currentLog = await ExerciseLog.findById(logId)

    if(!currentLog){
        res.status(404)
        throw new Error('This log not found')
    }

    let newTimes = currentLog.times

    if(!timeIndex || !key || !value) {
        res.status(404)
        throw new Error('You have not specified all fields')
    }    

    newTimes[timeIndex][key] = value 

    currentLog.times = newTimes

   const updateLog = await currentLog.save()

   res.json(updateLog)
})



const updateCompleteExerciseLog = asyncHandler(async (req, res) => {
    const {logId, completed} = req.body

    let currentLog = await ExerciseLog.findById(logId)

    if(!currentLog) {
        res.status(404)
        throw new Error('This log not found')
    }

    currentLog.completed = completed

    const updateLog = await currentLog.save()

    res.json(updateLog)

})

module.exports = {updateExerciseLog, updateCompleteExerciseLog}
