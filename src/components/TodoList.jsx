import TodoItem from './TodoItem';

const TodoList = ({
  tasks = [],
  onDeleteTaskButtonClick,
  onToggleTaskCompleteChange,
}) => {
  const hasTatsks = true;
  if (!hasTatsks) {
    return <div className="todo__empty-message"></div>;
  }
  return (
    <ul className="todo__list">
      {tasks.map((task) => (
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
