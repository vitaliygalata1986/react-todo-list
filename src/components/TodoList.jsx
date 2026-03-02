import TodoItem from './TodoItem';

const TodoList = ({
  tasks = [],
  filteredTasks,
  onDeleteTaskButtonClick,
  onToggleTaskCompleteChange,
  firstIncompleteTaskRef,
  firstIncompletedTaskId,
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
          ref={
            task.id === firstIncompletedTaskId ? firstIncompleteTaskRef : null
          }
          onDeleteTaskButtonClick={onDeleteTaskButtonClick}
          onToggleTaskCompleteChange={onToggleTaskCompleteChange}
          {...task}
        />
      ))}
    </ul>
  );
};

export default TodoList;

/*
   ref={
         task.id === firstIncompletedTaskId ? firstIncompleteTaskRef : null
       } 
   если id перебираемой задачи совпало с firstIncompletedTaskId, то в ref запишем firstIncompleteTaskRef 
*/
