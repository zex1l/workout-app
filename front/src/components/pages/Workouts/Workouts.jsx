import {useQuery} from '@tanstack/react-query'

import Layout from '../../common/Layout'

import styles from './Workouts.module.scss'
import workoutImg from '../../../images/pagesImg/newWorkout.jpg'
import { $api } from '../../../api/api';
import Loader from '../../ui/Loader/Loader';
import { Link } from 'react-router-dom';

const Workouts = () => {

    const {data, isSuccess} = useQuery(
        ['get all workouts'],
        () => $api({
            url: '/workouts'
        }),
        {
            refetchOnWindowFocus: false
        }
    )
    return (
        <>
            <Layout bgImage={workoutImg} h1='WORKOUTS'>
            
            </Layout>
            <div className='wrapper-inner-page'>
                <div className={styles.items}>
                    {isSuccess ? data.map(workout => (
                        <div key={workout._id} className={styles.item}>
                            <Link to={`/workout/${workout._id}`}>{workout.name}</Link>
                        </div>
                    ))
                        : <Loader/>
                    }
                </div>
            </div>
        </>
    );
};

export default Workouts;