import { useContext } from 'react';
import { TaskContext } from '../context/TasksContext';
import Field from './Field';
import Button from './Button';

const AddTaskForm = () => {
  const { addTask, newTaskInputRef, newTaskTitle, setNewTaskTitle } =
    useContext(TaskContext);

  const onSubmit = (e) => {
    e.preventDefault();
    addTask();
  };
  return (
    <form className="todo__form" onSubmit={onSubmit}>
      <Field
        value={newTaskTitle}
        label="New task title"
        id="new-task"
        className="todo__field"
        onInput={(event) => setNewTaskTitle(event.target.value)}
        ref={newTaskInputRef}
      />
      <Button type="submit">Add</Button>
    </form>
  );
};

export default AddTaskForm;
