import api from '../api';

export const getAllTimetables = () => api.get('/timetable');


export const getTimetableById = (id) => api.get(`/timetable/${id}`);


export const addTimetable = (data) => api.post('/timetable/add', data);


export const updateTimetable = (id, data) => api.put(`/timetable/${id}`, data);


export const deleteTimetable = (id) => api.delete(`/timetable/${id}`);


export const getClassSubjectDropdown = () => api.get('/timetable/classsubject-dropdown');
