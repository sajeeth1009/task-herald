import axios from "axios";

const apiInstance = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
});

/* 
  TODO: ADD LOGIC TO ADD AUTHORIZATION TOKEN
  axios.interceptors.request.use(function (config) {
  const token = store.getState().session.token;
  config.headers.Authorization = `Bearer ${token}`;

  return config;
}); */

export default apiInstance;
