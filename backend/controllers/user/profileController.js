const User = require('../../models/userModel') 
const asyncHandler = require('express-async-handler')
const ExerciseLog = require('../../models/exerciseLogModel')
const WorkoutLog = require('../../models/workoutLogModel')
 

const getUserProfile = asyncHandler( async (req, res) => {
    const user = await User.findById(req.user._id).select('-password').lean()

    const exerciseLogByUser = await ExerciseLog.find({user: user._id, completed: true})

    let countExerciseTimesCompleted = 0
    let kgs = 0

    exerciseLogByUser.forEach(log => {
        countExerciseTimesCompleted += log.times.length

        log.times.forEach(item => {
            kgs += item.weight
        })
    })

    const minutes = Math.ceil(countExerciseTimesCompleted * 2.3)

    const workouts = await WorkoutLog.find({user: user._id, completed: true}).countDocuments()

    res.json({
        ...user,
        minutes,
        workouts,
        kgs
    })
})

module.exports = getUserProfile