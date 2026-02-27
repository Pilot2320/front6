import React from 'react';

export const CATEGORIES = [
  'Осознанность',
  'Продуктивность',
  'Финансы',
  'Коммуникация',
  'Интеллект',
  'Здоровье',
  'Психология',
];

export const LEVELS = ['Новичок', 'Средний', 'Продвинутый'];

const LEVEL_CLASS = {
  'Новичок':     'novice',
  'Средний':     'medium',
  'Продвинутый': 'advanced',
};

export default function CourseCard({ course, onEdit, onDelete }) {
  const formatPrice = (p) =>
    new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(p);

  const seatsClass =
    course.stock === 0   ? 'sold'
    : course.stock <= 10 ? 'few'
    : 'available';

  const seatsLabel =
    course.stock === 0   ? 'Мест нет'
    : course.stock <= 10 ? `Осталось ${course.stock} мест`
    : `${course.stock} мест`;

  return (
    <div className="course-card">
      <div className="course-card__header">
        <span className="course-card__category">{course.category}</span>
        <span className="course-card__id">#{course.id}</span>
      </div>

      <div className="course-card__name">{course.name}</div>
      <div className="course-card__description">{course.description}</div>

      <div className="course-card__meta">
        <span className="course-card__meta-item">{course.author}</span>
        <span className="course-card__meta-item">{course.duration}</span>
        <span className={`level-badge level-badge--${LEVEL_CLASS[course.level] || 'novice'}`}>
          {course.level}
        </span>
      </div>

      <div className="course-card__footer">
        <div className="course-card__price">{formatPrice(course.price)}</div>
        <span className={`course-card__seats course-card__seats--${seatsClass}`}>
          {seatsLabel}
        </span>
      </div>

      <div className="course-card__actions">
        <button className="btn btn--sm" onClick={() => onEdit(course)}>Редактировать</button>
        <button className="btn btn--sm btn--danger" onClick={() => onDelete(course.id)}>Удалить</button>
      </div>
    </div>
  );
}
