import Todo from './components/Todo';
import { TasksProvider } from './context/TasksContext';

const App = () => {
  return (
    <TasksProvider>
      <Todo />
    </TasksProvider>
  );
};

export default App;

/*
Как Provider используется:
  Дерево становится таким:
    App
  └── TasksProvider
        └── Todo
            └── TodoList
                  └── TodoItem

Теперь любой компонент внутри может получить context          

Смотри: главная причина “лишних” ререндеров с Context — это то, что value={{...}} создаёт новый объект на каждый рендер Provider’а, и тогда все компоненты с useContext(TaskContext) ререндерятся, даже если им не менялось то, что они используют.

*/
