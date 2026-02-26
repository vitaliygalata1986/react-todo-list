import Field from './Field';
import Button from './Button';

const AddTaskForm = ({ addTask, newTaskTitle, setNewTaskTitle }) => {
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
      />
      <Button type="submit">Add</Button>
    </form>
  );
};

export default AddTaskForm;
