import {create} from 'apisauce';

const api = create({
  baseURL: 'http://streaming.nexlesoft.com:3001',
  timeout: 15000,
});

export default api;
