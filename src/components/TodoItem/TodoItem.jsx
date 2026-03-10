import { memo, useContext, useRef } from 'react';
import { TaskContext } from '../../context/TasksContext';
import RouterLink from '../RouterLink/RouterLink';
import styles from './TodoItem.module.scss';

const TodoItem = (props) => {
  const { id, title, isDone } = props;

  const {
    firstIncompleteTaskRef,
    firstIncompleteTaskId,
    deleteTask,
    toggleTaskComplete,
    disappearingTaskId,
    appearingTaskId,
  } = useContext(TaskContext);

  // console.log(disappearingTaskId);

  return (
    <li
      className={`${styles.todoItem}  
      ${disappearingTaskId === id ? styles.isDisappearing : ''} 
      ${appearingTaskId === id ? styles.isAppearing : ''}`}
      ref={id === firstIncompleteTaskId ? firstIncompleteTaskRef : null}
    >
      <input
        className={styles.checkbox}
        id={id}
        type="checkbox"
        checked={isDone}
        onChange={({ target }) => {
          toggleTaskComplete(id, target.checked);
        }}
      />
      <label className={`${styles.label} visually-hidden`} htmlFor={id}>
        {title}
      </label>
      <RouterLink to={`/tasks/${id}`} aria-label="Task detail page">
        {title}
      </RouterLink>
      <button
        className={styles.deleteButton}
        aria-label="Delete"
        title="Delete"
        onClick={() => deleteTask(id)}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15 5L5 15M5 5L15 15"
            stroke="#757575"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </li>
  );
};

export default memo(TodoItem);

/*
  useCombinedRefs нужен, когда одному и тому же DOM-элементу надо передать несколько ref одновременно.
  То есть у одного li сразу 2 рефа: 
    firstIncompleteTaskRef — чтобы где-то снаружи получить доступ к первой невыполненной задаче 
    animationRef — чтобы локально внутри компонента работать с этим же li, например для анимации
  
    useCombinedRefs() принимает сколько угодно рефов: useCombinedRefs(ref1, ref2, ref3)
    и возвращает одну callback-функцию, которую React вызывает, когда привязывает DOM-элемент к ref.
    То есть вот это:
    ref={combinedRef}
    по сути означает:
    ref={(node) => {
      // React сюда передаст li
    }}

    Что такое node
    Когда <li> смонтировался, React вызовет:
    combinedRef(liElement)
    Где liElement — это реальный DOM-элемент <li>.
    Когда элемент удаляется, React обычно вызовет:
    combinedRef(null) чтобы очистить refs.

    Внутри:
    refs.forEach((ref) => {
      if (!ref) return;

      if (typeof ref === 'function') {
        ref(node);
      } else {
        ref.current = node;
      }
    });
    Значит будет:
    firstIncompleteTaskRef.current = liNode;
    animationRef.current = liNode;
    И оба рефа теперь указывают на один и тот же <li>.

    Если это не первая невыполненная задача, то в хук придёт:
    useCombinedRefs(null, animationRef)
    Тогда цикл просто пропустит null, и останется только:

    animationRef.current = liNode;


    useRef(null)
      ↓
      animationRef.current === null
      ↓
      React смонтировал <li>
      ↓
      combinedRef(liNode)
      ↓
      animationRef.current === liNode

*/
