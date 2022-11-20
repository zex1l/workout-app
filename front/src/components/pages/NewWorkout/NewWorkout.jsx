import { useState } from "react";
import ReactSelect from 'react-select'
import { Link } from "react-router-dom";
import {useQuery, useMutation} from '@tanstack/react-query'

import Layout from "../../common/Layout";
import Field from "../../ui/Field/Field";
import Button from "../../ui/Button/Button";
import Alert from "../../ui/Alert/Alert";
import Loader from "../../ui/Loader/Loader";

import { $api } from "../../../api/api";

import newWorkoutImg from '../../../images/pagesImg/newWorkout.jpg'


const NewWorkout = () => {

    const [name, setName] = useState('')
    const [exercisesId, setExercisesId] = useState([])

    const {data, isSuccess} = useQuery(
        ['list exercises'],
        () => (
            $api({
                url: '/exercises',
            })
        ),
        {
            refetchOnWindowFocus: false,
        }
    )

    const {mutate, isLoading, error, isSuccess : isSuccessMutate} = useMutation(

        ({exIds}) => $api({
            url: '/workouts',
            body: {name, exerciseIds: exIds},
            type: 'POST'
        }),
        {
            onSuccess() {
                setName('')
                setExercisesId([])
            }
        }
    )

    const handleSubmit = (e) => {
        e.preventDefault()

        const exIds = exercisesId.map(ex => ex.value)
        mutate({
            exIds
        })
    }

    
    return (
        <>
            <Layout bgImage={newWorkoutImg} h1='CREAT NEW WORKOUT'/>
            {(!isSuccessMutate && error) && <Alert type="error" text={error}/>}
            {isSuccessMutate && <Alert type="success" text="Exercise created" />}
            {(isLoading ) && <Loader/>}
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
                    {isSuccess && data && (
                        <ReactSelect
                            classNamePrefix='select2-selection'
                            placeholder='Exercices...'
                            title='Exercices'
                            options={data.map(ex => 
                                ({
                                    value: ex._id,
                                    label: ex.name
                                })
                            )}
                            value={exercisesId}
                            onChange={setExercisesId}
                            //theme={theme => optionColor(theme)}
                            isMulti={true}
                        />
                    )}
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