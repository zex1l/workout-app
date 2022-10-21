const express = require('express')

// Middlewares
const protectHandler = require('../middleware/authMiddleware')

// Controllers
const createNewExercise = require('../controllers/exercise/exerciseController')
const createNewExerciseLog = require('../controllers/exercise/log/createLogController')
const getExerciseLog = require('../controllers/exercise/log/getLogController')
const {updateExerciseLog, updateCompleteExerciseLog} = require('../controllers/exercise/log/updateLogController')


const router = express.Router()

router.route('/').post(protectHandler, createNewExercise)

router.route('/log')
    .post(protectHandler, createNewExerciseLog)
    .put(protectHandler, updateExerciseLog)

router.route('/log/:id').get(protectHandler, getExerciseLog)

router.route('/log/completed').put(protectHandler, updateCompleteExerciseLog)

module.exports = router