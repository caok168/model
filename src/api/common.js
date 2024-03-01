import { API_URL } from '@/constants/';
import axios from './axios';

export default {
  upload(formData) {
    return axios.post(`${API_URL}/v1/common/upload`, formData)
      .then((res) => ({ data: res.data }));
  },
};
