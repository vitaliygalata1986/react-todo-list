import {
  useState,
  useRef,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
} from 'react';
import tasksAPI from '@/shared/api/tasks/index.js';

const tasksReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ALL': {
      return Array.isArray(action.tasks) ? action.tasks : state; // если входные данные массив, то берем их
    }
    case 'ADD': {
      return [...state, action.task];
    }
    case 'TOGGLE_COMPLETE': {
      // console.log(action); // {type: 'TOGGLE_COMPLETE', id: '5f46', isDone: true}
      const { id, isDone } = action;

      return state.map((task) => {
        return task.id === id ? { ...task, isDone } : task;
      });
    }

    case 'DELETE': {
      return state.filter((task) => task.id !== action.id);
    }
    case 'DELETE_ALL': {
      return [];
    }
    default: {
      return state;
    }
  }
};

const useTasks = () => {
  const [tasks, dispatch] = useReducer(tasksReducer, []); // tasksReducer - ссылка на фукцию редюсер с которой будет работать хук

  const [newTaskTitle, setNewTaskTitle] = useState('');

  const [searchQuery, setSearchQuery] = useState('');

  const [disappearingTaskId, setDisappearingTaskId] = useState(null); // для id-шка исчезающей задачи

  const [appearingTaskId, setAppearingTaskId] = useState(null);

  const newTaskInputRef = useRef(null);

  const deleteAllTasks = useCallback(() => {
    const isConfirmed = confirm('Are you sure you want to delete all?');
    if (isConfirmed) {
      tasksAPI.deleteAll(tasks).then(() => dispatch({ type: 'DELETE_ALL' }));
    }
  }, [tasks]);

  const deleteTask = useCallback((taskId) => {
    tasksAPI.delete(taskId).then(() => {
      // сначала ждем успешного ответа от сервера
      setDisappearingTaskId(taskId); // запишем id удаляемой задачи - так запустим анимацию удаления
      setTimeout(() => {
        dispatch({ type: 'DELETE', id: taskId });
        setDisappearingTaskId(null);
      }, 400);
    });
  }, []);

  const toggleTaskComplete = useCallback((taskId, isDone) => {
    tasksAPI
      .toggleComplete(taskId, isDone)
      .then(() => dispatch({ type: 'TOGGLE_COMPLETE', id: taskId, isDone }));
  }, []);

  const addTask = useCallback((title) => {
    const newTask = {
      // id передавать ненужно, так как сам сервер его добавлеят
      title,
      isDone: false,
    };

    tasksAPI
      .add(newTask)
      .then((response) => response.json())
      .then((addedTask) => {
        dispatch({ type: 'ADD', task: addedTask });
        setNewTaskTitle('');
        setSearchQuery('');
        newTaskInputRef.current.focus();
        setAppearingTaskId(addedTask.id);
        setTimeout(() => {
          setAppearingTaskId(null);
        }, 400);
      });
  }, []);

  useEffect(() => {
    newTaskInputRef.current.focus();
    // сделаем запрос к серверу, когда компонент useTasks смонтируется в DOM

    tasksAPI
      .getAll()
      .then((serverTasks) => dispatch({ type: 'SET_ALL', tasks: serverTasks })); // сразу установим в массив то, что вернул сервер // сразу установим в массив то, что вернул сервер)
  }, []);

  const filteredTasks = useMemo(() => {
    const clearSearchQuery = searchQuery.trim().toLowerCase();
    return clearSearchQuery.length > 0
      ? tasks.filter(({ title }) =>
          title.toLowerCase().includes(clearSearchQuery),
        )
      : null;
  }, [searchQuery, tasks]);

  return {
    tasks,
    filteredTasks,
    deleteTask,
    deleteAllTasks,
    toggleTaskComplete,
    newTaskTitle,
    setNewTaskTitle,
    searchQuery,
    setSearchQuery,
    newTaskInputRef,
    addTask,
    disappearingTaskId,
    appearingTaskId,
  };
};

export default useTasks;
