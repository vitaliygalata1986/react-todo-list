const Field = ({
  className = '',
  id,
  label,
  type = 'text',
  value,
  onInput,
  ref,
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
          ref={ref}
        />
      </div>
    </>
  );
};

export default Field;
