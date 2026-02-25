import Field from './Field';
import Button from './Button';

const AddTaskForm = ({ addTask }) => {
  const onSubmit = (e) => {
    e.preventDefault();
    addTask();
  };
  return (
    <form className="todo__form" onSubmit={onSubmit}>
      <Field label="New task title" id="new-task" className="todo__field" />
      <Button type="submit">Add</Button>
    </form>
  );
};

export default AddTaskForm;
