import { EmployeeFormValues, EmployeeWithProjects } from '@/components/employee/employee-form';
import { axiosInstance } from './instance';

export const getAllEmployees = async (): Promise<EmployeeWithProjects[]> => {
  return (await axiosInstance.get<EmployeeWithProjects[]>("/employees")).data
}
export const getEmployeeById = async (id: number) => {
  return (await axiosInstance.get(`/employees/${id}`)).data
}

export const createEmployee = async (data: EmployeeFormValues) => {
  try {
    await axiosInstance.post("/employees", data);
  } catch (error) {
    throw error;
  }

}

export const updateEmployee = async (id: number, data: EmployeeFormValues) => {
  try {
    const response = await axiosInstance.put(`/employees/${id}`, data);
    return response.data
  } catch (error) {
    throw error;
  }
}
export const deleteEmployee = async (id: number) => {
  await axiosInstance.delete(`/employees/${id}`);
};

export const getPeoplePartners = async (): Promise<{ fullName: string }[]> => {
  return (await axiosInstance.get<{ fullName: string }[]>("/employees/partners")).data
}

