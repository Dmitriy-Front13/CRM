import prisma from '@prisma/prisma';
import { Project } from '@prisma/client';
export const getAllProjects = async (): Promise<Project[]> => {
  try {
    const projects = await prisma.project.findMany();
    return projects;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Unknown error occurred");
  }
};


// export const createProject = async (data: Project) => {
//   await axiosInstance.post("/project",data,);
// }

// export const updateProject = async (id: number, data: Project) => {
//   const response = await axiosInstance.put(`/project/${id}`, data);
//   return response.data
// }
