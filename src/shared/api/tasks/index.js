const URL = 'http://localhost:3001/tasks';

const headers = {
  'Content-Type': 'application/json',
};

const tasksAPI = {
  getAll: () => fetch(URL).then((response) => response.json()),

  getById: (id) => {
    return fetch(`${URL}/${id}`).then((response) => response.json());
  },

  add: (task) => {
    return fetch(URL, {
      method: 'POST',
      headers,
      body: JSON.stringify(task),
    });
  },

  delete: (id) => {
    return fetch(`${URL}/${id}`, {
      method: 'DELETE',
    });
  },

  deleteAll: (tasks) => {
    // Отправляем delete-запрос для каждой задачи
    // Promise.all нужен, когда у тебя есть несколько асинхронных операций, и ты хочешь дождаться, пока все закончатся.
    return Promise.all(tasks.map(({ id }) => tasksAPI.delete(id)));
  },

  toggleComplete: (id, isDone) => {
    return fetch(`${URL}/${id}`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify({ isDone }),
    });
  },
};

export default tasksAPI;
