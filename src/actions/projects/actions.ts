"use server"

import { FormData } from "@/components/projects/projects-form";
import { Project } from "@prisma/client";
import prisma from "@prisma/prisma";

export const getAllProjects = async (): Promise<Project[]> => {
  try {
    const projects = await prisma.project.findMany();
    return projects;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Unknown error occurred");
  }
};

export const getProjectById = async (id: number): Promise<Project> => {
  try {
    const project = await prisma.project.findUnique({
      where: { id },
    })
    if (!project) {
      throw new Error(`Project with ID ${id} not found`)
    }
    return project
  } catch (error) {
    throw error
  }
}


export const createProject = async (data: FormData ) => {
  try {
    await prisma.project.create({ data });
  } catch (error) { 
    throw error
  }
}

export async function updateProject(id: number, body: Project) {
  try {
    const updatedProject = await prisma.project.update({
      where: { id: Number(id) },
      data: body
    })
    return updatedProject; // Возвращаем обновленный проект
  } catch (error) {
    throw new Error(`Error updating project: ${error}`);
  }
}


export type TUpdateProject = typeof updateProject;