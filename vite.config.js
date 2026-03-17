import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // в mode будет строка с режимом сборки - dev/prod
  const isProd = mode === 'production';
  return {
    base: isProd ? '/react-todo-list/' : '/',
    plugins: [react()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)), // заменяем src на import.meta.url
      },
    },
  };
});

// alias настраивается на уровне сборщика проектов
