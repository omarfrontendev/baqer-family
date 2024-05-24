// import config from "../config";
import axios from "axios";
import Cookies from "js-cookie";

const instance = axios.create({
  baseURL: "https://baqerapi.fayrouztransport.com",
  timeout: 50000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  },
});

// Add a request interceptor
instance.interceptors.request.use(function (config) {
  let token;

  if (Cookies.get("token")) {
    token = Cookies.get("token");
  }

  return {
    ...config,
    headers: {
      authorization: token ? `Bearer ${token}` : null,
    },
  };
});

const responseBody = (response) => response.data;

const api = {
  get: (url, body, headers) =>
    instance.get(url, body, headers).then(responseBody),

  post: (url, body) => instance.post(url, body).then(responseBody),

  put: (url, body, headers) =>
    instance.put(url, body, headers).then(responseBody),

  patch: (url, body, headers) =>
    instance.patch(url, body, headers).then(responseBody),

  delete: (url, body, headers) =>
    instance.delete(url, body, headers).then(responseBody),
};

export default api;
