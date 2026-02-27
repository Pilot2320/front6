import React, { useEffect, useState } from 'react';
import { CATEGORIES, LEVELS } from './CourseCard';

const EMPTY = {
  name: '', category: 'Осознанность', description: '',
  author: '', duration: '', level: 'Новичок', price: '', stock: '',
};

export default function CourseModal({ open, mode, initialCourse, onClose, onSubmit }) {
  const [form, setForm] = useState(EMPTY);

  useEffect(() => {
    if (!open) return;
    setForm(initialCourse
      ? {
          name:        initialCourse.name        ?? '',
          category:    initialCourse.category    ?? 'Осознанность',
          description: initialCourse.description ?? '',
          author:      initialCourse.author      ?? '',
          duration:    initialCourse.duration    ?? '',
          level:       initialCourse.level       ?? 'Новичок',
          price:       initialCourse.price  != null ? String(initialCourse.price)  : '',
          stock:       initialCourse.stock  != null ? String(initialCourse.stock)  : '',
        }
      : EMPTY
    );
  }, [open, initialCourse]);

  if (!open) return null;

  const set = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const name        = form.name.trim();
    const description = form.description.trim();
    const author      = form.author.trim();
    const duration    = form.duration.trim();
    const price       = Number(form.price);
    const stock       = Number(form.stock);

    if (!name)        return alert('Введите название курса');
    if (!description) return alert('Введите описание');
    if (!author)      return alert('Введите автора');
    if (!duration)    return alert('Введите продолжительность');
    if (!Number.isFinite(price) || price < 0)     return alert('Введите корректную цену');
    if (!Number.isInteger(stock) || stock < 0)    return alert('Введите корректное количество мест');

    onSubmit({
      id: initialCourse?.id,
      name, category: form.category, description,
      author, duration, level: form.level, price, stock,
    });
  };

  return (
    <div className="backdrop" onMouseDown={onClose}>
      <div className="modal" onMouseDown={(e) => e.stopPropagation()} role="dialog" aria-modal="true">

        <div className="modal__header">
          <div className="modal__title">
            {mode === 'edit' ? 'Редактирование курса' : 'Добавление курса'}
          </div>
          <button className="icon-btn" onClick={onClose} aria-label="Закрыть">✕</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal__body">

            <div className="form-group">
              <label>Название курса</label>
              <input className="input" value={form.name} onChange={set('name')}
                placeholder="Например, Медитация для начинающих" autoFocus />
            </div>

            <div className="form-group form-group--row">
              <div className="form-group">
                <label>Категория</label>
                <select className="select" value={form.category} onChange={set('category')}>
                  {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Уровень</label>
                <select className="select" value={form.level} onChange={set('level')}>
                  {LEVELS.map((l) => <option key={l}>{l}</option>)}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Описание</label>
              <textarea className="textarea" value={form.description} onChange={set('description')}
                placeholder="Краткое описание курса и его пользы" rows={3} />
            </div>

            <div className="form-group form-group--row">
              <div className="form-group">
                <label>Автор</label>
                <input className="input" value={form.author} onChange={set('author')}
                  placeholder="Имя преподавателя" />
              </div>
              <div className="form-group">
                <label>Продолжительность</label>
                <input className="input" value={form.duration} onChange={set('duration')}
                  placeholder="4 недели" />
              </div>
            </div>

            <div className="form-group form-group--row">
              <div className="form-group">
                <label>Цена (₽)</label>
                <input className="input" value={form.price} onChange={set('price')}
                  placeholder="1990" inputMode="numeric" />
              </div>
              <div className="form-group">
                <label>Мест (шт.)</label>
                <input className="input" value={form.stock} onChange={set('stock')}
                  placeholder="100" inputMode="numeric" />
              </div>
            </div>

          </div>

          <div className="modal__footer">
            <button type="button" className="btn" onClick={onClose}>Отмена</button>
            <button type="submit" className="btn btn--primary">
              {mode === 'edit' ? 'Сохранить' : 'Добавить курс'}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
