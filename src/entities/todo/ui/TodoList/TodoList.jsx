import { memo } from 'react';
import { useContext } from 'react';
import { TasksContext, TodoItem } from '@/entities/todo';

const TodoList = ({ styles }) => {
  const { tasks, filteredTasks } = useContext(TasksContext);

  const hasTatsks = tasks.length > 0;
  const isEmptyFilteredTasks = filteredTasks?.length === 0;

  if (!hasTatsks) {
    return <div className={styles.emptyMessage}>There are no tasks yet</div>;
  }

  if (hasTatsks && isEmptyFilteredTasks) {
    return <div className={styles.emptyMessage}>Tasks not found</div>;
  }

  return (
    <ul className={styles.list}>
      {(filteredTasks ?? tasks).map((task) => (
        <TodoItem key={task.id} {...task} />
      ))}
    </ul>
  );
};

export default memo(TodoList);
