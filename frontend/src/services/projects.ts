import { axiosInstance } from './instance';
import { Project } from '@shared/types';
export const getAllProjects = async (): Promise<Project[]> => {
  return (await axiosInstance.get<Project[]>("/project")).data;
}

export const createProject = async (data: Project) => {
  await axiosInstance.post("/project",data,);
}

export const updateProject = async (id: number, data: Project) => {
  const response = await axiosInstance.put(`/project/${id}`, data);
  return response.data
}
