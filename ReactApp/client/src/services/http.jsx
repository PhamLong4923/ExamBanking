import axios from "axios";
import { BASE_API } from "../share/urlbase";
import store from "../redux-setup/store";

const Http = axios.create({
    baseURL: BASE_API,
});


Http.interceptors.request.use(
    async (config) => {
        const token = store.getState().token;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default Http;
