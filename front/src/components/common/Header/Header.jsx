import { useLocation, useNavigate } from 'react-router-dom';

import Hamburger from './Hamburger/Hamburger';

import styles from './Header.module.scss'

import userImage from '../../../images/header/user.svg'
import arrowImage from '../../../images/header/arrow.svg'

const Header = () => {

    const {pathname} = useLocation()
    const navigate = useNavigate()

    return (
        <header className={styles.header}>
            {
                pathname !== '/' ? 
                (
                    <button onClick={() => navigate(-1)} type='button'>
                        <img src={arrowImage} alt="Auth" />
                    </button>
                )
                : 
                (
                    <button type='button' onClick={() => navigate('/auth')}>
                        <img src={ userImage} alt="Auth" />
                    </button>
                )
            }
            <Hamburger/>

        </header>
    );
};

export default Header;