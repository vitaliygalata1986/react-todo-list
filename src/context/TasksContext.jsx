import {
  createContext,
  useState,
  useRef,
  useCallback,
  useEffect,
  useMemo,
} from 'react';

export const TaskContext = createContext({});

// Этот компонент оборачивает приложение.
export const TasksProvider = (props) => {
  const { children } = props;

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

  const firstIncompletedTaskId = tasks.find(({ isDone }) => !isDone)?.id;

  const deleteAllTasks = useCallback(() => {
    const isConfirmed = confirm('Are you sure you want to delete all?');
    if (isConfirmed) setTasks([]);
  }, []);

  const deleteTask = useCallback(
    (taskId) => {
      setTasks(tasks.filter((task) => task.id !== taskId));
    },
    [tasks],
  );

  const toggleTaskComplete = useCallback(
    (taskId, isDone) => {
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
    },
    [tasks],
  );

  const addTask = useCallback(() => {
    if (newTaskTitle.trim().length > 0) {
      const newTask = {
        id: crypto?.randomUUID() ?? Date.now().toString(),
        title: newTaskTitle,
        isDone: false,
      };
      setTasks((prevTasks) => [...prevTasks, newTask]);
      setNewTaskTitle('');
      setSearchQuery('');
      newTaskInputRef.current.focus();
    }
  }, [newTaskTitle]);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    newTaskInputRef.current.focus();
  }, []);

  const filteredTasks = useMemo(() => {
    const clearSearchQuery = searchQuery.trim().toLowerCase();
    return clearSearchQuery.length > 0
      ? tasks.filter(({ title }) =>
          title.toLowerCase().includes(clearSearchQuery),
        )
      : null;
  }, [searchQuery, tasks]);

  // Provider говорит React: Все компоненты внутри меня могут получить эти данные

  const contextValue = useMemo(
    () => ({
      tasks,
      filteredTasks,
      firstIncompleteTaskRef,
      firstIncompletedTaskId,
      deleteTask,
      deleteAllTasks,
      toggleTaskComplete,

      newTaskTitle,
      setNewTaskTitle,
      searchQuery,
      setSearchQuery,
      newTaskInputRef,
      addTask,
    }),
    [
      tasks,
      filteredTasks,
      firstIncompletedTaskId,
      deleteTask,
      deleteAllTasks,
      toggleTaskComplete,
      newTaskTitle,
      searchQuery,
      addTask,
    ],
  );

  return (
    <TaskContext.Provider value={contextValue}>{children}</TaskContext.Provider>
  );
};

/*
  Что именно передается в Context
    value={{
      tasks,
      filteredTasks,
      firstIncompleteTaskRef,
      firstIncompletedTaskId,
      deleteTask,
      deleteAllTasks,
      toggleTaskComplete,
      newTaskTitle,
      setNewTaskTitle,
      searchQuery,
      setSearchQuery,
      newTaskInputRef,
      addTask,
    }}
  Это глобальное состояние приложения.   
  
    Как React обновляет Context
    Когда меняется tasks:
    setTasks(...)

    происходит:
            ↓
    Provider value обновился
            ↓
    ВСЕ useContext(TaskContext) получают новое значение
            ↓
    эти компоненты ререндерятся

    Важно:
      React перерендерит только те компоненты, которые используют этот context.
    
      
    Визуально как работает твой код

    TasksProvider
      │
      ├── tasks state
      ├── search state
      ├── refs
      ├── functions
      │
      └── Provider
          │
          ▼
        Todo
          │
          ├── AddTaskForm
          ├── SearchTaskForm
          ├── TodoInfo
          └── TodoList

  Любой компонент может написать:
    const { tasks } = useContext(TaskContext)
  и получить данные.
*/
