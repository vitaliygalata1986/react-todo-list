import TodoItem from './TodoItem';

const TodoList = ({
  tasks = [],
  filteredTasks,
  onDeleteTaskButtonClick,
  onToggleTaskCompleteChange,
}) => {

  const hasTatsks = tasks.length > 0;
  const isEmptyFilteredTasks = filteredTasks?.length === 0;
  
  if (!hasTatsks) {
    return <div className="todo__empty-message">There are no tasks yet</div>;
  }

  // если задачи есть, но после фильтраци список задач пуст
  if (hasTatsks && isEmptyFilteredTasks) {
    return <div className="todo__empty-message">Tasks not found</div>;
  }
  return (
    <ul className="todo__list">
      {(filteredTasks ?? tasks).map((task) => (
        <TodoItem
          key={task.id}
          onDeleteTaskButtonClick={onDeleteTaskButtonClick}
          onToggleTaskCompleteChange={onToggleTaskCompleteChange}
          {...task}
        />
      ))}
    </ul>
  );
};

export default TodoList;
