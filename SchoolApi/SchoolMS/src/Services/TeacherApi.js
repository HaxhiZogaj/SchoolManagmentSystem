import api from '../api';


export const getAllTeachers = () => api.get('/teacher');


export const getTeacherById = (id) => api.get(`/teacher/${id}`);


export const addTeacher = (data) => api.post('/teacher/add', data);


export const updateTeacher = (id, data) => api.put(`/teacher/${id}`, data);


export const deleteTeacher = (id) => api.delete(`/teacher/${id}`);


export const getUserDropdown = () => api.get('/teacher/user-dropdown');


export const getDepartmentDropdown = () => api.get('/teacher/department-dropdown');
