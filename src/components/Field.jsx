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
      <div className={`field ${className}`}>
        <label className="field__label" htmlFor={id}>
          {label}
        </label>
        <input
          type={type}
          className={`field__input ${error ? 'isInvalid' : ''}`}
          id={id}
          placeholder=" "
          autoComplete="off"
          value={value}
          onInput={onInput}
          ref={ref}
        />
        {error && (
          <span className="field__error" title={error}>
            {error}
          </span>
        )}
      </div>
    </>
  );
};

export default Field;
