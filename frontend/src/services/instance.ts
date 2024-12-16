import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
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