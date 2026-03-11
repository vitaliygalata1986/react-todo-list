export {  TasksContext, TasksProvider } from './model/TasksContext';
export { default as TodoItem } from './ui/TodoItem';
export { default as TodoList } from './ui/TodoList';


// todo в папке entities это бизнес сущность "Задача"
// default as — это переименование default-экспорта в именованный экспорт

/*
    означает:
        возьми default export из файла ./ui/TodoItem
        и наружу экспортируй его под именем TodoItem

    Более развёрнуто это то же самое, что:
        import TodoItem from './ui/TodoItem';
        export { TodoItem };

    То есть:
        в файле ./ui/TodoItem есть export default ...
        ты его забираешь
        и переэкспортируешь уже как именованный
* */