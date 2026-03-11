import Todo from '@/widgets/Todo';
import { TasksProvider } from '@/entities/todo';

const TasksPage = () => {
  return (
    <TasksProvider>
      <Todo />
    </TasksProvider>
  );
};

export default TasksPage;
