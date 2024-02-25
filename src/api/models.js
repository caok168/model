import { API_URL } from '@/constants/';
import axios from './axios';

export default {
  get({ current, pageSize, ...data }) {
    return axios.post(`${API_URL}/v1/models/list`, {
      params: { page: current, pagesize: pageSize, ...data },
    }).then((res) => ({
      data: res.data, total: res.headers['x-total'],
    }));
  },
  add(formData) {
    return axios.post(`${API_URL}/v1/models/create`, formData)
      .then((res) => res.data);
  },
  delete(data) {
    return axios.post(`${API_URL}/v1/models/delete`, data)
      .then((res) => res.data);
  },
};
