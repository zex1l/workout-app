import { useNavigate } from 'react-router-dom';
import {useQuery} from '@tanstack/react-query'

import Layout from '../../common/Layout';
import Button from '../../ui/Button/Button';
import Counters from '../../ui/Counters/Counters';

import { $api } from '../../../api/api';
import { useAuth } from '../../../hooks/useAuth';

import bgImage from '../../../images/home-bg.jpg'

import styles from './Home.module.scss'


const Home = () => {

    const navigate = useNavigate()
    const {isAuth} = useAuth()

   

    const { data, isSuccess} = useQuery(
        ['data'],
        () => $api({
            url: '/users/profile'
        }),
        {
            refetchOnWindowFocus: false,
            enabled: isAuth
        }
    )

    
    return (
        <Layout  bgImage={bgImage} >
            <Button 
                text='New' 
                type = 'main' 
                callback={() => {navigate('/new-workout')}} 
            />
            <h1 className={styles.heading}>EXERCISES FOR THE SHOULDERS</h1>
            {(isSuccess && isAuth) && <Counters minutes={data.minutes} workouts={data.workouts} kgs={data.kgs}/>}
        </Layout>
    );
};

export default Home;