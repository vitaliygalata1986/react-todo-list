import styles from './Field.module.scss'

const Field = ({
  className = '',
  id,
  label,
  type = 'text',
  value,
  onInput,
  ref,
  error,
}) => {
  return (
    <>
      <div className={`${styles.field} ${styles.className}`}>
        <label className={`${styles.label}`} htmlFor={id}>
          {label}
        </label>
        <input
          type={type}
          className={`${styles.input} ${error ? styles.isInvalid : ''}`}
          id={id}
          placeholder=" "
          autoComplete="off"
          value={value}
          onInput={onInput}
          ref={ref}
        />
        {error && (
          <span className={styles.error} title={error}>
            {error}
          </span>
        )}
      </div>
    </>
  );
};

export default Field;
