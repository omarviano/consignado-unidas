import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const apiWithoutInterceptors = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const viaCepApi = axios.create({
  baseURL: 'https://viacep.com.br/ws/',
});

export { api, apiWithoutInterceptors, viaCepApi };
