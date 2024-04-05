import axios, { type CreateAxiosDefaults } from 'axios';

const options: CreateAxiosDefaults = {
  baseURL: 'http://localhost:3000/',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
};

const axiosClassic = axios.create(options);
const axiosWithAuth = axios.create(options);

axiosWithAuth.interceptors.response.use(
  (config) => config,
  async (error) => {
    throw error;
  },
);

export { axiosClassic, axiosWithAuth };
