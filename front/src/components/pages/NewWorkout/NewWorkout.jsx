import { useState } from "react";
import ReactSelect from 'react-select'
import { Link } from "react-router-dom";

import Layout from "../../common/Layout";
import Field from "../../ui/Field/Field";
import Button from "../../ui/Button/Button";



import newWorkoutImg from '../../../images/pagesImg/newWorkout.jpg'

const NewWorkout = () => {

    const [name, setName] = useState('')
    const [exercises, setExercises] = useState([])

    const handleSubmit = () => {

    }

    return (
        <>
            <Layout bgImage={newWorkoutImg} h1='CREAT NEW WORKOUT'/>
            <div className='wrapper-inner-page'>
                <form onSubmit={handleSubmit}>
                    <Field 
                        placeholder='Enter name' 
                        value={name} 
                        onChange={e => setName(e.target.value)}
                    />
                    <Link 
                        to='/new-exercise'
                        className="dark-link"
                    >
                        Add new exercises
                    </Link>
                    <ReactSelect
                        classNamePrefix='select2-selection'
                        placeholder='Exercices...'
                        title='Exercices'
                        options={[
                            {value: 'dada13', label: 'Push-Ups'},
                            {value: 'e1d123', label: 'Pull-Ups'},
                        ]}
                        value={exercises}
                        onChange={setExercises}
                        //theme={theme => optionColor(theme)}
                        isMulti={true}
                    />
                    <Button
                        text='Create'
                        callback={() => {}}
                    />
                </form>
            </div>
        </>
    );
};

export default NewWorkout;