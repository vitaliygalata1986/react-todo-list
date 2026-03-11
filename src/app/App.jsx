import Router from './routing';
import TaskPage from '@/pages/TaskPage';
import TasksPage from '@/pages/TasksPage';
import './styles';

const App = () => {
  const routes = {
    '/': TasksPage,
    '/tasks/:id': TaskPage,
    '*': () => <div>404 Page not found</div>,
  };

  return <Router routes={routes} />;
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
