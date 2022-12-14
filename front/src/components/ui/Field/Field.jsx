
import styles from './Field.module.scss'

const Field = ({placeholder, value, onChange, type = 'text', required}) => {
    return (
        <input
            className={styles.input}
            type={type}
            placeholder={placeholder}
            onChange={onChange}
            value={value}
            required={required}
        />
    );
};

export default Field;