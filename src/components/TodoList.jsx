import { memo } from 'react';
import { useContext } from 'react';
import { TaskContext } from '../context/TasksContext';
import TodoItem from './TodoItem';

const TodoList = () => {
  const { tasks, filteredTasks } = useContext(TaskContext);

  const hasTatsks = tasks.length > 0;
  const isEmptyFilteredTasks = filteredTasks?.length === 0;

  if (!hasTatsks) {
    return <div className="todo__empty-message">There are no tasks yet</div>;
  }

  if (hasTatsks && isEmptyFilteredTasks) {
    return <div className="todo__empty-message">Tasks not found</div>;
  }

  return (
    <ul className="todo__list">
      {(filteredTasks ?? tasks).map((task) => (
        <TodoItem key={task.id} {...task} />
      ))}
    </ul>
  );
};

export default memo(TodoList);
