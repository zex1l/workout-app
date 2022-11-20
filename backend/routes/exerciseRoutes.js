const express = require('express')

// Middlewares
const protectHandler = require('../middleware/authMiddleware')

// Controllers
const {createNewExercise, updateExercise, deleteExercise, getExercises} = require('../controllers/exercise/exerciseController')
const createNewExerciseLog = require('../controllers/exercise/log/createLogController')
const getExerciseLog = require('../controllers/exercise/log/getLogController')
const {updateExerciseLog, updateCompleteExerciseLog} = require('../controllers/exercise/log/updateLogController')


const router = express.Router()

router.route('/')
        .get(protectHandler, getExercises)
        .post(protectHandler, createNewExercise)
        .put(protectHandler, updateExercise)
        .delete(protectHandler, deleteExercise)

router.route('/log')
    .post(protectHandler, createNewExerciseLog)
    .put(protectHandler, updateExerciseLog)

router.route('/log/:id').get(protectHandler, getExerciseLog)

router.route('/log/completed').put(protectHandler, updateCompleteExerciseLog)

module.exports = router