const asyncHandler = require('express-async-handler')
const WorkoutLog = require('../../../models/workoutLogModel')
const Workout = require('../../../models/workoutModel')
const ExerciseLog = require('../../../models/exerciseLogModel')

const createNewWorkoutLog = asyncHandler(async (req, res) => {
    const {workoutId} = req.body

    const user = req.user._id

    const workout = await Workout.findById(workoutId).populate('exercise')

    if(workout) {
        const workoutLog = await WorkoutLog.create({
            user,
            workout: workoutId
        })

        const logs = workout.exercises.map(ex => {
            let timesArray = []

            for(let i = 0; i<ex.times; i++) {
                timesArray.push({
                    weight: 0,
                    repeat: 0
                })
            }

            return {
                user,
                exercises: ex._id,
                times: timesArray,
                workoutLog: workout._id
            }
        })

        const createdExLogs = await ExerciseLog.insertMany(logs)

        const exLogIds = createdExLogs.map(log => log._id)

        const foundWorkoutLog = await WorkoutLog.findById(workoutLog._id)

        foundWorkoutLog.exerciseLog = exLogIds

        const updateWorkoutLog = await foundWorkoutLog.save()

        res.json(updateWorkoutLog)
    }
    else {
        res.status(404)
        throw new Error('Workout not found')
    }


    res.json(workoutLog)

})

const getWorkoutLog = asyncHandler(async(req, res) => {
    const workoutLog = await WorkoutLog.findById(req.params.id)
        .populate('workout')
        .populate({
            path: 'exerciseLogs',
            populate: {
                path: 'exercise'
            }
        })
        .lean()

        const minutes = Math.ceil(workoutLog.workout.exercises.length * 3.7)

        res.json({...workoutLog, minutes})
})

const updateCompletedWorkoutLog = asyncHandler(async (req, res) => {
    const {logId} = req.body

    const currentLog = await WorkoutLog.findById(logId)

    if(!currentLog) {
        res.status(404)
        throw new Error('Workout log not found')
    }

    currentLog.completed = true

    const updateLog = await currentLog.save()

    res.json(updateLog)
})

module.exports = {createNewWorkoutLog, getWorkoutLog, updateCompletedWorkoutLog}