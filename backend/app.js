const express = require('express');
const cors = require('cors');
const { nanoid } = require('nanoid');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
const port = 3000;

// ── Middleware ──────────────────────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors({
  origin: 'http://localhost:3001',
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Логирование запросов (Занятие 4)
app.use((req, res, next) => {
  res.on('finish', () => {
    console.log(`[${new Date().toISOString()}] [${req.method}] ${res.statusCode} ${req.path}`);
    if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
      console.log('Body:', req.body);
    }
  });
  next();
});

// ── Данные: курсы по саморазвитию (12 курсов, 7 категорий) ────────────────
let courses = [
  {
    id: nanoid(6),
    name: 'Медитация для начинающих',
    category: 'Осознанность',
    description: 'Пошаговый курс по освоению базовых техник медитации и осознанного дыхания. Снизьте уровень стресса и научитесь жить в настоящем моменте.',
    author: 'Анна Соколова',
    duration: '4 недели',
    level: 'Новичок',
    price: 1990,
    stock: 100,
  },
  {
    id: nanoid(6),
    name: 'Тайм-менеджмент: система GTD',
    category: 'Продуктивность',
    description: 'Освойте систему Getting Things Done от Дэвида Аллена. Научитесь планировать, расставлять приоритеты и доводить дела до конца без стресса.',
    author: 'Иван Петров',
    duration: '3 недели',
    level: 'Средний',
    price: 2490,
    stock: 80,
  },
  {
    id: nanoid(6),
    name: 'Финансовая грамотность с нуля',
    category: 'Финансы',
    description: 'Как управлять личным бюджетом, создать финансовую подушку безопасности и начать инвестировать. Практические инструменты для каждого.',
    author: 'Дмитрий Краснов',
    duration: '6 недель',
    level: 'Новичок',
    price: 3490,
    stock: 60,
  },
  {
    id: nanoid(6),
    name: 'Публичные выступления без страха',
    category: 'Коммуникация',
    description: 'Избавьтесь от страха сцены и научитесь уверенно выступать перед любой аудиторией. Включает видеоразборы, практику и обратную связь.',
    author: 'Мария Белова',
    duration: '5 недель',
    level: 'Средний',
    price: 2990,
    stock: 45,
  },
  {
    id: nanoid(6),
    name: 'Скорочтение и развитие памяти',
    category: 'Интеллект',
    description: 'Увеличьте скорость чтения в 3 раза и улучшите запоминание информации с помощью проверенных мнемотехник и ментальных карт.',
    author: 'Алексей Громов',
    duration: '4 недели',
    level: 'Новичок',
    price: 1490,
    stock: 120,
  },
  {
    id: nanoid(6),
    name: 'Здоровый сон и восстановление',
    category: 'Здоровье',
    description: 'Научитесь засыпать быстро, высыпаться за 7 часов и просыпаться с энергией. Разбор циркадных ритмов, вечерних ритуалов и гигиены сна.',
    author: 'Ольга Тихонова',
    duration: '2 недели',
    level: 'Новичок',
    price: 990,
    stock: 150,
  },
  {
    id: nanoid(6),
    name: 'Эмоциональный интеллект (EQ)',
    category: 'Психология',
    description: 'Развивайте способность понимать собственные эмоции и управлять ими. Улучшите отношения с людьми и научитесь выходить из конфликтов.',
    author: 'Наталья Орлова',
    duration: '6 недель',
    level: 'Средний',
    price: 3990,
    stock: 55,
  },
  {
    id: nanoid(6),
    name: 'Привычки: система Atomic Habits',
    category: 'Продуктивность',
    description: 'Практический курс по книге Джеймса Клира. Как создавать полезные привычки и избавляться от вредных с помощью маленьких, но системных изменений.',
    author: 'Сергей Волков',
    duration: '3 недели',
    level: 'Новичок',
    price: 1790,
    stock: 90,
  },
  {
    id: nanoid(6),
    name: 'Нетворкинг и деловые связи',
    category: 'Коммуникация',
    description: 'Как знакомиться с нужными людьми, поддерживать отношения и монетизировать своё окружение. Реальные скрипты и техники для интровертов и экстравертов.',
    author: 'Павел Кузнецов',
    duration: '4 недели',
    level: 'Средний',
    price: 2790,
    stock: 40,
  },
  {
    id: nanoid(6),
    name: 'Йога и дыхательные практики',
    category: 'Здоровье',
    description: 'Комплекс утренних йога-практик и техник пранаямы для заряда энергией на весь день. Подходит для начинающих — никакой подготовки не нужно.',
    author: 'Екатерина Лисова',
    duration: '8 недель',
    level: 'Новичок',
    price: 2290,
    stock: 70,
  },
  {
    id: nanoid(6),
    name: 'Критическое мышление и логика',
    category: 'Интеллект',
    description: 'Учитесь замечать манипуляции, когнитивные искажения и ложные аргументы. Принимайте взвешенные решения в условиях информационного шума.',
    author: 'Роман Захаров',
    duration: '5 недель',
    level: 'Продвинутый',
    price: 3290,
    stock: 35,
  },
  {
    id: nanoid(6),
    name: 'Управление стрессом и выгоранием',
    category: 'Психология',
    description: 'Диагностика выгорания, инструменты восстановления и профилактики. Как выстроить баланс между работой и жизнью и не потерять себя.',
    author: 'Людмила Иванова',
    duration: '4 недели',
    level: 'Средний',
    price: 2590,
    stock: 65,
  },
];

// ── Swagger (Занятие 5) ────────────────────────────────────────────────────
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API магазина курсов по саморазвитию',
      version: '1.0.0',
      description: 'REST API для управления каталогом курсов. Реализованы все CRUD-операции.',
    },
    servers: [{ url: `http://localhost:${port}`, description: 'Локальный сервер' }],
  },
  apis: ['./app.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ── Схема Swagger ──────────────────────────────────────────────────────────
/**
 * @swagger
 * components:
 *   schemas:
 *     Course:
 *       type: object
 *       required:
 *         - name
 *         - category
 *         - description
 *         - author
 *         - duration
 *         - level
 *         - price
 *         - stock
 *       properties:
 *         id:
 *           type: string
 *           description: Автоматически сгенерированный уникальный ID курса
 *         name:
 *           type: string
 *           description: Название курса
 *         category:
 *           type: string
 *           description: Категория курса
 *         description:
 *           type: string
 *           description: Описание курса
 *         author:
 *           type: string
 *           description: Автор курса
 *         duration:
 *           type: string
 *           description: Продолжительность курса
 *         level:
 *           type: string
 *           description: Уровень сложности
 *         price:
 *           type: number
 *           description: Цена курса в рублях
 *         stock:
 *           type: integer
 *           description: Количество доступных мест
 *       example:
 *         id: "abc123"
 *         name: "Медитация для начинающих"
 *         category: "Осознанность"
 *         description: "Пошаговый курс по освоению базовых техник медитации"
 *         author: "Анна Соколова"
 *         duration: "4 недели"
 *         level: "Новичок"
 *         price: 1990
 *         stock: 100
 *     Error:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 */

// ── Хелпер ────────────────────────────────────────────────────────────────
function findCourseOr404(id, res) {
  const course = courses.find(c => c.id === id);
  if (!course) {
    res.status(404).json({ error: 'Course not found' });
    return null;
  }
  return course;
}

// ── Маршруты ──────────────────────────────────────────────────────────────

/**
 * @swagger
 * /api/courses:
 *   post:
 *     summary: Создаёт новый курс
 *     tags: [Courses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - category
 *               - description
 *               - author
 *               - duration
 *               - level
 *               - price
 *               - stock
 *             properties:
 *               name:
 *                 type: string
 *               category:
 *                 type: string
 *               description:
 *                 type: string
 *               author:
 *                 type: string
 *               duration:
 *                 type: string
 *               level:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Курс успешно создан
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       400:
 *         description: Ошибка в теле запроса
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
app.post('/api/courses', (req, res) => {
  const { name, category, description, author, duration, level, price, stock } = req.body;
  if (!name || !category || !description || !author || !duration || !level ||
      price === undefined || stock === undefined) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  const newCourse = {
    id: nanoid(6),
    name: name.trim(),
    category: category.trim(),
    description: description.trim(),
    author: author.trim(),
    duration: duration.trim(),
    level: level.trim(),
    price: Number(price),
    stock: Number(stock),
  };
  courses.push(newCourse);
  res.status(201).json(newCourse);
});

/**
 * @swagger
 * /api/courses:
 *   get:
 *     summary: Возвращает список всех курсов
 *     tags: [Courses]
 *     responses:
 *       200:
 *         description: Список курсов
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Course'
 */
app.get('/api/courses', (req, res) => {
  res.json(courses);
});

/**
 * @swagger
 * /api/courses/{id}:
 *   get:
 *     summary: Получает курс по ID
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID курса
 *     responses:
 *       200:
 *         description: Данные курса
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       404:
 *         description: Курс не найден
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
app.get('/api/courses/:id', (req, res) => {
  const course = findCourseOr404(req.params.id, res);
  if (!course) return;
  res.json(course);
});

/**
 * @swagger
 * /api/courses/{id}:
 *   patch:
 *     summary: Обновляет данные курса
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID курса
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               category:
 *                 type: string
 *               description:
 *                 type: string
 *               author:
 *                 type: string
 *               duration:
 *                 type: string
 *               level:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Обновлённый курс
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       400:
 *         description: Нет данных для обновления
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Курс не найден
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
app.patch('/api/courses/:id', (req, res) => {
  const course = findCourseOr404(req.params.id, res);
  if (!course) return;

  const { name, category, description, author, duration, level, price, stock } = req.body;
  if ([name, category, description, author, duration, level, price, stock].every(v => v === undefined)) {
    return res.status(400).json({ error: 'Nothing to update' });
  }

  if (name !== undefined)        course.name        = name.trim();
  if (category !== undefined)    course.category    = category.trim();
  if (description !== undefined) course.description = description.trim();
  if (author !== undefined)      course.author      = author.trim();
  if (duration !== undefined)    course.duration    = duration.trim();
  if (level !== undefined)       course.level       = level.trim();
  if (price !== undefined)       course.price       = Number(price);
  if (stock !== undefined)       course.stock       = Number(stock);

  res.json(course);
});

/**
 * @swagger
 * /api/courses/{id}:
 *   delete:
 *     summary: Удаляет курс
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID курса
 *     responses:
 *       204:
 *         description: Курс успешно удалён (нет тела ответа)
 *       404:
 *         description: Курс не найден
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
app.delete('/api/courses/:id', (req, res) => {
  const exists = courses.some(c => c.id === req.params.id);
  if (!exists) return res.status(404).json({ error: 'Course not found' });
  courses = courses.filter(c => c.id !== req.params.id);
  res.status(204).send();
});

// ── Обработчики ошибок ─────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// ── Запуск ─────────────────────────────────────────────────────────────────
app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
  console.log(`Swagger UI: http://localhost:${port}/api-docs`);
});
