import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import {fileURLToPath, URL} from 'node:url';

// https://vite.dev/config/
export default defineConfig(({mode}) => {
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

/*
  Как Vite понимает режим:
    • npm run dev / vite -> mode === 'development'
    • npm run build / vite build -> mode === 'production'
    • можно явно задать: vite build --mode staging -> mode === 'staging'
    Поэтому строка
      const isProd = mode === 'production';
      означает: "если сборка запущена в production-режиме, isProd будет true".
* */
