import api from '../api';


export const getAllDepartments = () => api.get('/department');


export const getDepartmentById = (id) => api.get(`/department/${id}`);


export const addDepartment = (data) => api.post('/department/add', data);


export const updateDepartment = (id, data) => api.put(`/department/${id}`, data);


export const deleteDepartment = (id) => api.delete(`/department/${id}`);
