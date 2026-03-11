import tasksAPI from "@/shared/api/tasks/index.js";

import { useEffect, useState } from 'react';

const TaskPage = ({params}) => {

  const taskId = params;
  const [task, setTask] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    tasksAPI
      .getById(taskId)
      .then((taskData) => {
        setTask(taskData);
        setHasError(false);
      })
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (hasError) {
    return <div>Task not found</div>;
  }
  return (
    <div>
      <h1>{task.title}</h1>
      <p>{task.isDone ? 'Task is complete' : 'Not complete'}</p>
    </div>
  );
};

export default TaskPage;
