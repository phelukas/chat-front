import axios from 'axios';
import { API_URL } from '../config';

export const createUser = async (userData) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = user?.access_token;

  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
  };

  const response = await axios.post(`${API_URL}users/`, JSON.stringify(userData), { headers });
  return response.data;
};


export const getUser = async () => {
  const user = JSON.parse(localStorage.getItem('user'));
  console.log(user)
  const token = user?.access_token;

  const headers = {
    Authorization: `Bearer ${token}`,
  };
  console.log(headers)

  const response = await axios.get(`${API_URL}users/`, { headers });
  return response.data;
};

export const updateUser = async (userData) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = user?.access_token;

  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
  };

  const response = await axios.put(`${API_URL}users/`, JSON.stringify(userData), { headers });
  return response.data;
};

export const deleteUser = async (userId) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = user?.access_token;

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const response = await axios.delete(`${API_URL}users/${userId}`, { headers });
  return response.data;
};
