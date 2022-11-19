
import {useQuery} from '@tanstack/react-query'

import Header from '../../common/Header/Header';
import Counters from '../../ui/Counters/Counters'
import { $api } from '../../../api/api';

import styles from './Profile.module.scss'
import stylesLayout from '../../common/Layout.module.scss'

import profileImg from '../../../images/pagesImg/profile.jpg'
import afterImg from '../../../images/profileImg/after.jpg'
import userImg from '../../../images/header/user.svg'

const Profile = () => {

    const {data, isSuccess} = useQuery(
        ['profile data'],
        () => $api({
            url: '/users/profile'
        }),
        {
            refetchOnWindowFocus: false
        }
    )

    return (
        <>
            <div 
                className={`${stylesLayout.wrapper} ${stylesLayout.otherPage}`} 
                style={{ backgroundImage: `url(${profileImg})`}}
            >
                <Header />
                <div className={styles.center}>
                    <img src={userImg} alt="Profile" height='50' />
                    {isSuccess && <h1 className={stylesLayout.heading}>{data.email}</h1>}
                </div>

                {isSuccess && (
                    <Counters
                        minutes={data.minutes}
                        workouts={data.workouts}
                        kgs={data.kgs}
                        type='profile'
                    />
                )}
            
            </div>
            <div className="wrapper-inner-page" style={{'paddingLeft' : '0', 'paddingRight' : '0'}}>
                <div className={styles.before_after}>
                    <div>
                        <div className={styles.heading}>Before</div>
                        <img src={afterImg} alt="" />
                    </div>
                    <div>
                        <div className={styles.heading}>After</div>
                        <img src={afterImg} alt="" />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;