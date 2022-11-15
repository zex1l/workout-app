import { useState } from "react";
import {useNavigate} from 'react-router-dom'
import { useMutation } from "@tanstack/react-query";
import { $api } from "../../../api/api";
import { useAuth } from "../../../hooks/useAuth";

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

    const {setIsAuth} = useAuth()
    const navigate = useNavigate()


    const successLogin = (token) => {
            localStorage.setItem('token', token)

            setIsAuth(true)
            setEmail('')
            setPassword('')
            navigate('/')
    }

    const {
		mutate: register,
		isLoading,
		error,
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
                successLogin(data.token)
			},
		}
	)

    const {
		mutate: auth,
		isLoading: isLoadingAuth,
		error: errorAuth,
	} = useMutation(
		() =>
			$api({
				url: '/users/login',
				type: 'POST',
				body: { email, password },
				auth: false,
			}),
		{
			onSuccess(data) {
                successLogin(data.token)
                console.log(data)
			},
		}
	)

    const handleSubmit = (e) => {
        e.preventDefault()

        if(type === 'auth') {
            auth()
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
                {errorAuth && <Alert type="error" text={error}/>}
                {(isLoading || isLoadingAuth) && <Loader/>}
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