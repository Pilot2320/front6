// ════════════════════════════════════════════════════════════════
// Занятие 3 + 4: Axios-клиент для работы с API курсов
// ════════════════════════════════════════════════════════════════

import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
    'accept': 'application/json',
  },
});

export const api = {
  // CREATE
  createCourse: async (course) => {
    const response = await apiClient.post('/courses', course);
    return response.data;
  },

  // READ ALL
  getCourses: async () => {
    const response = await apiClient.get('/courses');
    return response.data;
  },

  // READ ONE
  getCourseById: async (id) => {
    const response = await apiClient.get(`/courses/${id}`);
    return response.data;
  },

  // UPDATE
  updateCourse: async (id, course) => {
    const response = await apiClient.patch(`/courses/${id}`, course);
    return response.data;
  },

  // DELETE
  deleteCourse: async (id) => {
    await apiClient.delete(`/courses/${id}`);
  },
};
