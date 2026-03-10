import { useContext, useState } from 'react';
import { TaskContext } from '../../context/TasksContext';
import Field from '../Field/Field';
import Button from '../Button/Button';

const AddTaskForm = ({styles}) => {
  const { addTask, newTaskInputRef, newTaskTitle, setNewTaskTitle } =
    useContext(TaskContext);

  const [error, setError] = useState('');

  const clearNewTasktitle = newTaskTitle.trim();
  const isNewTaskTitleEmpty = clearNewTasktitle.length === 0;

  const onSubmit = (e) => {
    e.preventDefault();
    // будем вызывать addTask при условии, что новая задача не пуста
    if (!isNewTaskTitleEmpty) addTask(clearNewTasktitle);
  };

  const onInput = (event) => {
    const { value } = event.target;
    const clearValue = value.trim();
    // console.log('clearValue', clearValue); // 0 если вбивать n - кол. пробелов
    // console.log('value.length', value.length); // 1 если вбить один пробел
    const hasOnlySpaces = value.length > 0 && clearValue.length === 0;
    // чтобы понять, что введеное значение не пустое, и содержит только пробелы нужно два условия
    // тоесть пользователь ввел в инпут минимум один символ и в качестве значения ничего кроме пробела ничего нет

    setNewTaskTitle(value);

    setError(hasOnlySpaces ? 'The task cannot be empty' : '');
  };

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <Field
        value={newTaskTitle}
        label="New task title"
        id="new-task"
        className={styles.field}
        onInput={onInput}
        ref={newTaskInputRef}
        error={error}
      />
      <Button isDisabled={isNewTaskTitleEmpty} type="submit">
        Add
      </Button>
    </form>
  );
};

export default AddTaskForm;
