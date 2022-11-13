import { useState } from "react";

import Layout from "../../common/Layout";
import Field from "../../ui/Field/Field";
import Button from "../../ui/Button/Button";

import styles from './Auth.module.scss'
import newWorkoutImg from '../../../images/pagesImg/newWorkout.jpg'
import Alert from "../../ui/Alert/Alert";

const Auth = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [type, setType] = useState('auth')

    const handleSubmit = (e) => {
        e.preventDefault()

        if(type === 'auth') {
            console.log('Auth')
        }

        else {
            console.log('Reg')
        }
    }


    return (
        <>
            <Layout bgImage={newWorkoutImg} h1='AUTH OR REGISTER'/>
            <div className='wrapper-inner-page'>
                {true && <Alert  text='Успешно авторизован'/>}
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