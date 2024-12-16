import { create } from 'zustand';
import { getAllEmployees, createEmployee, updateEmployee, deleteEmployee } from '../services/employees';

interface EmployeeStore {
  employees: any[];
  setEmployees: (data: any) => void;
  fetchEmployees: () => Promise<void>;
  addEmployee: (employeeData: any) => Promise<void>;
  updateEmployee: (id: number, employeeData: any) => Promise<void>;
  deleteEmployee: (id: number) => Promise<void>;
}

const useEmployeeStore = create<EmployeeStore>((set) => ({
  employees: [],
  setEmployees: (data: any) => set({ employees: data }),

  // Получение всех работников
  fetchEmployees: async () => {
    try {
      const data = await getAllEmployees();
      set({ employees: data || [] });
    } catch (error) {
      console.error('Failed to fetch employees:', error);
    }
  },

  // Создание нового работника
  addEmployee: async (employeeData: any) => {
    try {
      const newEmployee = await createEmployee(employeeData);
      set((state: { employees: any; }) => ({ employees: [...state.employees, newEmployee] }));
    } catch (error) {
      console.error('Failed to create employee:', error);
    }
  },

  // Обновление работника
  updateEmployee: async (id: number, employeeData: any) => {
    try {
      const updatedEmployee = await updateEmployee(id, employeeData);
      set((state: { employees: any[]; }) => ({
        employees: state.employees.map((emp: { id: any; }) =>
          emp.id === id ? updatedEmployee : emp
        ),
      }));
    } catch (error) {
      console.error('Failed to update employee:', error);
    }
  },

  // Удаление работника
  deleteEmployee: async (id: number) => {
    try {
      await deleteEmployee(id);
      set((state: { employees: any[]; }) => ({
        employees: state.employees.filter((emp: { id: any; }) => emp.id !== id),
      }));
    } catch (error) {
      console.error('Failed to delete employee:', error);
    }
  },
}));

export default useEmployeeStore;
