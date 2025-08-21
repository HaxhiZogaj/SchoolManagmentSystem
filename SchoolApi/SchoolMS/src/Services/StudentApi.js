import api from '../api';


export const getAllStudents = () => api.get('/student');


export const getStudentById = (id) => api.get(`/student/${id}`);


export const addStudent = (data) => api.post('/student/Add', data);


export const updateStudent = (id, data) => api.put(`/student/${id}`, data);


export const deleteStudent = (id) => api.delete(`/student/${id}`);


export const getUserDropdown = () => api.get('/student/user-dropdown');


export const getParentDropdown = () => api.get('/student/parent-dropdown');
