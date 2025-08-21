import axios from 'axios';

   const api = axios.create({
  baseURL: 'https://localhost:7189/api', 
  headers: {
    'Content-Type': 'application/json',
  },
});  

/* const api = axios.create({
  baseURL: 'https://5d9607cfa67d.ngrok-free.app/api',
  headers: {
    'Content-Type': 'application/json',
  },
}); */

 
/* const api = axios.create({
  baseURL: 'https://192.168.1.2:7189/api',
  headers: {
    'Content-Type': 'application/json',
  },
}); */

 

export default api;
