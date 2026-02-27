// ════════════════════════════════════════════════════════════════
// Занятие 4: React + API (полный CRUD)
// ════════════════════════════════════════════════════════════════
import React, { useEffect, useState } from 'react';
import './ProductsPage.scss';
import CourseCard, { CATEGORIES } from '../../components/CourseCard';
import CourseModal from '../../components/CourseModal';
import { api } from '../../api';

export default function ProductsPage() {
  const [courses, setCourses]           = useState([]);
  const [loading, setLoading]           = useState(true);
  const [modalOpen, setModalOpen]       = useState(false);
  const [modalMode, setModalMode]       = useState('create');
  const [editingCourse, setEditing]     = useState(null);
  const [activeCategory, setCategory]   = useState('Все');

  // ── Загрузка (Занятие 3: работа с JSON-API) ─────────────────
  useEffect(() => { loadCourses(); }, []);

  const loadCourses = async () => {
    try {
      setLoading(true);
      const data = await api.getCourses();
      setCourses(data);
    } catch (err) {
      console.error(err);
      alert('Ошибка загрузки. Убедитесь, что бэкенд запущен на порту 3000.');
    } finally {
      setLoading(false);
    }
  };

  // ── Модальное окно ──────────────────────────────────────────
  const openCreate = ()  => { setModalMode('create'); setEditing(null);    setModalOpen(true); };
  const openEdit   = (c) => { setModalMode('edit');   setEditing(c);       setModalOpen(true); };
  const closeModal = ()  => { setModalOpen(false);    setEditing(null); };

  // ── DELETE ──────────────────────────────────────────────────
  const handleDelete = async (id) => {
    if (!window.confirm('Удалить курс из каталога?')) return;
    try {
      await api.deleteCourse(id);
      setCourses((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.error(err);
      alert('Ошибка удаления');
    }
  };

  // ── CREATE / UPDATE ─────────────────────────────────────────
  const handleSubmit = async (payload) => {
    try {
      if (modalMode === 'create') {
        const newCourse = await api.createCourse(payload);
        setCourses((prev) => [...prev, newCourse]);
      } else {
        const updated = await api.updateCourse(payload.id, payload);
        setCourses((prev) => prev.map((c) => (c.id === payload.id ? updated : c)));
      }
      closeModal();
    } catch (err) {
      console.error(err);
      alert('Ошибка сохранения');
    }
  };

  // ── Фильтрация по категории ──────────────────────────────────
  const allCategories = ['Все', ...CATEGORIES];
  const visible = activeCategory === 'Все'
    ? courses
    : courses.filter((c) => c.category === activeCategory);

  return (
    <div className="page">

      {/* Шапка */}
      <header className="header">
        <div className="header__inner">
          <div className="header__logo">Grow<span>Up</span></div>
          <span className="header__tagline">Курсы по саморазвитию</span>
        </div>
      </header>

      {/* Основной контент */}
      <main className="main">
        <div className="container">

          {/* Тулбар */}
          <div className="toolbar">
            <div className="toolbar__left">
              <h1 className="toolbar__title">Каталог курсов</h1>
              <span className="toolbar__count">{visible.length} курсов</span>
            </div>
            <button className="btn btn--primary" onClick={openCreate}>
              + Добавить курс
            </button>
          </div>

          {/* Фильтры по категориям */}
          <div className="filters">
            {allCategories.map((cat) => (
              <button
                key={cat}
                className={`filters__btn${activeCategory === cat ? ' filters__btn--active' : ''}`}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Контент */}
          {loading ? (
            <div className="loading">Загрузка курсов...</div>
          ) : visible.length === 0 ? (
            <div className="empty">Курсы не найдены</div>
          ) : (
            <div className="courses-grid">
              {visible.map((c) => (
                <CourseCard
                  key={c.id}
                  course={c}
                  onEdit={openEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}

        </div>
      </main>

      {/* Подвал */}
      <footer className="footer">
        <div className="footer__inner">
          <span>© {new Date().getFullYear()} GrowUp — Курсы по саморазвитию</span>
          <span>Практические занятия 1–6 | Фронтенд и бэкенд разработка</span>
        </div>
      </footer>

      {/* Модальное окно создания/редактирования */}
      <CourseModal
        open={modalOpen}
        mode={modalMode}
        initialCourse={editingCourse}
        onClose={closeModal}
        onSubmit={handleSubmit}
      />

    </div>
  );
}
