import {
  EmployeeFormValues,
} from "@/components/employee/employee-form";
import { axiosInstance } from "./instance";

export const createEmployee = async (data: EmployeeFormValues) => {
  try {
    await axiosInstance.post("/employees", data);
  } catch (error) {
    throw error;
  }
};

export const updateEmployee = async (id: number, data: EmployeeFormValues) => {
  try {
    const response = await axiosInstance.patch(`/employees/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export type TUpdateEmployee = typeof updateEmployee;


