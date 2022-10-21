const jwt = require('jsonwebtoken')

const generateToken = (userId) => jwt.sign(
    {
        userId,
    },

    process.env.ACCESS_TOKEN, 

    {
        expiresIn: '10d'
    }
)

module.exports = generateToken