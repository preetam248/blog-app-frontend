import axios from "axios";
import { BASE_URL } from "../const/env.const";
let AxiosInstance;

(() => {
  AxiosInstance = axios.create({
    baseURL: BASE_URL,
  });

  AxiosInstance.interceptors.request.use(
    (config) => {
      let token = localStorage.getItem("token");
      token && (config.headers.Authorization = `Bearer ${token}`);
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  AxiosInstance.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error)
  );
})();

export default AxiosInstance;