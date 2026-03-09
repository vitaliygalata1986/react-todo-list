import Todo from '../components/Todo';
import { TasksProvider } from '../context/TasksContext';


const TasksPage = () => {


  return (
    <TasksProvider>
      <Todo />
    </TasksProvider>
  );
};

export default TasksPage;
