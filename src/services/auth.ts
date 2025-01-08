import { IUser } from "@/actions"
import { axiosInstance } from "./instance"

export const login = async (fullName: string, password: string): Promise<IUser> => {
  return (await axiosInstance.post<IUser>("/auth", { fullName, password })).data
}



