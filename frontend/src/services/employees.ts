import { EmployeeFormValues } from '@/components/employee/employee-form';
import { axiosInstance, getCsrfToken } from './instance';

export const getAllEmployees = async () => {
  return (await axiosInstance.get("/employees")).data
}
export const getEmployeeById = async (id: number) => {
  return (await axiosInstance.get(`/employees/${id}`)).data
}

export const createEmployee = async (data: EmployeeFormValues) => {
  try {
    const csrfToken = await getCsrfToken();
    await axiosInstance.post(
      "/employees",
      data,
      {
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken,
        },
      },
    );
  } catch (error) {
    throw error;
  }

}

export const updateEmployee = async (id: number, data: EmployeeFormValues) => {
  try {
    const csrfToken = await getCsrfToken();
    const response = await axiosInstance.put(`/employees/${id}`, data, {

      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": csrfToken
      },
    }
    );
    return response.data
  } catch (error) {
    throw error;
  }
}
export const deleteEmployee = async (id: number) => {
  const csrfToken = await getCsrfToken();
  await axiosInstance.delete(`/employees/${id}`, {
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-Token": csrfToken
    },
  });
};

export const getPeoplePartners = async (): Promise<{ fullName: string}[]> => {
  return (await axiosInstance.get<{ fullName: string}[]>("/employees/partners")).data
}

