import { useEffect } from "react";
import useEmployeeStore from "../store/employees";

type ReturnProps = {
  employees: any[];
  fetchEmployees: () => Promise<void>;
  addEmployee: (employeeData: any) => Promise<void>;
  updateEmployee: (id: number, employeeData: any) => Promise<void>;
  deleteEmployee: (id: number) => Promise<void>;
};
export const useEmployees = () => {
  const employeeState = useEmployeeStore((state) => state) as ReturnProps;
  useEffect(() => {
    employeeState.fetchEmployees();
  }, []);
  return employeeState;
};