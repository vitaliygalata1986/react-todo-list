import styles from './RouterLink.module.scss';

const RouterLink = (props) => {
  const { to, children, ...rest } = props;

  const handleClick = (event) => {
    event.preventDefault();
    // изменим браузерный url без перезагрузки
    window.history.pushState({}, '', to); // {} пустой массив, пустая строка, to нащ адрес
    // вручную генерируем событие popstate, чтобы наш роутер узнал, что наш путь изменился и обновил свое состояние
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <a className={styles.link} href={to} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
};

export default RouterLink;

/*
    зачем нужен window.dispatchEvent(new PopStateEvent('popstate'));
    Он нужен потому, что history.pushState() сам по себе не вызывает событие popstate.
        Что происходит у тебя:
            Пользователь кликает по RouterLink
            Ты делаешь:
        window.history.pushState({}, '', to);
        URL в адресной строке меняется без перезагрузки страницы.

        Но проблема в том, что useRoute() слушает только это:    
        window.addEventListener('popstate', onLocationChange);

        А после pushState() браузер не шлёт popstate автоматически.
            То есть:
            адрес уже изменился
            но onLocationChange не вызвался
            setPath(...) не сработал
            Router не узнал, что путь поменялся
            страница не перерисовалась бы

        Поэтому ты вручную запускаешь событие:

        window.dispatchEvent(new PopStateEvent('popstate'));

        И тогда:

            useRoute получает событие
            вызывает setPath(window.location.pathname)
            path обновляется
            Router заново вычисляет:

        const Page = routes[path] ?? routes['*'];

        и рендерит нужную страницу.
        Именно поэтому строка нужна: она сообщает твоему самописному роутеру, что маршрут изменился.

*/
