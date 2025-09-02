import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000'
});

export const getPosts = (params = {}) => api.get('/api/posts', { params }).then((r) => r.data);
export const getPost = (slug) => api.get(`/api/posts/${slug}`).then((r) => r.data);
export const getEvents = () => api.get('/api/events').then((r) => r.data);
export const getEvent = (slug) => api.get(`/api/events/${slug}`).then((r) => r.data);
export const getFaculty = () => api.get('/api/faculty').then((r) => r.data);
export const contact = (payload) => api.post('/api/contact', payload).then((r) => r.data);
export const login = (payload) => api.post('/api/auth/login', payload).then((r) => r.data);

export default api;


