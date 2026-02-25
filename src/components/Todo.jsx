import AddTaskForm from './AddTaskForm';
import SearchTaskForm from './SearchTaskForm';
import TodoInfo from './TodoInfo';
import TodoList from './TodoList';

const Todo = () => {
  const tasks = [
    {
      id: 1,
      title: 'Task 1',
      isDone: false,
    },
    {
      id: 2,
      title: 'Task 2',
      isDone: true,
    },
  ];

  const deleteAllTasks = () => {
    console.log('Delete all clicked');
  };

  const deleteTask = (id) => {
    console.log(`Delete task with id: ${id}`);
  };

  const toggleTaskComplete = (taskId, isDone) => {
    console.log(
      `Toggle complete for task with id: ${taskId} and isDone: ${isDone ? 'completed' : 'not completed'}`,
    );
  };

  const filterTasks = (query) => {
    console.log('Filter tasks' + query);
  };

  const addTask = () => {
    console.log('Task is added');
  };

  return (
    <div className="todo">
      <h1 className="todo__title">To Do List</h1>
      <AddTaskForm addTask={addTask} />
      <SearchTaskForm onSearchInput={filterTasks} />
      <TodoInfo
        total={tasks.length}
        done={tasks.filter(({ isDone }) => isDone).length}
        onDeleteAllButtonClick={deleteAllTasks}
      />
      <TodoList
        tasks={tasks}
        onDeleteTaskButtonClick={deleteTask}
        onToggleTaskCompleteChange={toggleTaskComplete}
      />
    </div>
  );
};

export default Todo;
