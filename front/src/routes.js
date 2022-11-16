import Home from './components/pages/Home/Home'
import Auth from './components/pages/Auth/Auth'
import NewWorkout from './components/pages/NewWorkout/NewWorkout'

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
]