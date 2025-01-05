import { IUser } from "@/components/auth/auth-provider"
import { axiosInstance } from "./instance"

export const login = async (fullName: string, password: string): Promise<IUser> => {
  return (await axiosInstance.post<IUser>("/auth/login", { fullName, password })).data
}

export const logOut = async () => {
  return await axiosInstance.post("/auth/logout")
}

export const getUser = async (token: string): Promise<IUser> => {
  try {
    const user = await axiosInstance.get('/auth/user', {
      headers: {
        Cookie: `authToken=${token}`,
      },
    });
    
    return user.data;
  } catch (error) {
    console.error('Ошибка при получении пользователя:', error);
    throw error;
  }
};
