
import styles from './Field.module.scss'

const Field = ({placeholder, value, onChange, type = 'text'}) => {
    return (
        <input
            className={styles.input}
            type={type}
            placeholder={placeholder}
            onChange={onChange}
            value={value}
        />
    );
};

export default Field;