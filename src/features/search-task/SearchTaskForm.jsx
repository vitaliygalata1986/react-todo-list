import { useContext } from 'react';
import { TasksContext } from '@/entities/todo';
import Field from '@/shared/ui/Field';

const SearchTaskForm = ({styles}) => {
  const { searchQuery, setSearchQuery } = useContext(TasksContext);
  return (
    <form className="todo__form" onSubmit={(e) => e.preventDefault()}>
      <Field
        label="Search task"
        id="search-task"
        className={styles.field}
        type="search"
        value={searchQuery}
        onInput={({ target }) => setSearchQuery(target.value)}
      />
    </form>
  );
};

export default SearchTaskForm;
