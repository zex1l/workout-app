const express = require('express')

// Controllers
const  getUserProfile  = require('../controllers/user/profileController')
const registerUser = require('../controllers/user/regController')
const authController = require('../controllers/user/authController')

// Middlewares
const protectHandler = require('../middleware/authMiddleware')

const router = express.Router()

router.route('/profile').get(protectHandler, getUserProfile)
router.route('/').post(registerUser)
router.route('/login').post(authController)

module.exports = router