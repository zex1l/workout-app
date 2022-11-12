import {Routes, Route} from 'react-router-dom'

import Home from "./components/pages/Home/Home";
import NewWorkout from './components/pages/Home/NewWorkout/NewWorkout';

const App = () => {
    return (
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/new-workout' element={<NewWorkout/>}/>
                <Route path='*' element={<>Not found</>}/>
            </Routes>
            
    );
};

export default App;