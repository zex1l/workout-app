import { useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './Hamburger.module.scss'
import { menu } from './menuBase';

import hamburgerImage from '../../../../images/header/hamburger.svg'
import hamburgerClose from '../../../../images/header/hamburger-close.svg'

const Hamburger = () => {

    const [show, setShow] = useState(false)

    const handleLogout = () => {
        console.log('logout')
    }

    return (
        <div className={styles.wrapper}>
            <button 
                type='button'
                onClick={() => setShow(!show)}
            >
                <img src={show ? hamburgerClose: hamburgerImage} alt="" />
            </button> 
            <nav className={`${styles.menu} ${show ? styles.show : ''}`}>
                <ul>
                    {
                        menu.map(item => (
                                <li key={item.link}>
                                    <Link to={item.link}>
                                        {item.title}
                                    </Link>
                                </li>
                            ))
                    }
                    <li>
                        <p onClick={handleLogout}>Logout</p>
                    </li>
                </ul>
            </nav>
        </div>
        
    );
};

export default Hamburger;