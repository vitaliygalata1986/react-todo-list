const Field = ({ className = '', id, label, type = 'text', onSearchInput }) => {
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
          onInput={({ target }) => onSearchInput(target.value)}
        />
      </div>
    </>
  );
};

export default Field;
