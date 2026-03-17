import localAPI from './local';

import serverAPI from './server';

const isLocal = import.meta.env.VITE_STATIC_BACKEND === 'true'

const tasksAPI = isLocal ? localAPI : serverAPI

export default tasksAPI


/*
    Если ты запускаешь локально npm run dev, это влияет на mode = 'development', но isLocal зависит не от этого, а от значения VITE_STATIC_BACKEND.
    То есть:
        const isLocal = import.meta.env.VITE_STATIC_BACKEND === 'true'
        будет true только если Vite подхватил: VITE_STATIC_BACKEND=true

    При локальном запуске Vite обычно читает:
    •.env
    •.env.local
    •.env.development
    •.env.development.local

    При production build:
    •.env
    •.env.production
    •.env.production.local

    Итого: локальный запуск сам по себе не делает localAPI = true. Это будет только если в dev-env файлах у тебя VITE_STATIC_BACKEND=true.
    Если хочешь, могу быстро посмотреть в проекте, из какого .env у тебя это сейчас берётся.

* */