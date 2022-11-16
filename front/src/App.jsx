import {Routes, Route, BrowserRouter} from 'react-router-dom';
import { AuthContext } from './contexts/AuthContext';
import { useState } from 'react';
import NotFound from './components/pages/404/NotFound';


import { routes } from './routes';

const App = () => {
    const [isAuth, setIsAuth] = useState(!!localStorage.getItem('token'))

    return (
        <AuthContext.Provider value={{isAuth, setIsAuth}}>
            <BrowserRouter>
                <Routes>
                    {routes.map(route => {
                        if(route.auth && !isAuth) {
                            return false
                        }
                        return (<Route key={route.path} path={route.path} element={<route.element/>}/>)
                    })}
                    
                    <Route path='*' element={<NotFound/>}/>
                </Routes>
            </BrowserRouter>
        </AuthContext.Provider>
    );
};

export default App;