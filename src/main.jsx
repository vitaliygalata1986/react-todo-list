import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from '@/app';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

/*
  import App from './app';  при импорте папки ищет в ней entry-файл по умолчанию

  означает примерно следующее:  import App from './app/index.js';

  А внутри src/app/index.js у тебя: export { default } from './App';
  То есть папка app говорит: “мой публичный экспорт по умолчанию лежит в ./App”.

  В итоге цепочка такая:
  import App from './app';

  → Vite/JS смотрит в папку app
  → находит app/index.js
  → видит export { default } from './App';
  → берёт default export из App.jsx
  → присваивает его переменной App

  То есть это работает не магией, а из-за правила резолва модулей:
    если импортируешь путь до файла — берётся файл
    если импортируешь путь до папки — ищется index.js / index.jsx / index.ts и т.д.

*/
