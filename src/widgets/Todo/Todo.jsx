import { useContext } from 'react';
import { TasksContext } from '@/entities/todo';
import styles from './Todo.module.scss';

import AddTaskForm from '@/features/add-task';
import SearchTaskForm from '@/features/search-task';
import TodoInfo from '@/features/stats';
import { TodoList } from '@/entities/todo';
import Button from '@/shared/ui/Button';

const Todo = () => {
  const { firstIncompleteTaskRef } = useContext(TasksContext);
  return (
    <div className={styles.todo}>
      <h1 className={styles.title}>To Do List</h1>
      <AddTaskForm styles={styles} />
      <SearchTaskForm styles={styles} />
      <TodoInfo styles={styles} />
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
      <TodoList styles={styles} />
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

// хук useCallback() - позволяет запомнить функцию между рендерами, чтобы она не пересоздавалась каждый раз заново

/*
      const memoizedFn = useCallback(()=>{

      },[]) // пока зависимости не изменились - функция остается той же самой ссылкой
*/

/*
  хук useCallback() полезен там, где мы передаем обработчики в дочерние компоненты, обернутые в react memo() 
  Или когда мы работаем с зависимымы эффектами, где важно, чтобы функция была стабильной.
*/

/*
  В компонент передается массив или объект, который пересоздается на каждый рендер.
  Даже если внутри данные теже самые ссылка на массив или объект меняется, и реакт мемо также считает, что пропсы изменились. 
  По итогу компонент все равно ререндерится.
  Пример такого компонента - TodoList.
*/

/*
  Если поиск тасков будет не удачный, то передаваемый в компонент filteredTasks - всякий раз пустой массив,
  таким образом TodoList перезывается у нас каждый раз неоднократно даже когда в этом нет необходимости.
  Тоесть если данные теже самые - ссылка на пустой массив меняется, и react memo() считает, что пропсы изменились. 

  Решение - useMemo(). Цель - стабализация вычисляемых данных, а не стабилизация функций.

*/

//  AddTaskForm и SearchTaskForm оптимизировать ненужно, так как их пропсы стабильны

/*
  Как компонент получает Context
  const { firstIncompleteTaskRef } = useContext(TaskContext);
  useContext делает следующее:

  1 - ищет ближайший TaskContext.Provider выше в дереве
  2 - берет value
  3 - возвращает его

  
*/
