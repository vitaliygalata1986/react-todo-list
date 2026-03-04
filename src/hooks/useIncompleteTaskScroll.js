import { useRef } from 'react';

const useIncompleteTaskScroll = (tasks) => {
  const firstIncompleteTaskRef = useRef(null);
  const firstIncompletedTaskId = tasks.find(({ isDone }) => !isDone)?.id;

  return {
    firstIncompleteTaskRef,
    firstIncompletedTaskId,
  };
};

export default useIncompleteTaskScroll;
