'use server'
import { EmployeeFormValues, EmployeeWithProjects } from "@/components/employee/employee-form";
import { POSITIONS } from "@/constants";
import prisma from "@prisma/prisma";

export const getPeoplePartners = async (): Promise<{ fullName: string }[]> => {
  try {
    const hrManagers = await prisma.employee.findMany({
      where: { position: POSITIONS.HR_MANAGER },
      select: { fullName: true },
    });

    return hrManagers;
  } catch (error) {
    throw error;
  }
};

export const getAllEmployees = async (): Promise<EmployeeWithProjects[]> => {
  try {
    const employees = await prisma.employee.findMany({
      include: {
        projects: {
          select: { projectName: true },
        },
      },
    });

    const simplifiedEmployees = employees.map((employee) => ({
      ...employee,
      projects: employee.projects.map((project) => project.projectName),
    }));

    return simplifiedEmployees;
  } catch (error) {
    throw error;
  }
};
export const getEmployeesForHR = async (
  HR: string
): Promise<EmployeeWithProjects[]> => {
  try {
    const employees = await prisma.employee.findMany({
      where: { peoplePartner: HR },
      include: {
        projects: {
          select: { projectName: true },
        },
      },
    });

    const simplifiedEmployees = employees.map((employee) => ({
      ...employee,
      projects: employee.projects.map((project) => project.projectName),
    }));

    return simplifiedEmployees;
  } catch (error) {
    throw error;
  }
};
export const getEmployeesForPM = async (): Promise<EmployeeWithProjects[]> => {
  try {
    const employees = await prisma.employee.findMany({
      where: { position: POSITIONS.EMPLOYEE },
      include: {
        projects: {
          select: { projectName: true },
        },
      },
    });

    const simplifiedEmployees = employees.map((employee) => ({
      ...employee,
      projects: employee.projects.map((project) => project.projectName),
    }));

    return simplifiedEmployees;
  } catch (error) {
    throw error;
  }
};
export const getEmployeeById = async (
  id: number
): Promise<EmployeeWithProjects> => {
  try {
    const employee = await prisma.employee.findUnique({
      where: { id },
      include: {
        projects: {
          select: { projectName: true },
        },
      },
    });

    if (!employee) {
      throw new Error(`Employee with ID ${id} not found`);
    }

    return {
      ...employee,
      projects: employee.projects.map((project) => project.projectName),
    };
  } catch (error) {
    throw error;
  }
};

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