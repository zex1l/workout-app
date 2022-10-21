const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')

const protectHandler = asyncHandler(async (req, res, next) => {
    let token

    if(req.headers.authorization?.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN)

        const userFound = await User.findById(decoded.userId).select('-password')

        if(userFound) {
            req.user = userFound
            next()
        }
        else {
            res.status(401)
            throw new Error('Your token is not working')
        }
    }

    if(!token) {
        res.status(401)
        throw new Error('Not authorization without token')
    }
})

module.exports = protectHandler