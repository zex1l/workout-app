
import cn from 'classnames'

import Header from './Header/Header';

import styles from './Layout.module.scss'

const Layout = ({children, bgImage,  h1 = '', workout = 0}) => {
    return (
        <div 
            className={cn(styles.wrapper, {
                [styles.otherPage]: h1
            })} 
            style={{ backgroundImage: `url(${bgImage})`}}
        >
            <Header />
            <div>
                {workout !== 0 && <time className={styles.time}>{workout} min</time> }
                <h1>{h1}</h1>
            </div>
            { children && 
                <div>
                    {children}
                </div>
            }
        </div>
    );
};

export default Layout;