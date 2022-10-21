const User = require('../../models/userModel')
const asyncHandler = require('express-async-handler')

const generateToken = require('../../helpers/generateToken')

const registerUser = asyncHandler( async (req, res) => {
    const {email, password} = req.body

    const isHaveUser = await User.findOne({email})

    if(isHaveUser) {
        res.status(400)
        throw new Error('Email already existed')
    }

    const user = await User.create({
        email,
        password
    })

    const token = generateToken(user._id)

    res.json({user, token})

})

module.exports = registerUser