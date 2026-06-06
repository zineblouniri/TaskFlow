import axios from 'axios';

const API = axios.create({
  baseURL:" https://motion-platform-haiku.ngrok-free.dev/api"
  //baseURL: "http://localhost:8080/api",
  //baseURL: "https://taskflow-humming-harborbird-7368.fly.dev/api"
  //baseURL: import.meta.env.VITE_API_URL
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token")
  if(token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
})

export default API;