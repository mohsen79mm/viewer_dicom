import axios from 'axios';

// const baseURL = 'https://localhost:8080/api/';
const baseURL = 'https://reactnative.dev/movies.json';


const axiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 5000,
    withCredentials: true,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    "Access-Control-Allow-Headers": "x-requested-with",
    
    
  },
});


export default axiosInstance;