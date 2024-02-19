import axios from "axios";
import { BASE_API } from "../share/constrants/urlbase.jsx";

const Http = axios.create({
    baseURL: BASE_API,
});

export default Http;