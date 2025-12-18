// @ts-nocheck
import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL || "https://dummyjson.com "

console.log(import.meta.env.VITE_BASE_URL, 'import.meta.env.VITE_BASE_URL')

const instance = axios.create({
  baseURL: baseUrl,
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 404) {
      console.error("404 error: Clearing local storage and reloading the page.");
      localStorage.clear();
      window.location.reload();
    }
    return Promise.reject(error);
  }
);

const Api = {
  get: async (url, params, token = null) => {
    try {
      const token = JSON.parse(localStorage.getItem("auth"))
      console.log(token,'headers token')
      const headers = {
        Authorization: `Bearer ${token?.accesssToken}`,
      };      const response = await instance.get(url, { params, headers });
      return response.data;
    } catch (error) {
      console.log(error)
      throw error;
    }
  },

  post: async (url, data, params = null, token = null) => {
    try {
      const token = JSON.parse(localStorage.getItem("auth"))
      console.log(token,'headers token')
      const headers = {
        Authorization: `Bearer ${token?.accesssToken}`,
      };
      console.log(headers,'headers')
      const response = await instance.post(url, data, { params, headers });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  put: async (url, data, params, token = null) => {
    try {
      
      const token = JSON.parse(localStorage.getItem("auth"))
      console.log(token,'headers token')
      const headers = {
        Authorization: `Bearer ${token?.accesssToken}`,
      };
      console.log(headers,'headers')
      const response = await instance.put(url, data, { params, headers });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  delete: async (url, params, token = null) => {
    try {
      
      const token = JSON.parse(localStorage.getItem("auth"))
      console.log(token,'headers token')
      const headers = {
        Authorization: `Bearer ${token?.accesssToken}`,
      };
      console.log(headers,'headers')
      const response = await instance.delete(url, { params, headers });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default Api;
