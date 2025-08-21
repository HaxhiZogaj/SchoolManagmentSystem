import api from '../api';

export const getAllAppointments = () => api.get('/scheduler/GetAll');

export const addAppointment = (appointment) => api.post('/scheduler/Add', appointment);

export const updateAppointment = (id, appointment) => api.put(`/scheduler/${id}`, appointment);

export const deleteAppointment = (id) => api.delete(`/scheduler/${id}`);

export const checkAppointmentOverlap = (appointment) => api.post('/scheduler/CheckOverLap', appointment);
