import axios from 'axios';
import { API_URL } from './config';

export const login = async (email, password) => {
  const data = new URLSearchParams();
  data.append('username', email);
  data.append('password', password);

  const response = await axios.post(`${API_URL}auth/token`, data, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  if (response.data.access_token) {
    localStorage.setItem('user', JSON.stringify(response.data));

  }

  return response.data;
};

export const refreshToken = async () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.access_token) {
    const response = await axios.post(`${API_URL}refresh_token`, {}, {
      headers: { Authorization: `Bearer ${user.access_token}` },
    });
    if (response.data.access_token) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  }
};
