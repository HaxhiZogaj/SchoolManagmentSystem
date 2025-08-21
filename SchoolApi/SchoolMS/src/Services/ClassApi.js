import api from '../api';


export const getAllClasses = () => api.get('/class');


export const getClassById = (id) => api.get(`/class/${id}`);


export const addClass = (classData) => api.post('/class/Add', classData);


export const updateClass = (id, classData) => api.put(`/class/${id}`, classData);


export const deleteClass = (id) => api.delete(`/class/${id}`);


export const getHomeroomTeacherDropdown = () => api.get('/class/dropdown/teachers');
