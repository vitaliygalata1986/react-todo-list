import Field from './Field';

const SearchTaskForm = ({ onSearchInput }) => {
  return (
    <form className="todo__form" onSubmit={(e) => e.preventDefault()}>
      <Field
        label="Search task"
        id="search-task"
        className="todo__field"
        type="search"
        onSearchInput={onSearchInput}
      />
    </form>
  );
};

export default SearchTaskForm;
