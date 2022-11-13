
import cn from 'classnames'

import Header from './Header/Header';

import styles from './Layout.module.scss'

const Layout = ({children, bgImage,  h1 = ''}) => {
    return (
        <div 
            className={cn(styles.wrapper, {
                [styles.otherPage]: h1
            })} 
            style={{ backgroundImage: `url(${bgImage})`}}
        >
            <Header />
            <h1>{h1}</h1>
            { children && 
                <div>
                    {children}
                </div>
            }
        </div>
    );
};

export default Layout;