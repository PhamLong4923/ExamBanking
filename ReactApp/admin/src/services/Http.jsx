import axios from "axios";
import { BASE_API } from "../share/constrants/urlbase.jsx";
import { getLocalStorageItem } from "./LocalStorage.jsx";

const Http = axios.create({
  baseURL: BASE_API,
});

Http.interceptors.request.use(
  (config) => {
    const token = getLocalStorageItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default Http;