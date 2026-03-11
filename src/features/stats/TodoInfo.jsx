import { memo, useContext, useMemo } from 'react';
import { TasksContext } from '@/entities/todo';

const TodoInfo = ({styles}) => {
  const { tasks, deleteAllTasks } = useContext(TasksContext); // useContext возвращает значения, которые мы передали в value провайдера
  const total = tasks.length;
  const hasTasks = total > 0;
  const done = useMemo(
    () => tasks.filter(({ isDone }) => isDone).length,
    [tasks],
  );
  return (
    <div className={styles.info}>
      <div className={styles.totalTasks}>
        Done {done} from {total}
      </div>
      {hasTasks && (
        <button
          onClick={deleteAllTasks}
          className={styles.deleteAllButton}
          type="button"
        >
          Delete all
        </button>
      )}
    </div>
  );
};

export default memo(TodoInfo);
