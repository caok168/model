import { API_URL } from '@/constants/';
import axios from './axios';

export default {
  get({ current, pageSize, ...data }) {
    console.log(data)
    return axios.post(`${API_URL}/v1/models/list`, {
      page: current, pagesize: pageSize,name:data.name
    }).then((res) => ({
      data: res.data, total: res.headers['x-total'],
    }));
  },
  add(data) {
    return axios.post(`${API_URL}/v1/models/create`, data)
      .then((res) => res.data);
  },
  delete(data) {
    return axios.post(`${API_URL}/v1/models/delete`, data)
      .then((res) => res.data);
  },
  detail(data) {
    return axios.post(`${API_URL}/v1/models/detail`, data)
      .then((res) => res.data);
  },
  feature(data) {
    return axios.post(`${API_URL}/v1/models/feature`, data)
      .then((res) => res.data);
  },
  inference(data) {
    return axios.post(`${API_URL}/v1/models/inference`, data)
      .then((res) => res.data);
  },
};
