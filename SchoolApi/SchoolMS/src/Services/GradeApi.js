import api from '../api';


export const getAllGrades = () => api.get('/grade');


export const getGradeById = (id) => api.get(`/grade/${id}`);


export const addGrade = (data) => api.post('/grade/add', data);


export const updateGrade = (id, data) => api.put(`/grade/${id}`, data);


export const deleteGrade = (id) => api.delete(`/grade/${id}`);


export const getEnrollmentDropdown = () => api.get('/grade/enrollment-dropdown');


export const getClassSubjectDropdown = () => api.get('/grade/classsubject-dropdown');
