import api from '../api';


export const getAllSubjects = () => api.get('/subject');


export const getSubjectById = (id) => api.get(`/subject/${id}`);


export const addSubject = (data) => api.post('/subject/add', data);


export const updateSubject = (id, data) => api.put(`/subject/${id}`, data);


export const deleteSubject = (id) => api.delete(`/subject/${id}`);


export const getDepartmentDropdown = () => api.get('/subject/department-dropdown');
