import { API_URL } from '@/constants/';
import axios from './axios';

export default {
  get({ current, pageSize, ...data }) {
    return axios.get(`${API_URL}/users`, {
      params: { page: current, pagesize: pageSize, ...data },
    }).then((res) => ({
      data: res.data, total: res.headers['x-total'],
    }));
  },
  add(data) {
    return axios.post(`${API_URL}/users`, data)
      .then((res) => res.data);
  },
  delete(id) {
    return axios.delete(`${API_URL}/users/${id}`)
      .then((res) => res.data);
  },
  put({ id, ...data }) {
    return axios.put(`${API_URL}/users/${id}`, data)
      .then((res) => res.data);
  },
  getDetail(id) {
    return axios.get(`${API_URL}/users/${id}`)
      .then((res) => res.data);
  },
  set(data) {
    return axios.post(`${API_URL}/users/set`, data)
      .then((res) => res.data);
  },
};
