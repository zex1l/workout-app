import { useState } from "react";
import {useNavigate} from 'react-router-dom'
import { useMutation } from "@tanstack/react-query";
import { $api } from "../../../api/api";

import Layout from "../../common/Layout";
import Field from "../../ui/Field/Field";
import Button from "../../ui/Button/Button";

import styles from './Auth.module.scss'
import newWorkoutImg from '../../../images/pagesImg/newWorkout.jpg'
import Alert from "../../ui/Alert/Alert";
import Loader from "../../ui/Loader/Loader";


const Auth = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [type, setType] = useState('auth')
    const navigate = useNavigate()

    const {
		mutate: register,
		isLoading,
		error,
        isError
	} = useMutation(
		() =>
			$api({
				url: '/users',
				type: 'POST',
				body: { email, password },
				auth: false,
			}),
		{
			onSuccess(data) {
                localStorage.setItem('token', data.token)
				console.log(data)

                setEmail('')
                setPassword('')
                navigate('/')
			},
		}
	)

    const handleSubmit = (e) => {
        e.preventDefault()

        if(type === 'auth') {
            console.log('Auth')
        }

        else {
            register()
        }
    }


    return (
        <>
            <Layout bgImage={newWorkoutImg} h1='AUTH OR REGISTER'/>
            <div className='wrapper-inner-page'>
                {error && <Alert type="error" text={error}/>}
                {isLoading && <Loader/>}
                <form onSubmit={handleSubmit}>
                    <Field 
                        placeholder='Enter email' 
                        value={email} 
                        onChange={e => setEmail(e.target.value)}
                        type='email'
                        required
                    />
                    <Field 
                        placeholder='Enter password' 
                        value={password} 
                        onChange={e => setPassword(e.target.value)}
                        type='password'
                        required
                    />
                    <div className={styles.wrapperButtons}>
                        <Button
                            text='Sign in'
                            callback={() => setType('auth')}
                        />
                        <Button
                            text='Sign up'
                            callback={() => setType('reg')}
                        />
                    </div>
                </form>
            </div>
        </>
    );
};

export default Auth;