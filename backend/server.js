const express = require('express')
const dotenv =  require('dotenv')
const morgan = require('morgan')

// Database
const connectDB = require('./config/db')

// Middleware
const {notFound, errorHandler} = require('./middleware/errorMiddleware')

const PORT = process.env.PORT || 5000

// Routes
const userRoutes = require('./routes/userRoutes')
const exerciseRoutes = require('./routes/exerciseRoutes')
const workoutRoutes = require('./routes/workoutRoutes')

// Config
dotenv.config()

connectDB()

const app = express()

if(process.env.NODE__ENV === 'development') {
    app.use(morgan('dev'))
}

app.use(express.json())

app.use('/api/users', userRoutes)
app.use('/api/exercises', exerciseRoutes)
app.use('/api/workouts', workoutRoutes)

app.use(notFound)
app.use(errorHandler)


app.listen(PORT, () => {
    console.log(`Server start on ${PORT}`)
})