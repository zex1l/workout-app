const mongoose = require('mongoose')

const exerciseChema = mongoose.Schema({
    name: {type: String, required : true},
    times: {
        type: Number,
        required: true
    },
    imageName: {
        type: String,
        required: true
    }
}, 
{
    minimize: false,
    timestamps: true
})


const Exercise = mongoose.model('Exercise', exerciseChema)

module.exports = Exercise