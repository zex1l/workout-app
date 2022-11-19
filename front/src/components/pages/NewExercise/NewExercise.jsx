import { useState } from "react";
import cn from 'classnames'
import { useMutation } from "@tanstack/react-query";

import Layout from "../../common/Layout";
import Field from "../../ui/Field/Field";
import Button from "../../ui/Button/Button";
import Alert from "../../ui/Alert/Alert";
import Loader from "../../ui/Loader/Loader";

import styles from './NewExercise.module.scss'

import NewExerciseImg from '../../../images/pagesImg/newExercise.jpg'
import { $api } from "../../../api/api";

const data = [
    'cheast', 'shoulders', 'biceps', 'legs', 'hit'
]

const NewExercise = () => {

    const [name, setName] = useState('')
    const [times, setTimes] = useState(1)
    const [imageName, setImageName] = useState('cheast')
    const [fieldError, setFieldError] = useState(false)

    const {mutate, isLoading, isSuccess ,error} = useMutation( () =>
        $api({
            url: '/exercises',
            type: 'POST',
            body: {name, times, imageName}
        }),
        {
            onSuccess(){
                setName('')
                setTimes(0)
                setImageName('cheast')
            }
        }
    )

    const handleSubmit = (e) => {
        e.preventDefault()
        if(name && times && imageName ) 
            mutate()
        else {
            setFieldError(true)
        }
    }


    return (
        <>
            <Layout bgImage={NewExerciseImg} h1="CREATE NEW EXERCISE"/>
                {(!isSuccess && fieldError) && <Alert type="error" text="All fields must be required"/>}
                {(!isSuccess && error) && <Alert type="error" text={error}/>}
                {isSuccess && <Alert type="success" text="Exercise created" />}
                {(isLoading ) && <Loader/>}
                <div className='wrapper-inner-page'>
                    <form onSubmit={handleSubmit}>
                        <Field 
                            placeholder='Enter name' 
                            value={name}
                            required
                            onChange={e => setName(e.target.value)}
                        />
                        
                        <Field 
                            placeholder='Enter times' 
                            value={times}
                            required
                            onChange={e => setTimes(e.target.value)}
                        />
                        
                        <div className={styles.images}>
                            {data.map(name => (
                                <img 
                                    key={`ex img ${name}`}
                                    src={`/uploads/exercises/${name}.svg`} 
                                    alt={name} 
                                    className={cn({
                                        [styles.active] : imageName === name
                                    })}
                                    onClick={() => setImageName(name)}
                                />
                            ))}
                        </div>
                        <Button
                            text='Create'
                            callback={() => {}}
                        />
                    </form>
                </div>  
        </>
    );
};

export default NewExercise;