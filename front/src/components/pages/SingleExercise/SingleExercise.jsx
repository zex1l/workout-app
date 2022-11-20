import {useQuery, useMutation} from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import cn from 'classnames'
import debounce from 'lodash.debounce'

import Layout from '../../common/Layout'
import Alert from '../../ui/Alert/Alert'
import {$api} from '../../../api/api'

import styles from './SingleExercise.module.scss'
import exerciseImg from '../../../images/pagesImg/exercise.jpg'
import completedIcon from '../../../images/icons/completed.svg'
import progressIcon from '../../../images/icons/progress.svg'

const SingleExercise = () => {
  const [isCompleted, setIsCompleted] = useState()
  const {id} = useParams()

  const {data, isSuccess, refetch} = useQuery(
      ['get exercise log'],
      () => $api({
          url: `/exercises/log/${id}`
      }),
      {
        refetchOnWindowFocus: false
      }
    )
  const {
      mutate,
      error: logError
    } = useMutation(
    ({timeIndex, key, value}) => $api({
      url: 'exercises/log',
      type: 'PUT',
      body: {timeIndex, key, value, logId: id}
    }), {
      onSuccess(data) {
        refetch()
        
      },
    }
  )
  const {mutate: setExerciseCompleted, isSuccess: succesExCompleted} = useMutation(
    () => $api({
      url: '/exercises/log/completed',
      type: 'PUT',
      body: {logId: id, completed: true},
    }),
    {
      onSuccess(data) {
        setIsCompleted(data.completed)
      }
    }
  )
  const handleSubmit = () => {
    if(isSuccess && data.times.length === data.times.filter(time => time.completed).length) {
      setExerciseCompleted()
    }
  }
  console.log(data)
    return (
        <section className={styles.section}>
          <Layout bgImage={exerciseImg}  h1={isSuccess ? data.exercise.name : 'LOADING ...'}/>  
          {logError && <Alert type='error' text={logError}/>}
          { (isCompleted || data?.completed) && <Alert type='succes' text='Exercise completed'/>}
          {isSuccess ? (
            <div className={styles.wrapper} >
              <div className={styles.row}>
                <div>
                  <span>Previos</span>
                </div>
                <div>
                  <span>Repeat & Weigth</span>
                </div>
                <div>
                  <span>Completed</span>
                </div>
              </div>
              {data.times.map((item, idx)=> (
                  <div className={cn(styles.row, {
                    [styles.completed] : item.completed
                  })}
                  key={`row ${idx}`}
                  >
                    <div className={styles.opacity}>
                        <input 
                          type="number" 
                          defaultValue={item.prevWeight}
                          disabled
                          aria-label='previos weight'
                        />
                        <i>kg /</i>
                        <input type="number" defaultValue={item.prevRepeat} aria-label='previos repeat'/>
                    </div>
                    <div >
                        <input 
                          pattern='[0-9]*'
                          type="tel" 
                          defaultValue={item.weight}
                          onChange={debounce( e => e.target.value && mutate({
                            timeIndex: idx,
                            key: 'weight',
                            value: e.target.value
                            }), 1000
                          )}
                          aria-label='current weigth'
                        />
                        <i>kg /</i>
                        <input 
                          pattern='[0-9]*'
                          aria-label='current repeat'
                          type="tel" 
                          defaultValue={item.repeat}
                          onChange={debounce(e => e.target.value && mutate({
                            timeIndex: idx,
                            key: 'repeat',
                            value: e.target.value
                            }), 1000
                          )}
                          
                        />
                    </div>
                    <div alt='progress or complete'>
                        <img 
                            height={21} width={21}
                            src={item.completed ? completedIcon : progressIcon} 
                            className={styles.checkbox} alt="progress or complete exercise" 
                            onClick={e => mutate({
                              timeIndex: idx,
                              key: 'completed',
                              value: !item.completed
                            })}
                        />
                    </div>
                  </div>
              ))}
            </div>
          )
            
            :
          <div>Times not found</div>
            
        }
          <div className={styles.link}>
            <button 
              onClick={handleSubmit} 
              
            >Complete exercises</button> 
            {isSuccess && <Link to={`/workout/${data.workoutLog}`}>Back to Exercises</Link>}
          </div>
        </section>
    );
};

export default SingleExercise;