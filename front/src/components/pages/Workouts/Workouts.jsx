import {useQuery, useMutation} from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import Layout from '../../common/Layout'

import styles from './Workouts.module.scss'
import workoutImg from '../../../images/pagesImg/newWorkout.jpg'
import { $api } from '../../../api/api';
import Loader from '../../ui/Loader/Loader';
import { Link } from 'react-router-dom';

const Workouts = () => {
    const navigate = useNavigate()

    const {data, isSuccess} = useQuery(
        ['get all workouts'],
        () => $api({
            url: '/workouts'
        }),
        {
            refetchOnWindowFocus: false
        }
    )

    const {mutate, isSuccess: isSuccesMutate} = useMutation(
        ({workoutId}) => $api({
            url: '/workouts/log',
            type: 'POST',
            body: {workoutId}
        }),
        {
            onSuccess(data) {
                navigate(`/workout/${data._id}`)
            }
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
                            <button
                                aria-label='Create new workout'
                                onClick={() => mutate({workoutId: workout._id})}
                            >
                            <span>{workout.name}</span>
                            </button>
                        </div>
                    ))
                        : <Loader/>
                    }
                    <Link className='btn'  to='/'>Back Home</Link>   
                </div>
                
            </div>
        </>
    );
};

export default Workouts;