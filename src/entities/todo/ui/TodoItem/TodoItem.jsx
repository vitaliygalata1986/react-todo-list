import { memo, useContext } from 'react';
import { TasksContext } from '@/entities/todo';

import RouterLink from '@/shared/ui/RouterLink';
import styles from './TodoItem.module.scss';
import { highlightCaseInsensitive } from '@/shared/utils/highlight';

const TodoItem = (props) => {
  const { id, title, isDone } = props;

  const {
    firstIncompleteTaskRef,
    firstIncompleteTaskId,
    deleteTask,
    toggleTaskComplete,
    disappearingTaskId,
    appearingTaskId,
    searchQuery,
  } = useContext(TasksContext);

  // console.log(disappearingTaskId);

  const highlightedTitle = highlightCaseInsensitive(title, searchQuery);

  // применили регулярное выражение, чтобы был регистронез. поиск
  // заменим searchQuery на `<mark>${searchQuery}</mark>`
  // '$&' означает: вставь найденное совпадение целиком

  // console.log(highlightedTitle); // <mark></mark>П<mark></mark>е<mark></mark>р<mark></mark>в<mark></mark>а<mark></mark>я<mark></mark>
  // console.log(title); // Первая
  // console.log(searchQuery); // Когда searchQuery === '', получается примерно так: title.replaceAll('', '<mark></mark>')
  // А замена пустой строки работает между каждым символом и по краям строки тоже. Поэтому и выходит:
  // <mark></mark>П<mark></mark>е<mark></mark>р<mark></mark>в<mark></mark>а<mark></mark>я<mark></mark>

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
      <RouterLink to={`tasks/${id}`} aria-label="Task detail page">
        <span dangerouslySetInnerHTML={{ __html: highlightedTitle }} />
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

/* 
  dangerouslySetInnerHTML - в React вставляет готовый HTML как строку прямо в DOM.
  <span dangerouslySetInnerHTML={{ __html: highlightedTitle }} />
  это значит, что React возьмёт содержимое highlightedTitle и вставит его как HTML, а не как обычный текст.
  Пример:
    const highlightedTitle = 'Learn <mark>React</mark> today';
  тогда в браузере получится:
    <span>Learn <mark>React</mark> today</span>
    и слово React будет реально обёрнуто в тег <mark>.
    Если бы ты написал так:
    <span>{highlightedTitle}</span>
    <span>Learn &lt;mark&gt;React&lt;/mark&gt; today</span>
    то есть тег не сработал бы.

    <mark> браузер по умолчанию красит в жёлтый фон.

    Что происходит:
      если searchQuery пустой, просто возвращаем title как есть
      если searchQuery не пустой, ищем совпадения в title
      каждое найденное совпадение оборачиваем в <mark>...</mark>
      всё остальное остаётся без изменений



      dangerouslySetInnerHTML нужен, чтобы браузер реально обработал наш <mark> как HTML-тег, а не показал его текстом.
      Но раз мы вставляем HTML вручную, появляется риск, что в title или query попадёт что-то опасное. Поэтому перед вставкой мы делаем защиту:
        - разрешаем только наш <mark>
        - весь остальной потенциальный HTML превращаем в обычный текст через escapeHTML
      То есть логика у тебя теперь такая:

        Берём исходный text
        Экранируем опасные HTML-символы:
          < → &lt;
          > → &gt;
          и т.д.
          После этого текст уже безопасен и не сможет вставить чужой HTML
          Потом поверх безопасного текста мы сами добавляем только:  
          <mark>...</mark>
          И уже этот результат отдаём в dangerouslySetInnerHTML

          Пример.
            Если title такой:
              '<img src=x onerror=alert(1)> Первая'
            после escapeHTML станет:
              '&lt;img src=x onerror=alert(1)&gt; Первая'
            то есть это уже просто текст, а не настоящий тег.

    В итоге: мы используем dangerouslySetInnerHTML, чтобы пропускать наш <mark>, но все небезопасные теги заранее экранируем.
  */
