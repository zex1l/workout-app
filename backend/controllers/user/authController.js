const User = require('../../models/userModel')
const asyncHandler = require('express-async-handler')
const generateToken = require('../../helpers/generateToken')

const authController = asyncHandler( async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    console.log(user)
    if(user && (await user.matchPassword(password))) {
        const token = generateToken(user._id)

        res.json({ user, token })
    } 
    else {
        res.status(401)
        throw new Error('Invalid email or password')
    }
})

module.exports = authController