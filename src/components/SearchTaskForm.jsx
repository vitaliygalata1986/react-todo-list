import { useContext } from 'react';
import { TaskContext } from '../context/TasksContext';
import Field from './Field';

const SearchTaskForm = () => {
  const { searchQuery, setSearchQuery } = useContext(TaskContext);
  return (
    <form className="todo__form" onSubmit={(e) => e.preventDefault()}>
      <Field
        label="Search task"
        id="search-task"
        className="todo__field"
        type="search"
        value={searchQuery}
        onInput={({ target }) => setSearchQuery(target.value)}
      />
    </form>
  );
};

export default SearchTaskForm;
