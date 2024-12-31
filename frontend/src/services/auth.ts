import { axiosInstance } from "./instance"

interface LoginResponse {
  fullName: string,
  position: string
}
export const login = async (fullName: string, password: string): Promise<LoginResponse> => {
  return (await axiosInstance.post<LoginResponse>("/auth/login", { fullName, password })).data
}

export const getUser = async () => {
  try {
    const user = await axiosInstance.get("/auth/user");
    return user.data
  } catch (error) {
    console.error(error);
    return null;
  }

}