# React Todo List

Приложение для управления задачами, созданное на `React` с архитектурой `Feature-Sliced Design (FSD)`.
Проект включает добавление, удаление, поиск и просмотр задач, а также отдельную страницу детали задачи.

## Что реализовано

- Добавление новой задачи
- Удаление одной задачи и удаление всех задач
- Переключение статуса выполнения
- Поиск задач по названию
- Отображение статистики по задачам
- Переход на отдельную страницу задачи
- Прокрутка к первой невыполненной задаче
- Поддержка двух источников данных: `json-server` и `localStorage`

## Технологии

Этот проект построен с использованием:

- React 19
- Vite
- JavaScript (ES Modules)
- Context API
- useReducer, useMemo, useCallback, useEffect, useState, useRef
- Fetch API
- Sass / SCSS Modules
- ESLint
- JSON Server
- GitHub Pages

## Архитектура

В проекте используется подход `Feature-Sliced Design (FSD)`.

Структура приложения разделена на слои:

- `app` — инициализация приложения, роутинг, глобальные стили
- `pages` — страницы приложения
- `widgets` — крупные UI-блоки
- `features` — пользовательские сценарии, например добавление и поиск задач
- `entities` — бизнес-сущности приложения, в данном случае `todo`
- `shared` — переиспользуемые UI-компоненты, утилиты, API, константы и ассеты

## Особенности реализации

- Используется кастомный клиентский роутер вместо `react-router-dom`
- Состояние задач организовано через `Context API` и `useReducer`
- В production-сборке данные могут храниться в `localStorage`
- В development-режиме можно работать через `json-server`
- Для удобства импорта настроен alias `@` на папку `src`

## Работа с данными

Проект поддерживает 2 режима:

- `json-server` для локальной разработки
- `localStorage` для статического production-деплоя

В файле `.env.production` используется:

```env
VITE_STATIC_BACKEND=true
```

Это означает, что в production приложение работает без отдельного backend-сервера.

## Установка и запуск

Установить зависимости:

```bash
npm install
```

Запустить mock API:

```bash
npm run server
```

Запустить проект в development-режиме:

```bash
npm run dev
```

## Доступные команды

```bash
npm run dev
npm run server
npm run build
npm run preview
npm run deploy
```

## Деплой

Проект подготовлен для деплоя на `GitHub Pages`.

Live demo:

[https://vitaliygalata1986.github.io/react-todo-list/](https://vitaliygalata1986.github.io/react-todo-list/)
