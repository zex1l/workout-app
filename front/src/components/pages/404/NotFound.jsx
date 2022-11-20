import { useAuth } from "../../../hooks/useAuth";
import Layout from "../../common/Layout";
import { Link } from "react-router-dom";

import newWorkoutImg from '../../../images/pagesImg/newWorkout.jpg'

import styles from './NotFound.module.scss'

const NotFound = () => {

    const {isAuth} = useAuth()
    console.log(isAuth)
    return (
        <>
            <Layout bgImage={newWorkoutImg} h1='Page not found'/>
            <div className='wrapper-inner-page'>
               404 page not found
               {
                isAuth ? null : 
                <div>
                    <p style={{'marginTop': '10px'}}>Or you need sing up | sign in</p>
                    <Link className={styles.link} to='/auth'>Sing Up or Sing In</Link>
                </div>
               }
            </div>
        </>
    );
};


export default NotFound