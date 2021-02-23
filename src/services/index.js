import axios from 'axios';
import ResponseParser from '../utils/response-parser';

const url = 'https://602bc959ef26b40017f14b21.mockapi.io/todo/v1  ';

export const register = (email, password) => {
  return ResponseParser(axios.post(`${url}/user`, {email, password}), (response) => response.data);
};

export const getUser = () => {
  return ResponseParser(axios.get(`${url}/user`), (response) => response);
};
