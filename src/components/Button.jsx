const Button = ({ className = '', type = 'button', children, onClick }) => {
  return (
    <button className={`button ${className}`} type={type} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
