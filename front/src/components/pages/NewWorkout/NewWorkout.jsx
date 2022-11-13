import { useState } from "react";
import ReactSelect from 'react-select'

import Layout from "../../common/Layout";
import Field from "../../ui/Field/Field";
import Button from "../../ui/Button/Button";


import styles from './NewWorkout.module.scss'

import newWorkoutImg from '../../../images/pagesImg/newWorkout.jpg'

const NewWorkout = () => {

    const [name, setName] = useState('')
    const [exercises, setExercises] = useState([])

    const handleSubmit = () => {

    }

    return (
        <>
            <Layout bgImage={newWorkoutImg} h1='CREAT NEW WORKOUT'/>
            <div className={styles.wrapper}>
                <form onSubmit={handleSubmit}>
                    <Field 
                        placeholder='Enter name' 
                        value={name} 
                        onChange={e => setName(e.target.value)}
                    />
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