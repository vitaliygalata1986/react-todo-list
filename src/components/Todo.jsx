import { useState, useEffect, useRef } from 'react';

import AddTaskForm from './AddTaskForm';
import SearchTaskForm from './SearchTaskForm';
import TodoInfo from './TodoInfo';
import TodoList from './TodoList';
import Button from './Button';

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

  const [newTaskTitle, setNewTaskTitle] = useState('');

  const [searchQuery, setSearchQuery] = useState('');

  const newTaskInputRef = useRef(null);

  const firstIncompleteTaskRef = useRef(null);

  const firstIncompletedTaskId = tasks.find(({ isDone }) => !isDone)?.id; // получим id первой не выполненной таски

  // console.log('firstIncompletedTaskId', firstIncompletedTaskId);

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
    if (newTaskTitle.trim().length > 0) {
      const newTask = {
        id: crypto?.randomUUID() ?? Date.now().toString(), // crypto - встроенный объект в JS
        title: newTaskTitle,
        isDone: false,
      };
      setTasks([...tasks, newTask]);
      setNewTaskTitle('');
      setSearchQuery(''); // это нужно для того, чтобы когда мы 1 ввели что-то в поиск, а потом решили добавить новую задачу - то мы гарантированно увидели ее в списке
      newTaskInputRef.current.focus();
    }

    // console.log('newTaskInputRef', newTaskInputRef); // {current: input#new-task.field__input} - тоесть в свойстве current храниться ссылка на DOM элемент и естественно в этом элементе есть value
  };

  // Этот useEffect выполнится после того, как компонент смонтировался и отрисовался в DOM.
  useEffect(() => {
    /*
    console.log(
      'Сохраняем данные в LocalStorage так как изменился tasks',
      tasks,
    );
    */
    localStorage.setItem('tasks', JSON.stringify(tasks)); // данные в localStorage можно хранить только в виде строк
  }, [tasks]);

  useEffect(() => {
    newTaskInputRef.current.focus(); // реакт сначала отрисует компонент, а только потом выполнит этот код
  }, []);

  const renderCount = useRef(0);

  useEffect(() => {
    renderCount.current++;
    console.log(`Компонент Todo отрендерился ${renderCount.current} раз(а)`);
  }); // нуЖно реагировать на каждый рендер, поэтому зависимость useEffect - пустая, и если мы будем что-то в инбудет вбивать, то счетчик будет увеличиваться, то не будет каждый раз перерендера DOM
  // тоесть useRef помимо того, что может получать доступ к DOM элементу, так же моет хранить какое-то произвольное значение, которое не вызывает перерисовку компонента
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
        newTaskTitle={newTaskTitle}
        setNewTaskTitle={setNewTaskTitle}
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
      <Button
        onClick={() =>
          firstIncompleteTaskRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          })
        }
      >
        Show first incomplete task
      </Button>
      <TodoList
        tasks={tasks}
        filteredTasks={filteredTasks}
        onDeleteTaskButtonClick={deleteTask}
        onToggleTaskCompleteChange={toggleTaskComplete}
        firstIncompleteTaskRef={firstIncompleteTaskRef}
        firstIncompletedTaskId={firstIncompletedTaskId}
      />
    </div>
  );
};

export default Todo;

/*
  Важно: при ленивой инициализации useState(() => ...) tasks уже “правильный” (например 3 таска) на первом рендере, 
  поэтому этот useEffect после монтирования просто сохранит актуальные tasks, без мигания 2→3.
*/

/*
  find() возвращает первый элемент массива, который подходит под условие, и сразу останавливается. То есть ты получишь id самой первой невыполненной задачи по порядку в массиве tasks (сверху списка), а не всех невыполненных.
  Если все задачи выполнены, то find() вернёт undefined, и из-за ?.id результат тоже будет undefined.
*/

/*
  firstIncompleteTaskRef.current?.scrollIntoView({ behavior: 'smooth' })
    firstIncompleteTaskRef.current — ссылка на DOM-элемент первой невыполненной задачи.
    ?. (optional chaining) — если current равен null/undefined (например, все задачи выполнены и ref никуда не привязан), ничего не произойдёт, ошибки не будет.
    scrollIntoView(...) — прокрутит к этому элементу.
    { behavior: 'smooth' } — делает прокрутку плавной, а не мгновенной.
  Дополнительно: у scrollIntoView есть опции выравнивания:
    el.scrollIntoView({ behavior: 'smooth', block: 'start' }) // к верху
    el.scrollIntoView({ behavior: 'smooth', block: 'center' }) // в центр
    el.scrollIntoView({ behavior: 'smooth', block: 'end' }) // к низу
    el.scrollIntoView({ behavior: 'smooth', inline: 'nearest' }) // по горизонтали
*/
