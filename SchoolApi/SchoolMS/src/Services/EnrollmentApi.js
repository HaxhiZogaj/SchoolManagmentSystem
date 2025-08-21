import api from '../api';


export const getAllEnrollments = () => api.get('/enrollment');


export const getEnrollmentById = (id) => api.get(`/enrollment/${id}`);


export const addEnrollment = (data) => api.post('/enrollment/add', data);


export const updateEnrollment = (id, data) => api.put(`/enrollment/${id}`, data);


export const deleteEnrollment = (id) => api.delete(`/enrollment/${id}`);


export const getStudentsDropdown = () => api.get('/enrollment/students-dropdown');


export const getClassesDropdown = () => api.get('/enrollment/classes-dropdown');
