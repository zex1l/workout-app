import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import Layout from '../../common/Layout'
import { $api } from '../../../api/api';

import styles from './SingleWorkout.module.scss'
import singleWorkoutImg from '../../../images/pagesImg/singleWorkout.jpg'
import Alert from '../../ui/Alert/Alert';


const SingleWorkout = () => {

    const {id} = useParams()

    const {data, isSuccess} = useQuery(
        ['get single workout'],

        () => $api({
            url: `/workouts/${id}`
        }),
        {
            refetchOnWindowFocus: false
        }
    )
    return (
        <>
            {isSuccess && <Layout bgImage={singleWorkoutImg} h1={isSuccess ? data.name : 'Loading...'} workout={data.minutes}/>}  
            <div className="wrapper-inner-page">
                 
                 <div className={styles.wrapper}>
                    {isSuccess ? data.exercises.map(ex => {


                        return (
                            <div className={styles.item} key={ex._id}>
                                <Link to={`/exercises/${ex._id}`}>{ex.name}</Link>
                                <img src={`/uploads/exercises/${ex.imageName}.svg`} height='34' alt="" />
                            </div>
                        )
                    })
                        :
                        <Alert type='warning' text='Exercises not found'/>
                    }

                 </div>
            </div> 
        </>
    );
};

export default SingleWorkout;