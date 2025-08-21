 import api from '../api';


export const getAllHomeworks = () => api.get('/homework');


export const getHomeworkById = (id) => api.get(`/homework/${id}`);


export const addHomework = (homework) => api.post('/homework/Add', homework);


export const updateHomework = (id, homework) => api.put(`/homework/${id}`, homework);


export const deleteHomework = (id) => api.delete(`/homework/${id}`);


export const getClassSubjectDropdown = () => api.get('/homework/classsubject-dropdown');
 