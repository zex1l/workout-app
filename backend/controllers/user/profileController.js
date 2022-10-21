const User = require('../../models/userModel') 
const asyncHandler = require('express-async-handler')
 

const getUserProfile = asyncHandler( async (req, res) => {
    const user = await User.findById(req.user._id).select('-password')

    res.json(user)
})

module.exports = getUserProfile