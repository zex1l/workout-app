const mongoose = require('mongoose')

const {ObjectId} = mongoose.Schema

const workoutSchema = mongoose.Schema({
    name: {type: String, required: true},
    exercises: [{
        type: ObjectId,
        ref: 'Exercise',
        required: true
    }]
},
{
    minimize: false,
    timestamps: true
})


const Workout = mongoose.model('Workout', workoutSchema)

module.exports = Workout