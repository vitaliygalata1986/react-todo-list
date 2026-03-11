import { useEffect, useState } from 'react';

export const useRoute = () => {
  const [path, setPath] = useState(window.location.pathname); // чтобы хранить текущий путь

  useEffect(() => {
    const onLocationChange = () => {
      setPath(window.location.pathname);
    };

    window.addEventListener('popstate', onLocationChange); // следим за изменением URL через историю браузера и обновляем path

    // отловим component Did Unmount, тоесть перед размонтированием компонента из DOM
    return () => {
      window.removeEventListener('popstate', onLocationChange); // отвязем слушатель popstate
    };
  }, []);

  return path; // на каком роуте мы сейчас находимся
};

const Router = (props) => {
  // будем принимать объект с путями

  // console.log('props.routes', props.routes);

  /*
   const routes = {
    '/': TasksPage,
    '/tasks/123': TaskPage,
    '*': () => <div>404 Page not found</div>,
  };
  */

  const { routes } = props; // тоесть тут объект с роутами
  const path = useRoute(); // получим актуальный путь
  // console.log('path', path); // path /

  if (path.startsWith('/tasks/')) {
    // получаем чистый id путем замены на пустую строку
    const id = path.replace('/tasks/', '');
    const TaskPage = routes['/tasks/:id'];
    // console.log('TaskPage', TaskPage);

    // TaskPage будет равно ссылке на компонент, который лежит по ключу '/tasks/:id' в объекте routes.
    // это то же самое, что: const TaskPage = TaskPage;

    return <TaskPage params={id} />;
  }

  const Page = routes[path] ?? routes['*']; // если путь в нашем роутенге не описан - то получим ссылку на компонент 404
  // console.log('Page', Page);

  // routes[path] достаёт ссылку на компонент, например: '/' => TasksPage
  // тогда: Page === TasksPage
  // запись Page для React означает: 'создай элемент из компонента, который лежит в переменной Page'
  // фактически это почти то же самое, что: return React.createElement(Page);

  return <Page />; // будем возвращать константу Page как jsx компонент, так как в этой сущности будет храниться ссылна на компонент опред. страницы
};

export default Router;

// window.location.pathname -> / если главная

/*
    popstate срабатывает, когда у браузера меняется активная запись в истории.
    Когда пользователь нажимает назад / вперед, браузер переключает URL из history stack, и тогда вызывается событие popstate.

    Как это работает:
        был /
        перешли на /about
        нажали Back
        URL снова стал /
        сработал popstate
        setPath(window.location.pathname) обновил state
*/
