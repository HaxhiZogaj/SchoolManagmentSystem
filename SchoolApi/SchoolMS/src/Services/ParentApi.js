import api from '../api';


export const getAllParents = () => api.get('/parent');


export const getParentById = (id) => api.get(`/parent/${id}`);


export const addParent = (data) => api.post('/parent/Add', data);


export const updateParent = (id, data) => api.put(`/parent/${id}`, data);


export const deleteParent = (id) => api.delete(`/parent/${id}`);


export const getUserDropdown = () => api.get('/parent/user-dropdown');
