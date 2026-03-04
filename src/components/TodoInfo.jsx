import { memo, useContext, useMemo } from 'react';
import { TaskContext } from '../context/TasksContext';

const TodoInfo = () => {
  const { tasks, deleteAllTasks } = useContext(TaskContext); // useContext возвращает значения, которые мы передали в value провайдера
  const total = tasks.length;
  const hasTasks = total > 0;
  const done = useMemo(
    () => tasks.filter(({ isDone }) => isDone).length,
    [tasks],
  );
  console.log('TodoInfo');
  return (
    <div className="todo__info">
      <div className="todo__total-tasks">
        Done {done} from {total}
      </div>
      {hasTasks && (
        <button
          onClick={deleteAllTasks}
          className="todo__delete-all-button"
          type="button"
        >
          Delete all
        </button>
      )}
    </div>
  );
};

export default memo(TodoInfo);
