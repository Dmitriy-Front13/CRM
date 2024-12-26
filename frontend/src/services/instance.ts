import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000',
  withCredentials: true,
});

export const getCsrfToken = async () => {
  try {
    const response = await axiosInstance.get("/csrf-token");
    return response.data.csrfToken;
  } catch (error) {
    console.error(error);
  }
};