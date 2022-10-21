const express = require('express')

// Middleware
const protectHandler = require('../middleware/authMiddleware')

//Controllers
const {createNewWorkout, getWorkout} = require('../controllers/workout/workoutController')
const createNewWorkoutLog = require('../controllers/workout/log/workoutLogController')


const router = express.Router()

router.route('/').post(protectHandler, createNewWorkout)

router.route('/:id').get(protectHandler, getWorkout)

router.route('/log').put(protectHandler, createNewWorkoutLog)

module.exports = router

