import { useState, useEffect, useRef } from 'react';

import AddTaskForm from './AddTaskForm';
import SearchTaskForm from './SearchTaskForm';
import TodoInfo from './TodoInfo';
import TodoList from './TodoList';

const Todo = () => {
  // 1 - этот нижний код выполняется до момента первого рендера
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      return JSON.parse(savedTasks);
    }
    return [
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
  });

  // const [newTaskTitle, setNewTaskTitle] = useState('');

  const newTaskInputRef = useRef(null);

  // console.log('newTaskInputRef', newTaskInputRef); // {current: null} null мы указали в качестве начального значения в useRef(null)

  const [searchQuery, setSearchQuery] = useState('');

  const deleteAllTasks = () => {
    const isConfirmed = confirm('Are you sure you want to delete all?');
    if (isConfirmed) setTasks([]);
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId)); // фильтр возвращает результат нового массива, а не мутирует исходный
  };

  const toggleTaskComplete = (taskId, isDone) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === taskId) {
          return {
            ...task,
            isDone,
          };
        }
        return task;
      }),
    );
  };

  const addTask = () => {
    const newTaskTitle = newTaskInputRef.current.value;
    if (newTaskTitle.trim().length > 0) {
      const newTask = {
        id: crypto?.randomUUID() ?? Date.now().toString(), // crypto - встроенный объект в JS
        title: newTaskTitle,
        isDone: false,
      };
      setTasks([...tasks, newTask]);
      // setNewTaskTitle('');
      newTaskInputRef.current.value = '';
      setSearchQuery(''); // это нужно для того, чтобы когда мы 1 ввели что-то в поиск, а потом решили добавить новую задачу - то мы гарантированно увидели ее в списке
    }

    // console.log('newTaskInputRef', newTaskInputRef); // {current: input#new-task.field__input} - тоесть в свойстве current храниться ссылка на DOM элемент и естественно в этом элементе есть value
  };

  // Этот useEffect выполнится после того, как компонент смонтировался и отрисовался в DOM.
  useEffect(() => {
    console.log(
      'Сохраняем данные в LocalStorage так как изменился tasks',
      tasks,
    );
    localStorage.setItem('tasks', JSON.stringify(tasks)); // данные в localStorage можно хранить только в виде строк
  }, [tasks]);

  const clearSearchQuery = searchQuery.trim().toLowerCase();

  const filteredTasks =
    clearSearchQuery.length > 0
      ? tasks.filter(({ title }) =>
          title.toLowerCase().includes(clearSearchQuery),
        )
      : null;

  return (
    <div className="todo">
      <h1 className="todo__title">To Do List</h1>
      <AddTaskForm
        addTask={addTask}
        newTaskInputRef={newTaskInputRef}
        // newTaskTitle={newTaskTitle}
        // setNewTaskTitle={setNewTaskTitle}
      />
      <SearchTaskForm
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <TodoInfo
        total={tasks.length}
        done={tasks.filter(({ isDone }) => isDone).length}
        onDeleteAllButtonClick={deleteAllTasks}
      />
      <TodoList
        tasks={tasks}
        filteredTasks={filteredTasks}
        onDeleteTaskButtonClick={deleteTask}
        onToggleTaskCompleteChange={toggleTaskComplete}
      />
    </div>
  );
};

export default Todo;

/*
  Важно: при ленивой инициализации useState(() => ...) tasks уже “правильный” (например 3 таска) на первом рендере, 
  поэтому этот useEffect после монтирования просто сохранит актуальные tasks, без мигания 2→3.
*/
