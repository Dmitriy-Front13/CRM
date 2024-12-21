import { axiosInstance, getCsrfToken } from './instance';
import { Project } from '@shared/types';
export const getAllProjects = async (): Promise<Project[]> => {
  return (await axiosInstance.get<Project[]>("/project")).data;
}

export const createProject = async (data: Project) => {
  const csrfToken = await getCsrfToken();
  await axiosInstance.post("/project", {
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-Token": csrfToken
    },
    data,
  }
  );
}

export const updateProject = async (id: number, data: Project) => {
  const csrfToken = await getCsrfToken();
  const response = await axiosInstance.put(`/project/${id}`, {
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-Token": csrfToken
    },
    data,
  }
  );
  return response.data
}
export const deleteProject = async (id: number) => {
  const csrfToken = await getCsrfToken();
  await axiosInstance.delete(`/project/${id}`, {
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-Token": csrfToken
    },
  });
};