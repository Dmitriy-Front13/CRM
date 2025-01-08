'use server';

import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import prisma from "@prisma/prisma";
import { EmployeeFormValues } from "./components/employee/employee-form";
import { Project } from "@prisma/client";
export interface IUser {
  fullName: string;
  position: string;
}
export async function logOut() {
  const cookieStore = await cookies()
  cookieStore.delete('authToken')
  redirect("/");
}

export const encrypt = async () => {
  const token = (await cookies()).get('authToken')?.value;
  if (!token) {
    return null;
  }
  try {
    const user = verify(token, process.env.JWT_SECRET!)
    return user as IUser;
  } catch {
    return null
  }
}

export async function updateEmployee(id: number, initialData: EmployeeFormValues) {
  try {
    const { projects, ...data } = initialData;

    const projectConnections = projects?.length
      ? await Promise.all(
        projects.map(async (projectName: string) => {
          const project = await prisma.project.findFirst({
            where: { projectName },
          });
          return project ? { id: project.id } : null;
        }),
      )
      : [];

    const validProjectConnections = projectConnections.filter((p) => p !== null);

    const updatedEmployee = await prisma.employee.update({
      where: { id: Number(id) },
      data: {
        ...data,
        projects: {
          set: [], // Удаляем текущие связи
          connect: validProjectConnections, // Добавляем новые связи
        },
      },
      include: { projects: true },
    });

    return updatedEmployee; // Возвращаем обновленные данные
  } catch (error) {
    throw new Error(`Error updating employee: ${error}`);
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
