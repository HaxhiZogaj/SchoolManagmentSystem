import api from '../api';


export const getAllClassSubjects = () => api.get('/classsubject');


export const getClassSubjectById = (id) => api.get(`/classsubject/${id}`);


export const addClassSubject = (data) => api.post('/classsubject/add', data);


export const updateClassSubject = (id, data) => api.put(`/classsubject/${id}`, data);


export const deleteClassSubject = (id) => api.delete(`/classsubject/${id}`);


export const getClassDropdown = () => api.get('/classsubject/dropdown/classes');


export const getSubjectDropdown = () => api.get('/classsubject/dropdown/subjects');


export const getTeacherDropdown = () => api.get('/classsubject/dropdown/teachers');
