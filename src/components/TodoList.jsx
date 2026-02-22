import TodoItem from './TodoItem';

const TodoList = () => {
  const hasTatsks = true;
  if (!hasTatsks) {
    return <div className="todo__empty-message"></div>;
  }
  return (
    <ul className="todo__list">
      <TodoItem />
      <TodoItem />
    </ul>
  );
};

export default TodoList;
