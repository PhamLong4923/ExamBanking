import axios from "axios";
import { BASE_API } from "../share/constrants/urlbase.jsx";
import store from "../redux/store"; // Import store của Redux

const Http = axios.create({
  baseURL: BASE_API,
});

// Intercept request và thêm token vào header trước khi gửi
Http.interceptors.request.use(
  async (config) => {
    const token = store.getState().token; // Lấy token từ Redux state
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default Http;
