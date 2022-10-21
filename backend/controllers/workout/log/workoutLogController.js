const asyncHandler = require('express-async-handler')
const WorkoutLog = require('../../../models/workoutLogModel')

const createNewWorkoutLog = asyncHandler(async (req, res) => {
    const {workoutId} = req.body


    const workoutLog = await WorkoutLog.create({
        user: req.user._id,
        workout: workoutId
    })

    res.json(workoutLog)

})

module.exports = createNewWorkoutLog