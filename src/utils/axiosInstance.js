// import axios from "axios"

// const axiosInstance = axios.create({
//     baseURL: import.meta.env.VITE_API_URL,
//     withCredentials: true,
// })

// export default axiosInstance

import axios from "axios";

const axiosInstance = axios.create({
  baseURL:  import.meta.env.VITE_API_URL, // Update with your backend URL
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;