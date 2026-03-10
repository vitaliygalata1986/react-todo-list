import styles from './Button.module.scss';

const Button = ({
  type = 'button',
  children,
  onClick,
  isDisabled,
}) => {
  return (
    <button
      disabled={isDisabled}
      className={styles.button}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
