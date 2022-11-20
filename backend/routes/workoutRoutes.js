const express = require('express')

// Middleware
const protectHandler = require('../middleware/authMiddleware')

//Controllers
const {createNewWorkout, getWorkout, updateWorkout, deleteWorkout, getWorkouts} = require('../controllers/workout/workoutController')
const {createNewWorkoutLog, updateCompletedWorkoutLog, getWorkoutLog} = require('../controllers/workout/log/workoutLogController')


const router = express.Router()

router.route('/')
            .get(protectHandler, getWorkouts)
            .post(protectHandler, createNewWorkout)
            .put(protectHandler, updateWorkout)
            .delete(protectHandler, deleteWorkout)

router.route('/:id').get(protectHandler, getWorkout)
router.route('/log/completed').put(protectHandler, updateCompletedWorkoutLog)
router.route('/log').post(protectHandler, createNewWorkoutLog)
router.route('/log/:id').get(protectHandler, getWorkoutLog)

module.exports = router

