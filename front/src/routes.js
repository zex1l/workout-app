import Home from './components/pages/Home/Home'
import Auth from './components/pages/Auth/Auth'
import NewWorkout from './components/pages/NewWorkout/NewWorkout'
import Profile from './components/pages/Profile/Profile'
import NewExercise from './components/pages/NewExercise/NewExercise'
import Workouts from './components/pages/Workouts/Workouts'
import SingleWorkout from './components/pages/SingleWorkout/SingleWorkout'
import SingleExercise from './components/pages/SingleExercise/SingleExercise'

export const routes = [
    {
        path: '/',
        element: Home,
        auth: false
    },
    {
        path: '/auth',
        element: Auth,
        auth: false
    },
    {
        path: '/new-workout',
        element: NewWorkout,
        auth: true
    },
    {
        path: '/profile',
        element: Profile,
        auth: true
    },
    {
        path: '/new-exercise',
        element: NewExercise,
        auth: true
    },
    {
        path: '/workouts',
        element: Workouts,
        auth: true
    },
    {
        path: '/workout/:id',
        element: SingleWorkout,
        auth: true
    },
    {
        path: '/exercise/:id',
        element: SingleExercise,
        auth: true
    },
]