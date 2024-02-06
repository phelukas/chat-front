import axiosInstance from './config';

export const createUser = async (userData) => {
  const response = await axiosInstance.post('users/', userData, {
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const getUser = async () => {
  const response = await axiosInstance.get('users/');
  return response.data;
};

export const updateUser = async (userData) => {
  const response = await axiosInstance.put('users/', userData, {
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const deleteUser = async (userId) => {
  const response = await axiosInstance.delete(`users/${userId}`);
  return response.data;
};
