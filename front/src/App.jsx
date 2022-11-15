import {Routes, Route, BrowserRouter} from 'react-router-dom';
import { AuthContext } from './contexts/AuthContext';
import { useState } from 'react';
import Auth from './components/pages/Auth/Auth';

import Home from "./components/pages/Home/Home";
import NewWorkout from './components/pages/NewWorkout/NewWorkout';

const App = () => {
    const [isAuth, setIsAuth] = useState(false)

    return (
        <AuthContext.Provider value={{isAuth, setIsAuth}}>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/new-workout' element={<NewWorkout/>}/>
                    <Route path='/auth' element={<Auth/>}/>
                    <Route path='*' element={<>Not found</>}/>
                </Routes>
            </BrowserRouter>
        </AuthContext.Provider>
    );
};

export default App;