const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')

const userShema = mongoose.Schema({

    name: String,
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    images: {
        before: String,
        after: String
    }
}, {
    minimize: false,
    timestamps: true
})

userShema.methods.matchPassword = async function (enteredPassword){
    return await bcryptjs.compare(enteredPassword, this.password)
}

userShema.pre('save', async function(next){
    if(!this.isModified('password')){
        next()
    }

    const salt = await bcryptjs.genSalt(10)
    this.password = await bcryptjs.hash(this.password, salt)
})

const User = mongoose.model('user', userShema )

module.exports = User