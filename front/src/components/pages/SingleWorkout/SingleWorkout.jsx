import { useQuery, useMutation } from '@tanstack/react-query';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useEffect } from 'react';
import cn from 'classnames'

import Layout from '../../common/Layout'
import { $api } from '../../../api/api';

import styles from './SingleWorkout.module.scss'
import singleWorkoutImg from '../../../images/pagesImg/singleWorkout.jpg'
import Alert from '../../ui/Alert/Alert';


const SingleWorkout = () => {

    const {id} = useParams()
    const navigate = useNavigate()

    const {data, isSuccess} = useQuery(
        ['get single workout'],

        () => $api({
            url: `/workouts/log/${id}`
        })
    )

    const { mutate: setWorkoutCompleted, error: errorCompleted, isSuccess: succesWorkoutComoleted } = useMutation(
		() =>
			$api({
				url: '/workouts/log/completed',
				type: 'PUT',
				body: { logId: id },
			}),
		{
			
		}
	)

    useEffect(() => {
		if (
			isSuccess &&
			data?.exerciseLogs &&
			data.exerciseLogs.length ===
				data.exerciseLogs.filter(log => log.completed).length &&
			data._id === id
		) {
			setWorkoutCompleted()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data?.exerciseLogs])

    return (
        <>
            {isSuccess && <Layout bgImage={singleWorkoutImg} h1={isSuccess ? data.workout.name : 'Loading...'} workout={data.minutes}/>}  
            <div className="wrapper-inner-page">
                 {succesWorkoutComoleted && <Alert type='succes' text='Workout completed'/>}
                 <div className={styles.wrapper}>
                    {isSuccess && ( data.exerciseLogs.map(exLog => {

                        return (
                            <button 
                                disabled={data.exerciseLogs.completed}
                                aria-label='Move to exercise' 
                                className={cn(styles.item, {
                                    [styles.completed] : exLog.completed
                                })} 
                                key={exLog._id} 
                                onClick={() => navigate(`/exercise/${exLog._id}`)}>
                                <span>{exLog.exercise.name}</span>
                                <img src={`/uploads/exercises/${exLog.exercise.imageName}.svg`} height='34' alt="" />
                            </button>
                        )
                    }))
                        
                    }
                        <Link to='/workouts'>Back to Workouts</Link>
                 </div>
            </div> 
        </>
    );
};

export default SingleWorkout;