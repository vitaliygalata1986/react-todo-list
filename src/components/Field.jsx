const Field = ({
  className = '',
  id,
  label,
  type = 'text',
  value,
  onInput,
}) => {
  return (
    <>
      <div className={`field ${className}`}>
        <label className="field__label" htmlFor={id}>
          {label}
        </label>
        <input
          type={type}
          className="field__input"
          id={id}
          placeholder=" "
          autoComplete="off"
          value={value}
          onInput={onInput}
        />
      </div>
    </>
  );
};

export default Field;
