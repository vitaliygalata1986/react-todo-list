// функция для объединения рефов
const useCombinedRefs = (...refs) => {
  // console.log(refs); // {current: li.todoItem}
  return (node) => {
    refs.forEach((ref) => {
      if (!ref) {
        return;
      }
      if (typeof ref === 'function') {
        // если ref это функция
        ref(node);
      } else {
        // иначе ref - это объект, тоесть то, что вернул useRef
        ref.current = node;
      }
    });
  };
};

export default useCombinedRefs;

/*
  Зачем нужна проверка на function ref
  В React ref бывает двух типов:
  1. Object ref
  2. Callback ref
*/
