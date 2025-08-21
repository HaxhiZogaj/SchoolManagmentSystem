
import api from '../api';

 export const getStudentProfile = (userId) => api.get(`/profile/${userId}`);
 



