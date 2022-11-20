import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';

import Hamburger from './Hamburger/Hamburger';

import styles from './Header.module.scss'

import userImage from '../../../images/header/user.svg'
import arrowImage from '../../../images/header/arrow.svg'

const Header = () => {

    const {isAuth} = useAuth() 
    
    const {pathname} = useLocation()
    const navigate = useNavigate()

    return (
        <header className={styles.header}>

                    <button type='button' onClick={() => isAuth ? navigate('/profile') : navigate('auth')}>
                        <img src={ userImage} height={29} width={29} alt="Auth" draggable={false}/>
                    </button>

            <Hamburger/>

        </header>
    );
};

export default Header;