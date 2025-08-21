 import api from '../api';


export const getAllHomeworkSubmissions = () => api.get('/homeworkSubmission');


export const getHomeworkSubmissionById = (id) => api.get(`/homeworkSubmission/${id}`);


export const addHomeworkSubmission = (homeworkSubmission) => api.post('/homeworkSubmission/Add', homeworkSubmission);


export const updateHomeworkSubmission = (id, homeworkSubmission) => api.put(`/homeworkSubmission/${id}`, homeworkSubmission);


export const deleteHomeworkSubmission = (id) => api.delete(`/homeworkSubmission/${id}`);


export const getHomeworkDropdown = () => api.get('/homeworkSubmission/homework-dropdown');

export const getStudentDropdown = () => api.get('/homeworkSubmission/students-dropdown');

 