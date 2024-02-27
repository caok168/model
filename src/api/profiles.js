// 本文件为标签api
import { API_URL } from '@/constants/';
import axios from './axios';

export default {
  login(data) {
    return axios.post(`${API_URL}/v1/login`, data)
      .then((res) => res.data);
  },
  loginGoogle(data) {
    return axios.post(`${API_URL}/v1/google_login`, data)
      .then((res) => res.data);
  },
  register(data) {
    return axios.post(`${API_URL}/v1/register`, data)
      .then((res) => res.data);
  },
  logout() {
    return axios.post(`${API_URL}/v1/logout`)
      .then((res) => res.data);
  },
  get() {
    return axios.get(`${API_URL}/user/profiles`)
      .then((res) => res.data);
  },
};
