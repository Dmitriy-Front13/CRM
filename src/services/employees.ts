import { EmployeeFormValues, EmployeeWithProjects } from '@/components/employee/employee-form';
import { axiosInstance } from './instance';
import prisma from '@prisma/prisma';

export const getAllEmployees = async (): Promise<EmployeeWithProjects[]> => {
  try {
    const employees = await prisma.employee.findMany({
      include: {
        projects: {
          select: { projectName: true },
        },
      },
    });

    const simplifiedEmployees = employees.map(employee => ({
      ...employee,
      projects: employee.projects.map(project => project.projectName),
    }));

    return simplifiedEmployees
  } catch (error) {
    throw error
  }
}
export const getEmployeeById = async (id: number): Promise<EmployeeWithProjects> => {
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
      projects: employee.projects.map(project => project.projectName),
    };
  } catch (error) {
    throw error;
  }
};

export const createEmployee = async (data: EmployeeFormValues) => {
  try {
    await axiosInstance.post("/employees", data);
  } catch (error) {
    throw error;
  }

}

export const updateEmployee = async (id: number, data: EmployeeFormValues) => {
  try {
    const response = await axiosInstance.patch(`/employees/${id}`, data);
    return response.data
  } catch (error) {
    throw error;
  }
}
export type TUpdateEmployee = typeof updateEmployee

export const getPeoplePartners = async (): Promise<{ fullName: string }[]> => {
  try {
    const hrManagers = await prisma.employee.findMany({
      where: { position: 'HR_MANAGER' },
      select: { fullName: true },
    });

    return hrManagers
  } catch (error) {
    throw error
  }
}

