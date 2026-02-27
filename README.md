# GrowUp — Магазин курсов по саморазвитию

Итоговый проект по курсу **«Фронтенд и бэкенд разработка»** (4 семестр, 2025/2026).  
Объединяет результаты практических занятий **1–5** в единое полнофункциональное веб-приложение — каталог онлайн-курсов по саморазвитию.

---

## Стек технологий

| Слой | Технологии |
|------|------------|
| Фронтенд | React 18, Axios, SASS/SCSS |
| Бэкенд | Node.js, Express.js, nanoid |
| Документация API | Swagger (swagger-jsdoc + swagger-ui-express) |
| Тестирование | Postman |

---

## Связь с практическими занятиями

### Занятие 1 — CSS-препроцессоры (SASS)
Файл: `frontend/src/pages/ProductsPage/ProductsPage.scss`

- **Переменные**: `$bg-dark`, `$accent`, `$border-color`, `$radius-md`, `$font-base` и 15+ других
- **Миксины**: `card($radius)`, `container($w)`, `btn-variant($bg, $border)`, `flex-row($gap, $justify, $align)` — параметризованные блоки стилей
- **Вложенность**: BEM — `.course-card__name`, `.modal__header`, `.header__logo span`, `.filters__btn--active`
- **Условие**: `@if $theme == dark { ... }` — цветовая схема управляется переменной

### Занятие 2 — Сервер на Node.js + Express
Файл: `backend/app.js`

- **5 CRUD-маршрутов**: `POST /api/courses`, `GET /api/courses`, `GET /api/courses/:id`, `PATCH /api/courses/:id`, `DELETE /api/courses/:id`
- **Middleware**: `express.json()`, кастомный логгер запросов, CORS
- **Обработчики**: 404 для неизвестных маршрутов, глобальный 500

### Занятие 3 — JSON и API
Файл: `frontend/src/api/index.js`

- Все данные курсов передаются в формате **JSON**
- `axios.create()` с `baseURL` и автоматическими заголовками
- Проект тестируется через **Postman** — см. раздел ниже

### Занятие 4 — API + React
Файлы: `frontend/src/pages/ProductsPage/`, `frontend/src/components/`

- **React-компоненты**: `CourseCard`, `CourseModal`, `ProductsPage`
- Полный **CRUD через UI**: просмотр, добавление, редактирование, удаление
- **Фильтрация** по категориям
- **CORS** настроен на бэкенде (`npm i cors`)

### Занятие 5 — Расширенный REST API (Swagger)
Файл: `backend/app.js` (JSDoc-аннотации над каждым маршрутом)

- Описана схема **Course** со всеми полями и примером
- Все **5 эндпоинтов** задокументированы: параметры, тело запроса, коды ответов
- Интерактивная документация: **http://localhost:3000/api-docs**

---

## Структура проекта

```
shop-project/
├── backend/
│   ├── app.js              # Express-сервер + Swagger (Занятия 2, 5)
│   └── package.json
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── api/
│   │   │   └── index.js    # Axios-клиент (Занятия 3, 4)
│   │   ├── components/
│   │   │   ├── CourseCard.jsx
│   │   │   └── CourseModal.jsx
│   │   ├── pages/
│   │   │   └── ProductsPage/
│   │   │       ├── ProductsPage.jsx   # Основная страница (Занятие 4)
│   │   │       └── ProductsPage.scss  # SASS-стили (Занятие 1)
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
└── README.md
```

---

## Запуск

### Бэкенд
```bash
cd backend
npm install
npm start
# → http://localhost:3000
# → Swagger: http://localhost:3000/api-docs
```

### Фронтенд
```bash
cd frontend
npm install
npm start
# → http://localhost:3001
```

---

## API эндпоинты

| Метод | Путь | Описание |
|-------|------|----------|
| `GET` | `/api/courses` | Получить все курсы |
| `POST` | `/api/courses` | Создать курс |
| `GET` | `/api/courses/:id` | Получить курс по ID |
| `PATCH` | `/api/courses/:id` | Обновить курс |
| `DELETE` | `/api/courses/:id` | Удалить курс |

### Объект курса (JSON)
```json
{
  "id": "abc123",
  "name": "Медитация для начинающих",
  "category": "Осознанность",
  "description": "Пошаговый курс по освоению базовых техник медитации",
  "author": "Анна Соколова",
  "duration": "4 недели",
  "level": "Новичок",
  "price": 1990,
  "stock": 100
}
```

---

## Тестирование в Postman

1. Запустить бэкенд (`npm start` в папке `backend`)
2. Открыть Postman и создать коллекцию **GrowUp API**
3. Примеры запросов:

**GET все курсы**
```
GET http://localhost:3000/api/courses
```

**POST новый курс**
```
POST http://localhost:3000/api/courses
Content-Type: application/json

{
  "name": "Утренние ритуалы",
  "category": "Здоровье",
  "description": "Как начать день правильно",
  "author": "Тест Автор",
  "duration": "2 недели",
  "level": "Новичок",
  "price": 990,
  "stock": 50
}
```

**PATCH обновить курс**
```
PATCH http://localhost:3000/api/courses/{id}
Content-Type: application/json

{ "price": 1290 }
```

**DELETE удалить курс**
```
DELETE http://localhost:3000/api/courses/{id}
```

---

## Каталог курсов (12 курсов в 7 категориях)

| Категория | Курсы |
|-----------|-------|
| Осознанность | Медитация для начинающих |
| Продуктивность | Тайм-менеджмент GTD, Привычки (Atomic Habits) |
| Финансы | Финансовая грамотность с нуля |
| Коммуникация | Публичные выступления, Нетворкинг |
| Интеллект | Скорочтение и память, Критическое мышление |
| Здоровье | Здоровый сон, Йога и дыхательные практики |
| Психология | Эмоциональный интеллект, Управление стрессом |
